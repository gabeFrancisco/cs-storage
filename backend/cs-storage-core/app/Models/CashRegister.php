<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use payment_type;

class CashRegister
{
    public $id;
    public $value;
    public $payment_type;
    public $description;
    public $created_at;
    public $updated_at;

    public function __construct($id, $value, $payment_type, $description, $created_at) {
        $this->id = $id;
        $this->value = $value;
        $this->payment_type = $payment_type;
        $this->description = $description;
        $this->created_at = $created_at;
    }
    // protected $fillable = [
    //     'payment_type',
    //     'value',
    //     'description',
    //     'created_at'
    // ];

    // protected $casts = [
    //     'value' => 'float',
    // ];
}
