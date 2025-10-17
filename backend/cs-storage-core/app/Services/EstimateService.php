<?php

namespace App\Services;

use App\Repository\EstimateRepository;

class EstimateService{
    private EstimateRepository $estimateRepository;
    public function __construct(EstimateRepository $estimateRepository){
        $this->estimateRepository = $estimateRepository;
    }

    public function create(){

    }
}
