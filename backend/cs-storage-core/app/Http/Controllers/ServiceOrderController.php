<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceOrderRequest;
use App\Services\ServiceOrderService;
use Illuminate\Http\Request;

class ServiceOrderController extends Controller
{
    private ServiceOrderService $serviceOrderService;

    public function __construct(ServiceOrderService $serviceOrderService)
    {
        $this->serviceOrderService = $serviceOrderService;
    }

    public function getAll()
    {
        $result = $this->serviceOrderService->getAll();
        return response()->json($result, 200);
    }

    public function getById($id)
    {
        $result = $this->serviceOrderService->getById($id);
        return response()->json($result, 200);
    }

    public function post(ServiceOrderRequest $request)
    {
        $result = $this->serviceOrderService->create($request);
        return response()->json($result, 200);
    }

    public function put(ServiceOrderRequest $request)
    {
        $result = $this->serviceOrderService->update($request);
        return response()->json($result, 200);
    }

    public function delete($id){
        $this->serviceOrderService->remove($id);
    }
}
