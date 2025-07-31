<?php

namespace App\Http\Controllers;

use App\Models\CashRegister;
use Error;
use Illuminate\Http\Request;

class CashRegisterController extends Controller
{
    public function getAll(){
        $registers = CashRegister::all();
        return response()->json($registers, 200);
    }

    public function post(Request $request){
        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');
        $created_at = $request->input('created_at');

        if($payment_type < 0 && $payment_type > 4){
            throw new Error("Payment type is invalid!");
        }

        CashRegister::create([
            'value' => $value,
            'payment_type' => $payment_type,
            'description' => $description,
            'created_at' => $created_at
        ]);

        return response("Ok", 200);
    }
}
