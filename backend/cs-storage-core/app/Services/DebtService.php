<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Address;
use App\Http\Requests\DebtRequest;
use App\Models\Debt;
use Exception;
use DB;
class DebtService
{
    public function getAll()
    {
        return Debt::with('customer.address')->get();
    }

    public function getById($id)
    {
        return Debt::with('customer.address')->findOrFail($id);
    }

    public function create(DebtRequest $request)
    {
        try {
            $result = DB::transaction(function () use ($request) {

                if (!empty($request->input('customer.address'))) {
                    $address = Address::create($request->input('customer.address'));
                }

                $customer = new Customer($request->input('customer'));
                $customer->address()->associate($address);
                $customer->save();

                $debt = new Debt([
                    "value" => $request->input('value'),
                    "forecast" => $request->input('forecast')
                ]);

                $debt->customer()->associate($customer);
                $debt->save();

                return $debt->load('customer.address');
            });

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update(DebtRequest $request)
    {
        $id = $request->input('id');

        try {
            $result = DB::transaction(function () use ($request, $id) {
                $debt = Debt::with('customer.address')->findOrFail($id);
                $customer = $debt->customer;

                if ($request->has('customer.address')) {
                    if ($customer->address) {
                        //if customer exists
                        $customer->address->update($request->input('customer.address'));
                    } else {
                        //if customer does not exists
                        $newAddress = Address::create($request->input('customer.address'));
                        $customer->address()->associate($newAddress);
                        $customer->save();
                    }
                }

                $customer->update($request->input('customer'));
                $debt->update([
                    "value" => $request->input('value'),
                    "forecast" => $request->input('forecast')
                ]);

            });
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function remove($id)
    {
        Debt::destroy($id);
    }

    public function getDayAndMonthTotal()
    {
        $day = Debt::whereDate('created_at', today())->sum('value');
        $month = Debt::whereMonth('created_at', now()->month)->sum('value');

        return [
            "day" => $day != null ? $day : 0,
            "month" => $month != null ? $month : 0
        ];
    }
}
