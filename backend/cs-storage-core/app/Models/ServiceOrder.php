<?php

namespace App\Models;

class ServiceOrder extends BaseModel{
    public $title;
    public $description;
    public $service_date;
    public $customer_id;
    public ?Customer $customer;
    public $address_id;
    public Address $address;
}
