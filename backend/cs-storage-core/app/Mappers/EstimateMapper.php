<?php

namespace App\Mappers;

use App\Models\Customer;
use App\Models\Estimate;

class EstimateMapper{
    public static function fromSql($data){
        $estimate = new Estimate();
        $customer = new Customer();

        $estimate->title = $data->e_title;
        $customer->name = "John Frank";

        $estimate->customer = $customer;

        return $estimate;
    }
}
