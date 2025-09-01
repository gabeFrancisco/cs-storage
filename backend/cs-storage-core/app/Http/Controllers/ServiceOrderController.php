<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceOrderRequest;
use App\Services\ServiceOrderService;

class ServiceOrderController extends Controller
{
    private ServiceOrderService $serviceOrderService;

    public function __construct(ServiceOrderService $serviceOrderService)
    {
        $this->serviceOrderService = $serviceOrderService;
    }

    public function post(ServiceOrderRequest $request)
    {
        $result = $this->serviceOrderService->create($request);
        return response()->json($result, 200);
    }
}
