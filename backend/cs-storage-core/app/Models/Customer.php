<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    // public $name;
    // public $phone;
    // public $cpf_cnpj;
    // public $address_id;
    // public ?Address $address;

    protected $fillable = [
        'name',
        'phone',
        'cpf_cnpj',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
