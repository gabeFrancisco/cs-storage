<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    public function getAll()
    {
        $debts = Debt::with('customer.address', )->get();
        return response()->json($debts, 200);
    }

    public function post(Request $request)
    {
        $value = $request->input('value');
        $forecast = $request->input('forecast');

        $debt = Debt::create([
            'value' => $value,
            'forecast' => $forecast,
            'paid_date' => now()->toString()
        ]);

        $customer = $debt->customer()->create([

        ]);
    }
}
