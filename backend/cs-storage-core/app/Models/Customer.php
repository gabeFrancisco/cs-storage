<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'cpf_cnpj',
    ];

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }
}
