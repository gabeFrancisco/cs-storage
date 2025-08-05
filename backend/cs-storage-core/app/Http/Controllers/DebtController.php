<?php

namespace App\Http\Controllers;

use App\Http\Requests\DebtRequest;

use App\Models\Debt;

use App\Services\DebtService;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    private DebtService $_debtService;

    public function __construct(DebtService $debtService) {
        $this->_debtService = $debtService;
    }

    public function getAll()
    {
        $debts = $this->_debtService->getAll();
        return response()->json($debts, 200);
    }

    public function getById($id){
        $debt = $this->_debtService->getById($id);
        return response()->json($debt, 200);
    }

    public function post(DebtRequest $request)
    {
        $result = $this->_debtService->create($request);

        return response()->json([
            "message" => "Debt created successfuly",
            "result" => $result
        ], 200);
    }

    public function put(DebtRequest $request){
        $result = $this->_debtService->update($request);

        return response()->json([
            "message" => "Debt created successfuly",
            "result" => $result
        ], 200);
    }
}
