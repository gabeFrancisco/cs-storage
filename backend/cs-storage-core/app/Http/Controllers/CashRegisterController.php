<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashRegisterRequest;
use App\Services\CashRegisterService;

class CashRegisterController extends Controller
{
    private CashRegisterService $_cashRegisterService;

    public function __construct(CashRegisterService $cashRegisterService)
    {
        $this->_cashRegisterService = $cashRegisterService;
    }
    public function getAll($date)
    {
        return response()->json($this->_cashRegisterService->getAllByDate($date), 200);
    }

    public function getById($id)
    {
        return response()->json($this->_cashRegisterService->getById($id), 200);
    }

    public function post(CashRegisterRequest $request)
    {
        $register = $this->_cashRegisterService->create($request);
        return response()->json($register, 200);
    }

    public function put(CashRegisterRequest $request)
    {
        $dbRegister = $this->_cashRegisterService->update($request);
        return response()->json([
            "message" => "Succesfull update",
            "register" => $dbRegister
        ], 200);
    }

    public function delete($id)
    {
        $this->_cashRegisterService->remove($id);

        return response()->json(
            'The register was deleted with success!',
            200
        );
    }

    public function getDayAndMonthTotal()
    {
        $data = $this->_cashRegisterService->getDayAndMonthTotal();

        return response()->json($data, 200);
    }
}
