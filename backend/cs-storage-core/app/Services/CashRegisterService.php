<?php

namespace App\Services;

use App\Http\Requests\CashRegisterRequest;
use App\Models\CashRegister;
use App\Models\Product;
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

    private function parseCashRegister($quantity, $payment_type, $product_id, $value)
    {
        return [
            'quantity' => $quantity,
            'payment_type' => $payment_type,
            'product_id' => $product_id,
            'value' => $value
        ];
    }

    public function create(CashRegisterRequest $request)
    {
        $quantity = $request->input('quantity');
        $payment_type = $request->input('payment_type');
        $productId = $request->input('product_id');

        $this->checkPaymentType($payment_type);

        $product = Product::findOrFail($productId);
        $value = $quantity * $product->price;

        $register = CashRegister::create($this->parseCashRegister($quantity, $payment_type, $productId, $value));

        return $register;
    }

    public function update(CashRegisterRequest $request, int $id)
    {
        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');

        $this->checkPaymentType($payment_type);

        $register = CashRegister::where('id', $id)
            ->update($this->parseCashRegister($value, $payment_type));

        return $register;
    }

    public function remove($id)
    {
        return CashRegister::destroy($id);
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
