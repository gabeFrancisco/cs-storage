<?php

namespace App\Models;

use App\Enums\ProductType;

class EstimateItem extends BaseModel{
    public string $name;
    public ?string $description;
    public int $quantity;
    public float $price;
    public int $estimate_id;
    public ProductType $productType;

    public function getTotal(): float {
        return $this->quantity * $this->price;
    }
}
