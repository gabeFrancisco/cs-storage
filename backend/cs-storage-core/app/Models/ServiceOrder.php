<?php

namespace App\Models;

class ServiceOrder extends BaseModel{
    public $title;
    public $description;
    public $priority;
    public $service_date;
    public $value;
    public $customer_id;
    public ?Customer $customer;
    public $address_id;
    public Address $address;
}
