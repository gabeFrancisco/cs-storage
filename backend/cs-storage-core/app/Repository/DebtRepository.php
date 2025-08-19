<?php

namespace App\Repository;

use App\Models\Debt;
use App\Models\Address;
use App\Models\Customer;
use App\Utils\ClassHelper;
use Illuminate\Support\Facades\DB;
use Exception;

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
        'select d.id as d_id, d.value as d_value, d.forecast as d_forecast, d.paid_date as d_paid_date,
         d.created_at as d_created_at, d.updated_at as d_updated_at, d.customer_id as d_customer_id,
            c.id as c_id, c.name as c_name, c.phone as c_phone, c.cpf_cnpj as c_cpf_cnpj,
            c.created_at as c_created_at, c.updated_at as c_updated_at, c.address_id as c_address_id,
                a.id as a_id, a.road as a_road, a.number as a_number, a.complement as a_complement,
                a.neighborhood as a_neighborhood, a.city as a_city,
                a.state as a_state, a.created_at as a_created_at, a.updated_at as a_updated_at
        from debts d
        left join customers c on d.customer_id = c.id
        left join addresses a on c.address_id = a.id';

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

    public function getDebt($id):Debt
    {
        $dbDebt = DB::selectOne($this->selectAllWithJoinQuery . ' where d_id = ?', [$id]);
        $debt = $this->parseDebt($dbDebt);

        return $debt;
    }
    public function createDebt(Debt $debt, Customer $customer, Address $address): Debt
    {
        DB::beginTransaction();

        try {
            if (!empty($address)) {
                $dbAddress = $this->addressRepository->createAddress($address);
                $customer->address_id = $dbAddress->id;
            }

            $dBcustomer = $this->customerRepository->createCustomer($customer);

            $dbDebt = DB::selectOne(
                'insert into debts(value, forecast, customer_id, created_at)
                    values (?,?,?,?) returning *',
                [
                    $debt->value,
                    $debt->forecast,
                    $dBcustomer->id,
                    $debt->created_at
                ]
            );


            DB::commit();

        } catch (Exception $e) {
            error_log($e->getMessage());
            DB::rollBack();
        }
        return $dbDebt;
    }

    public function updateDebt(Debt $debt, Customer $customer, ?Address $address): Debt
    {
        DB::beginTransaction();

        try {
            if (!empty($address) || $address == null) {
                // $dbAddress = $this->addressRepository-
                $dbAddress = $this->addressRepository->updateAddress($address);
                $customer->address_id = $dbAddress->id;
            }

            $this->customerRepository->updateCustomer($customer);

            $dbDebt = DB::selectOne(
                'update debts
                set value = ?, set forecast = ?, set updated_at = ?
                where id = ?
                ',
                [
                    $debt->value,
                    $debt->forecast,
                    date('Y-m-d'),
                    $debt->id
                ]
            );

            DB::commit();

        } catch (Exception $e) {
            error_log($e->getMessage());
            DB::rollBack();
        }

        return $dbDebt;
    }
}
