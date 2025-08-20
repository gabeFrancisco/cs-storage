<?php

namespace App\Models;

class MissingProduct extends BaseModel
{
    public $name;
    public $needed_day;
    public $is_bought;
    public $customer_id;
    public Customer $customer;
}
