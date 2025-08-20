<?php

namespace App\Models;

class Customer extends BaseModel
{
    public $name;
    public $phone;
    public $cpf_cnpj;
    public $address_id;
    public ?Address $address;
}
