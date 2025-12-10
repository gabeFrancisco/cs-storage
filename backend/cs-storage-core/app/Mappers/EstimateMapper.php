<?php

namespace App\Mappers;

use App\Models\Estimate;

class EstimateMapper{
    public static function fromSql($data){
        $estimate = new Estimate();

        $estimate->title = $data['e_title'];

        return $estimate;
    }
}
