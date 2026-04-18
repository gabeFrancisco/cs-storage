<?php

namespace App\Services;

use App\Http\Requests\CashRegisterRequest;
use App\Models\CashRegister;
use Error;

class CashRegisterService
{
    private function checkPaymentType($payment_type)
    {
        if ($payment_type < 0 && $payment_type > 4) {
            throw new Error("Payment type is invalid!");
        }
    }

    public function getAll()
    {
        return CashRegister::all();
    }

    public function getAllByDate($date)
    {
        return CashRegister::whereDate('created_at', $date)->get();
    }

    public function getById($id)
    {
        return CashRegister::findOrFail($id);
    }

    private function parseCashRegister($value, $payment_type, $description)
    {
        return [
            'value' => $value,
            'payment_type' => $payment_type,
            'description' => $description
        ];
    }

    public function create(CashRegisterRequest $request)
    {
        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');

        $this->checkPaymentType($payment_type);

        $register = CashRegister::create($this->parseCashRegister($value, $payment_type, $description));

        return $register;
    }

    public function update(CashRegisterRequest $request)
    {
        $id = $request->input("id");

        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');

        $this->checkPaymentType($payment_type);

        $register = CashRegister::where('id', $id)
            ->update($this->parseCashRegister($value, $payment_type, $description));

        return $register;
    }

    public function remove($id)
    {
        CashRegister::destroy($id);
    }

    public function getDayAndMonthTotal()
    {
        $day = CashRegister::whereDate('created_at', today())->sum('value');
        $month = CashRegister::whereMonth('created_at', now()->month)->sum('value');

        return [
            "day" => $day != null ? $day : 0,
            "month" => $month != null ? $month : 0
        ];
    }
}
