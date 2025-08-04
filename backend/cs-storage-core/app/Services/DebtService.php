<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Address;
use App\Http\Requests\DebtRequest;
use App\Models\Debt;
class DebtService
{
    public function getAll(){
        return Debt::with('customer.address')->get();
    }

    public function getById($id){
        return Debt::with('customer', 'customer.address')->find($id);
    }

    public function create(DebtRequest $request)
    {
        $address = null;

        if (!empty($request->input('customer.address'))) {
            $address = Address::create([
                'road' => $request->input('customer.address.road'),
                'number' => $request->input('customer.address.number'),
                'complement' => $request->input('customer.address.complement'),
                'neighborhood' => $request->input('customer.address.neighborhood'),
                'city' => $request->input('customer.address.city'),
                'state' => $request->input('customer.address.state')
            ]);
        }

        $customer = Customer::create([
            'name' => $request->input('customer.name'),
            'phone' => $request->input('customer.phone'),
            'cpf_cnpj' => $request->input('customer.cpf_cnpj'),

        ]);

        if ($address) {
            $customer->address()->associate($address);
            $customer->save();
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

        return $debt;
    }
}
