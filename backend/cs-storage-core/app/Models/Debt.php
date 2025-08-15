<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    public $id;
    public $value;
    public $forecast;
    public $paid_date;
    public $customer_id;
    public Customer $customer;
    public $created_at;
    public $updated_at;

    public function __construct($id, $value, $forecast, $customer_id, $created_at) {
        $this->id = $id;
        $this->value = $value;
        $this->forecast = $forecast;
        $this->customer_id = $customer_id;
        $this->created_at = $created_at;
    }

    protected $fillable = [
        'value',
        'forecast',
        'paid_date'
    ];

    protected $casts = [
        'value' => 'float'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

}
