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

    public function put(ServiceOrderRequest $request, int $id)
    {
        $result = $this->serviceOrderService->update($request, $id);
        return response()->json($result, 200);
    }

    public function delete($id)
    {
        $result = $this->serviceOrderService->remove($id);
        if (!$result) {
            return response()->json("Service order not found!", 404);
        }

        return response()->json("Service order deleted with success!", 200);
    }
}
