<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer
{
    public $id;
    public $name;
    public $phone;
    public $cpf_cnpj;
    public $address_id;
    public ?Address $address;
    public $created_at;
    public $updated_at;

    public function __construct($id, $name, $phone, $cpf_cnpj, $address_id, $created_at, $updated_at, $address) {
        $this->id = $id;
        $this->name = $name;
        $this->phone = $phone;
        $this->cpf_cnpj = $cpf_cnpj;
        $this->address_id = $address_id;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
        $this->address = $address;
    }
}
