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

    public function __construct($id, $name, $phone, $cpf_cnpj, $address_id, $created_at) {
        $this->id = $id;
        $this->phone = $phone;
        $this->cpf_cnpj = $cpf_cnpj;
        $this->address_id = $address_id;
        $this->created_at = $created_at;
    }
    protected $fillable = [
        'name',
        'phone',
        'cpf_cnpj'
    ];

    public function address(){
        return $this->belongsTo(Address::class);
    }
}
