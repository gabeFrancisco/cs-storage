<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    protected $fillable = [
        'value',
        'forecast',
        'paid_date'
    ];

    protected $casts = [
        'value' => 'float'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function create(Debt $debt){
        $dbDebt = Debt::create($debt);
        return $debt;
    }

}
