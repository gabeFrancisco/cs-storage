<?php

namespace App\Repository;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CustomerRepository
{
    public function getAllCustomers()
    {
        $customers = DB::select(
            'SELECT id, created_at, updated_at, name, phone, cpf_cnpj, address_id
                    FROM customers
                        LEFT JOIN addresses on customers.address_id = addresses.id
            '
        );

        return $customers;
    }

    public function createCustomer(Customer $customer)
    {
        $dBcustomer = DB::selectOne(
            'INSERT INTO customers(name, phone, cpf_cnpj, address_Id, created_at)
                    VALUES (?,?,?,?,current_date) returning *',
            [
                $customer->name,
                $customer->phone,
                $customer->cpf_cnpj,
                $customer->address_id,
                Carbon::now()
            ]
        );

        return $dBcustomer;
    }

    public function updateCustomer(Customer $customer)
    {
        // dd($customer);
        $dbCustomer = DB::selectOne(
            'UPDATE customers
                    SET name=?, phone=?, cpf_cnpj=?, updated_at=?, address_id = ?
                    WHERE id = ? returning *;
            ',
            [
                $customer->name,
                $customer->phone,
                $customer->cpf_cnpj,
                Carbon::now(),
                $customer->address_id,
                $customer->id
            ]
        );

        return $dbCustomer;
    }
}
