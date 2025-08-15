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
