<?php

namespace App\Repository;

use App\Models\Debt;
use App\Models\Address;
use App\Models\Customer;
use App\Utils\ClassHelper;
use Illuminate\Support\Facades\DB;
use Exception;
use Carbon\Carbon;
class DebtRepository
{
    private CustomerRepository $customerRepository;
    private AddressRepository $addressRepository;
    public function __construct(
        CustomerRepository $customerRepository,
        AddressRepository $addressRepository
    ) {
        $this->customerRepository = $customerRepository;
        $this->addressRepository = $addressRepository;
    }

    private $selectAllWithJoinQuery =
        'SELECT d.id  AS d_id,
            d.value        AS d_value,
            d.forecast     AS d_forecast,
            d.paid_date    AS d_paid_date,
            d.created_at   AS d_created_at,
            d.updated_at   AS d_updated_at,
            d.customer_id  AS d_customer_id,
            c.id           AS c_id,
            c.name         AS c_name,
            c.phone        AS c_phone,
            c.cpf_cnpj     AS c_cpf_cnpj,
            c.created_at   AS c_created_at,
            c.updated_at   AS c_updated_at,
            c.address_id   AS c_address_id,
            a.id           AS a_id,
            a.road         AS a_road,
            a.number       AS a_number,
            a.complement   AS a_complement,
            a.neighborhood AS a_neighborhood,
            a.city         AS a_city,
            a.state        AS a_state,
            a.created_at   AS a_created_at,
            a.updated_at   AS a_updated_at
        FROM   debts d
            LEFT JOIN customers c
                    ON d.customer_id = c.id
            LEFT JOIN addresses a
                    ON c.address_id = a.id ';

    private function parseDebt($dbDebt): Debt
    {
        $debt = ClassHelper::fillFromSql($dbDebt, Debt::class, 'd_');

        if ($dbDebt->d_customer_id) {
            $customer = ClassHelper::fillFromSql($dbDebt, Customer::class, 'c_');

            if ($dbDebt->c_address_id) {
                $address = ClassHelper::fillFromSql($dbDebt, Address::class, 'a_');
                $customer->address = $address;
            }

            $debt->customer = $customer;
        }
        return $debt;
    }

    public function getAllDebts()
    {
        $dbDebts = DB::select($this->selectAllWithJoinQuery);

        $debts = [];

        foreach ($dbDebts as $row) {
            $debt = $this->parseDebt($row);
            $debts[] = $debt;
        }

        return $debts;
    }


    public function getDebt($id)
    {
        $dbDebt = DB::selectOne($this->selectAllWithJoinQuery . ' WHERE d_id = ?', [$id]);
        $debt = $this->parseDebt($dbDebt);

        return $debt;
    }
    public function createDebt(Debt $debt, Customer $customer, Address $address)
    {
        DB::beginTransaction();

        try {
            if (!empty($address)) {
                $dbAddress = $this->addressRepository->createAddress($address);
                $customer->address_id = $dbAddress->id;
            }

            $dBcustomer = $this->customerRepository->createCustomer($customer);

            $dbDebt = DB::selectOne(
                'INSERT INTO debts(value, forecast, customer_id, created_at)
                    VALUES (?,?,?,?) returning *',
                [
                    $debt->value,
                    $debt->forecast,
                    $dBcustomer->id,
                    Carbon::now()
                ]
            );


            DB::commit();

        } catch (Exception $e) {
            error_log($e->getMessage());
            DB::rollBack();
        }
        return $dbDebt;
    }

    public function updateDebt(Debt $debt, Customer $customer, ?Address $address)
    {
        DB::beginTransaction();

        try {
            $dbDebt = $this->getDebt($debt->id);
            if (!empty($address) || $address != null) {
                if ($dbDebt->customer->address_id !== null) {
                    $address->id = $dbDebt->customer->address_id;
                    $dbAddress = $this->addressRepository->updateAddress($address);
                    $customer->address_id = $dbDebt->customer->address_id;
                } else {
                    $dbAddress = $this->addressRepository->createAddress($address);
                    $customer->address_id = $dbAddress->id;
                }
            }
            $customer->id = $dbDebt->customer_id;
            $this->customerRepository->updateCustomer($customer);

            $dbDebt = DB::selectOne(
                'UPDATE debts
                        SET VALUE = ?, forecast = ?, updated_at = ?
                        WHERE id = ?
                ',
                [
                    $debt->value,
                    $debt->forecast,
                    Carbon::now(),
                    $dbDebt->id
                ]
            );

            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $dbDebt;
    }

    public function removeDebt(int $id)
    {
        $debt = DB::selectOne(
            'DELETE FROM debts WHERE id = ?',
            [$id]
        );

        return $debt;
    }

    public function getDayAndMonthTotal()
    {
        $day = DB::selectOne(
            'SELECT SUM(value) AS total FROM debts WHERE created_at = current_date'
        );

        $month = DB::selectOne(
            'SELECT SUM(value) AS total FROM debts WHERE strftime("%m", created_at) = strftime("%m", "now")
        '
        );

        return [
            "day" => $day->total != null ? $day->total : 0,
            "month" => $month->total != null ? $month->total : 0
        ];
    }
}
