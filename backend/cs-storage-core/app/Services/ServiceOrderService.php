<?php

namespace App\Services;

use App\Http\Requests\ServiceOrderRequest;
use App\Models\Customer;
use App\Models\Address;
use App\Models\ServiceOrder;
use DB;
use Exception;

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
        try {
            $result = DB::transaction(function () use ($requestData) {
                $customer = new Customer($requestData['customer']);
                $customer->save();

                $address = new Address($requestData['address']);
                $address->save();

                $serviceOrder = new ServiceOrder($requestData['serviceOrder']);
                $serviceOrder->customer()->associate($customer);
                $serviceOrder->address()->associate($address);
                $serviceOrder->save();
            });

            return $result;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update(ServiceOrderRequest $request)
    {
        $serviceOrder = $this->getRequestData($request);
        $dbServiceOrer = $this->serviceOrderRepository->updateServiceOrder($serviceOrder);

        return $dbServiceOrer;
    }

    public function remove($id)
    {
        $this->serviceOrderRepository->removeServiceOrder($id);
    }
}
