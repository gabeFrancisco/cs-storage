<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'cpf_cnpj'
    ];

    public function address(){
        return $this->belongsTo(Address::class);
    }
}
