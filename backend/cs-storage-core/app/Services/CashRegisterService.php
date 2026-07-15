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
        return CashRegister::with('product')->get();
    }

    public function getAllByDate($date)
    {
        return CashRegister::with('product')
            ->whereDate('created_at', $date)
            ->get();
    }

    public function getById($id)
    {
        return CashRegister::with('product')->findOrFail($id);
    }


    //TODO - refactor this!!!!
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
        $value = $this->calculateProductPrice($quantity, $product);

        $register = new CashRegister();
        $register->quantity = $quantity;
        $register->payment_type = $payment_type;
        $register->value = $value;
        $register->product()->associate($product);
        $register->save();

        return $register;
    }

    public function update(CashRegisterRequest $request, int $id)
    {
        //Finds in the db the actual register
        $register = CashRegister::findOrFail($id);

        $quantity = $request->input('quantity');
        $payment_type = $request->input('payment_type');
        $productId = $request->input('product_id');

        $this->checkPaymentType($payment_type);
        $product = Product::findOrFail($productId);
        $value = $this->calculateProductPrice($quantity, $product);

        $register->quantity = $quantity;
        $register->payment_type = $payment_type;
        $register->value = $value;
        $register->product()->associate($product);
        $register->save();

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

    private function calculateProductPrice(int $quantity, Product $product)
    {
        return $quantity * $product->price;
    }
}
