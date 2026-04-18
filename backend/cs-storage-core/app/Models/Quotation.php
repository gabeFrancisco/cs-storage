<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \App\Models\Customer|null $customer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @property string $title
 * @property string $observations
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quotation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quotation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quotation query()
 * @mixin \Eloquent
 */
class Quotation extends Model
{
    // public $title;
    // public Customer $customer;
    // public array $items = [];
    // public string $observations;

    // public function getTotal(): float {
    //     $total = 0;
    //     foreach($this->items as $item){
    //         $total =+ $item->price;
    //     }

    //     return $total;
    // }
    protected $fillable = [
        'title',
        'observations'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, "customer_id");
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function total($id)
    {
        $quotation = $this->with('products')->find($id);
        $total = $quotation->products->sum(fn($product) => $product->quantity * $product->price);
    }
}
