<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashRegisterRequest;
use App\Models\CashRegister;
use App\Services\CashRegisterService;
use Error;
use Illuminate\Http\Request;

class CashRegisterController extends Controller
{
    private CashRegisterService $_cashRegisterService;

    public function __construct(CashRegisterService $cashRegisterService) {
        $this->_cashRegisterService = $cashRegisterService;
    }
    public function getAll()
    {
        return response()->json($this->_cashRegisterService->getAll(), 200);
    }

    public function getById($id)
    {
        $register = CashRegister::where("id", $id)->first();
        if ($register != null) {
            return $register;
        }
    }

    public function post(CashRegisterRequest $request)
    {
        $register = $this->_cashRegisterService->create($request);
        return response()->json($register, 200);
    }

    public function put(Request $request)
    {
        $id = $request->input("id");

        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');
        $created_at = $request->input('created_at');

        if ($payment_type < 0 && $payment_type > 4) {
            throw new Error("Payment type is invalid!");
        }

        $dbRegister = $this->getById($id);

        CashRegister::where("id", $id)->update([
            'value' => $value,
            'payment_type' => $payment_type,
            'description' => $description,
            'created_at' => $created_at
        ]);

        $dbRegister->refresh();

        return response()->json([
            "message" => "Succesfull update",
            "register" => $dbRegister
        ], 200);
    }

    public function delete($id)
    {
        $register = $this->getById($id);
        $register->delete();

        return response()->json(['message' => 'The register was deleted with success!']);
    }
}
