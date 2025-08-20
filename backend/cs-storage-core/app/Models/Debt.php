<?php

namespace App\Models;

use App\Models\BaseModel;


class Debt extends BaseModel
{
    public $value;
    public $forecast;
    public $paid_date;
    public $customer_id;
    public ?Customer $customer;
}
