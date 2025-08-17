<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt
{
    public $id;
    public $value;
    public $forecast;
    public $paid_date;
    public $customer_id;
    public ?Customer $customer;
    public $created_at;
    public $updated_at;

    public function __construct($id, $value, $forecast, $paid_date, $customer_id, $created_at, $updated_at, $customer)
    {
        $this->id = $id;
        $this->value = $value;
        $this->forecast = $forecast;
        $this->paid_date = $paid_date;
        $this->customer_id = $customer_id;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
        $this->customer = $customer;
    }
}
