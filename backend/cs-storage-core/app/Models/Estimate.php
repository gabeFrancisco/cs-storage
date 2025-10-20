<?php

namespace App\Models;

class Estimate extends BaseModel
{
    public $title;
    public Customer $customer;
    public array $items;
    public string $observations;

    public function getTotal(): float {
        $total = 0;
        foreach($this->items as $item){
            $total =+ $item->price;
        }

        return $total;
    }

}
