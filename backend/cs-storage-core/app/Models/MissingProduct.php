<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissingProduct extends Model
{
    protected $fillable = [
        'name',
        'needed_day',
        'is_bought',
        'image_url'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }
}
