<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    // public $road;
    // public $number;
    // public $complement;
    // public $neighborhood;
    // public $city;
    // public $state;

    protected $fillable = [
        'road',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state'
    ];
}
