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
}
