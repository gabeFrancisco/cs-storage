<?php

namespace App\Http\Controllers;

use App\Http\Requests\quotationCreationRequest;
use App\Services\QuotationService;
use Exception;

class QuotationController extends Controller
{
    private QuotationService $estimateService;
    public function __construct(QuotationService $estimateService)
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

    public function post(quotationCreationRequest $request)
    {
        $result = $this->estimateService->create($request);
        return response()->json($result)->setStatusCode(200);
    }

    public function getById($id)
    {
        $estimate = $this->estimateService->getById($id);
        return response()->json($estimate, 200);
    }

}
