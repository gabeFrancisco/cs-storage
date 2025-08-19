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

    public function createCustomer(Customer $customer):Customer
    {
        $dBcustomer = DB::selectOne(
            'insert into customers(name, phone, cpf_cnpj, address_Id, created_at)
                values (?,?,?,?,current_date) returning *',
            [
                $customer->name,
                $customer->phone,
                $customer->cpf_cnpj,
                $customer->address_id,

            ]
        );

        return $dBcustomer;
    }

    public function updateCustomer(Customer $customer): Customer
    {
        $dbCustomer = DB::selectOne(
            'update customers
                    set name=?, set phone=?, set cpf_cnpj=?, set updated_at=?
                    where id = ? returning *;
            ',
            [
                $customer->name,
                $customer->phone,
                $customer->cpf_cnpj,
                date("Y-m-d"),
                $customer->id
            ]
        );

        return $dbCustomer;
    }
}
