<?php

namespace App\Http\Controllers;

use App\Http\Requests\DebtRequest;

use App\Models\Debt;

use App\Services\DebtService;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    private DebtService $_debtService;

    public function __construct(DebtService $debtService)
    {
        $this->_debtService = $debtService;
    }

    public function getAll()
    {
        $debts = $this->_debtService->getAll();
        return response()->json($debts, 200);
    }

    public function getById($id)
    {
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

    public function put(DebtRequest $request, int $id)
    {
        $result = $this->_debtService->update($request, $id);

        return response()->json([
            "message" => "Debt updated successfuly",
            "result" => $result
        ], 200);
    }

    public function delete($id)
    {
        $result = $this->_debtService->remove($id);
        if (!$result) {
            return response()->json("Debt not found!", 404);
        }
        return response()->json(
            'Debt deleted with success!',
            200
        );
    }

    public function getDayAndMonthTotal()
    {
        $data = $this->_debtService->getDayAndMonthTotal();

        return response()->json($data, 200);
    }
}
