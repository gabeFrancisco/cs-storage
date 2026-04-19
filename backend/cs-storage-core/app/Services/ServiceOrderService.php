<?php

namespace App\Services;

use App\Http\Requests\ServiceOrderRequest;
use App\Models\Customer;
use App\Models\Address;
use App\Models\ServiceOrder;
use DB;

class ServiceOrderService
{
    private function getRequestData(ServiceOrderRequest $request)
    {

        return [
            'address' => $request->input('address'),
            'customer' => $request->input('customer'),
            'serviceOrder' => $request->only(['id', 'title', 'description', 'service_date', 'value', 'priority'])
        ];
    }

    public function getAll()
    {
        return ServiceOrder::with('customer', 'address')->get();
    }

    public function getById($id)
    {
        return ServiceOrder::findOrFail($id);
    }

    public function create(ServiceOrderRequest $request)
    {
        $requestData = $this->getRequestData($request);

        $result = DB::transaction(function () use ($requestData) {
            $serviceOrder = new ServiceOrder($requestData['serviceOrder']);

            $customer = new Customer($requestData['customer']);
            $customer->save();

            if ($requestData['address'] != null) {
                $address = new Address($requestData['address']);
                $address->save();
                $serviceOrder->address()->associate($address);
            }

            $serviceOrder->customer()->associate($customer);
            $serviceOrder->save();
        });

        return $result;
    }

    public function update(ServiceOrderRequest $request)
    {
        $requestData = $this->getRequestData($request);

        $result = DB::transaction(function () use ($requestData) {
            $serviceOrder = ServiceOrder::with('customer', 'address')->findOrFail($requestData['serviceOrder']['id']);

            if ($serviceOrder->has('address')) {
                if ($requestData['address'] != null) {
                    $serviceOrder->address->update($requestData['address']);
                } else {
                    $serviceOrder->address->delete();
                }
            } else {
                $newAddress = Address::create($requestData['address']);
                $serviceOrder->address()->associate($newAddress);
            }

            $serviceOrder->customer->update($requestData['customer']);
            $serviceOrder->update($requestData['serviceOrder']);
        });

        return $result;
    }

    public function remove($id)
    {
        return ServiceOrder::destroy($id);
    }
}
