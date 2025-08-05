<?php

namespace App\Services;

use App\Http\Requests\CashRegisterRequest;
use App\Models\CashRegister;
use Error;

class CashRegisterService
{
    public function getAll()
    {
        return CashRegister::all();
    }

    public function getById($id)
    {
        return CashRegister::findOrFail($id);
    }

    public function create(CashRegisterRequest $request)
    {
        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');
        $created_at = $request->input('created_at');

        if ($payment_type < 0 && $payment_type > 4) {
            throw new Error("Payment type is invalid!");
        }

        $register = CashRegister::create([
            'value' => $value,
            'payment_type' => $payment_type,
            'description' => $description,
            'created_at' => $created_at
        ]);

        return $register;
    }
}
