<?php

namespace App\Repository;

use App\Models\Address;
use App\Models\ServiceOrder;
use App\Models\Customer;
use App\Utils\ClassHelper;

class ServiceOrderRepository
{
    private function parseServiceOrder($dbServiceOrder)
    {
        $serviceOrder = ClassHelper::fillFromSql($dbServiceOrder, ServiceOrder::class, 's_');

        if($dbServiceOrder->d_customer_id){
            $customer = ClassHelper::fillFromSql($dbServiceOrder, Customer::class, 'c_');
        }

        if($dbServiceOrder->d_address_id){
            $address = ClassHelper::fillFromSql($dbServiceOrder, Address::class, 'a_');
        }

        $serviceOrder->customer = $customer;
        $serviceOrder->address = $address;

        return $serviceOrder;
    }
}
