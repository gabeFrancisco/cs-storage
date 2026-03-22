<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'road',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state'
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'address_id');
    }
}
