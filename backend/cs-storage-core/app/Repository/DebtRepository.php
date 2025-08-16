<?php

namespace App\Repository;

use App\Models\Debt;
use App\Models\Address;
use App\Models\Customer;
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

    public function getAllDebts(){
        $debts = DB::select(
            'select d.id as debt_id, d.value, d.forecast, d.created_at, d.updated_at,
                    c.id as customer_id, c.name, c.phone, c.cpf_cnpj, c.created_at, c.updated_at,
                    a.id as address_id, a.road, a.number, a.complement, a.neighborhood, a.city, a.state
                from debts d
                left join customers c on d.customer_id = c.id
                left join addresses a on c.address_id = a.id
            '
        );

        return $debts;
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
}
