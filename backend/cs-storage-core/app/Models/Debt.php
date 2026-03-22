<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;


class Debt extends Model
{
    // public $value;
    // public $forecast;
    // public $paid_date;
    // public $customer_id;
    // public ?Customer $customer;

    protected $fillable = [
        'value',
        'forecast',
        'paid_date',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }
}
