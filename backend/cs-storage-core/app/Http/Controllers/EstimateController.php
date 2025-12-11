<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstimateCreationRequest;
use App\Services\EstimateService;
use Illuminate\Http\Request;
use Exception;

class EstimateController extends Controller
{
    private EstimateService $estimateService;
    public function __construct(EstimateService $estimateService)
    {
        $this->estimateService = $estimateService;
    }

    public function getAll()
    {
        try {

            $estimates = $this->estimateService->getAll();
            return response($estimates, 200);
        } catch (Exception $e) {
            return response($e);
        }
    }

    public function post(EstimateCreationRequest $request)
    {
        $result = $this->estimateService->create($request);
        return response()->json($result)->setStatusCode(200);
    }

    public function getById($id){
        $estimate = $this->estimateService->getById($id);
        return response()->json($estimate, 200);
    }

}
