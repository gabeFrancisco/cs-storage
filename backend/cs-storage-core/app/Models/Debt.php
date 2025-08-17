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
}
