<?php

namespace App\Models;

use App\Models\Enums\ProductType;

class EstimateItem extends BaseModel{
    public string $name;
    public ?string $description;
    public int $quantity;
    public float $price;
    public ProductType $productType;

    public function getTotal(): float {
        return $this->quantity * $this->price;
    }
}
