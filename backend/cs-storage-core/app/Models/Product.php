<?php

namespace App\Models;

use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'quantity',
        'price',
        'product_type'
    ];
}
