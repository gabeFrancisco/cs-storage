<?php

namespace App\Models;

class Estimate extends BaseModel
{
    public $title;
    public Customer $customer;
    private array $items;
    public string $observations;

    public function getTotal(): float {
        //TODO
    }

}
