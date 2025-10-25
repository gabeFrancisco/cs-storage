<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstimateCreationRequest;
use App\Services\EstimateService;
use Illuminate\Http\Request;

class EstimateController extends Controller
{
    private EstimateService $estimateService;
    public function __construct(EstimateService $estimateService)
    {
        $this->estimateService = $estimateService;
    }

    public function post(EstimateCreationRequest $request){
        $result = $this->estimateService->create($request);
        return response()->json($result)->setStatusCode(200);
    }
}
