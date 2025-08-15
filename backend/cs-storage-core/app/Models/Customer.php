<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $id;
    public $name;
    public $phone;
    public $cpf_cnpj;
    public $address_id;
    public Address $address;
    public $created_at;
    public $updated_at;
    protected $fillable = [
        'name',
        'phone',
        'cpf_cnpj'
    ];

    public function address(){
        return $this->belongsTo(Address::class);
    }
}
