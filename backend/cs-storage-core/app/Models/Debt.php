<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    protected $fillable = [
        'value',
        'forecast',
    ];

    protected $casts = [
        'value' => 'decimal'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }
}
