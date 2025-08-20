<?php

namespace App\Models;

class CashRegister extends BaseModel
{
    public $value;
    public $payment_type;
    public $description;

    public function __construct($id, $value, $payment_type, $description, $created_at) {
        $this->id = $id;
        $this->value = $value;
        $this->payment_type = $payment_type;
        $this->description = $description;
        $this->created_at = $created_at;
    }
}
