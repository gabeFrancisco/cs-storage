<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Debt extends Model
{
    protected $fillable = [
        'value',
        'forecast',
        'paid_date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
