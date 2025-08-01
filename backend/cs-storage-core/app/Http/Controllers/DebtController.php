<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Debt;
use App\Models\Address;
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
        $address = null;

        if (!empty($request->input('address'))) {
            $address = Address::create([
                'road' => $request->input('road'),
                'number' => $request->input('number'),
                'complement' => $request->input('complement'),
                'neighborhood' => $request->input('neighborhood'),
                'city' => $request->input('city'),
                'state' => $request->input('state')
            ]);
        }

        $customer = Customer::create([
            'name' => $request->input('customer.name'),
            'phone' => $request->input('customer.phone'),
            'cpf_cnpj' => $request->input('customer.cpf_cnpj'),

        ]);

        if($address){
            $customer->address()->associate($address);
        }

        $value = $request->input('value');
        $forecast = $request->input('forecast');

        $debt = new Debt([
            'value' => $value,
            'forecast' => $forecast,
            'paid_date' => now()->toString(),
        ]);

        $debt->customer()->associate($customer);
        $debt->save();

        return response()->json([
            "message" =>"Debt created successfuly",
            "result" => $debt
        ], 200);
    }
}
