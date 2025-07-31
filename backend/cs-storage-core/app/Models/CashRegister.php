<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashRegister extends Model
{
    protected $fillable = [
        'payment_type',
        'value',
        'description',
        'created_at'
    ];

    protected $casts = [
        'value' => 'float',
    ];
}
