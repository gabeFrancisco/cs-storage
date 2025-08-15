<?php

namespace App\Repository;

use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class CustomerRepository{
    public function getAllCustomers(){
        $customers = DB::(
            'select id, created_at, updated_at, name, phone, cpf_cnpj, address_id
                from customers
                left join addresses on customers.address_id = addresses.id
            '
        );

        return $customers;
    }

    public function createCustomer(Customer $customer){

    }
}
