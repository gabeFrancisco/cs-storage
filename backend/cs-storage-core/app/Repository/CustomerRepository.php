<?php

namespace App\Repository;

use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class CustomerRepository
{
    public function getAllCustomers()
    {
        $customers = DB::select(
            'select id, created_at, updated_at, name, phone, cpf_cnpj, address_id
                from customers
                left join addresses on customers.address_id = addresses.id
            '
        );

        return $customers;
    }

    public function createCustomer(Customer $customer)
    {
        $dBcustomer = DB::selectOne(
            'insert into customer(name, phone, cpf_cnpj, address_Id, created_at)
                values (?,?,?,?, current_date);',
            [
                $customer->name,
                $customer->phone,
                $customer->cpf_cnpj,
                $customer->address_id,

            ]
        );

        return $dBcustomer;
    }
}
