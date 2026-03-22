<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Address;
use App\Http\Requests\DebtRequest;
use App\Models\Debt;
use App\Repository\AddressRepository;
use App\Repository\CustomerRepository;
use App\Repository\DebtRepository;
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

        $debt = new Debt();
        $debt->id = $id;
        $debt->value = $request->input('value');
        $debt->forecast = $request->input('forecast');

        $customer = new Customer();
        $customerData = $request->input('customer');
        $customer->name = $customerData['name'];
        $customer->phone = $customerData['phone'];
        $customer->cpf_cnpj = $customerData['cpf_cnpj'];

        $address = new Address();
        $addressData = $customerData['address'];
        $address->road = $addressData['road'];
        $address->number = $addressData['number'];
        $address->complement = $addressData['complement'];
        $address->neighborhood = $addressData['neighborhood'];
        $address->city = $addressData['city'];
        $address->state = $addressData['state'];

        $dbDebt = $this->debtRepository->updateDebt($debt, $customer, $address);

        return $dbDebt;
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
