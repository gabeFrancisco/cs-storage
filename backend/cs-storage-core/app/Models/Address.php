<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address
{
    public $id;
    public $road;
    public $number;
    public $complement;
    public $neighborhood;
    public $city;
    public $state;
    public $created_at;
    public $updated_at;

    public function __construct($id, $road, $number, $complement, $neighborhood, $city, $state, $created_at) {
        $this->id = $id;
        $this->road = $road;
        $this->number = $number;
        $this->neighborhood = $neighborhood;
        $this->city = $city;
        $this->state = $state;
        $this->created_at = $created_at;
    }
}
