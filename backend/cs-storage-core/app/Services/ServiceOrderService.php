<?php

namespace App\Services;

use App\Http\Requests\ServiceOrderRequest;
use App\Models\Customer;
use App\Models\Address;
use App\Models\ServiceOrder;
use App\Repository\ServiceOrderRepository;

class ServiceOrderService
{
    private ServiceOrderRepository $serviceOrderRepository;

    public function __construct(ServiceOrderRepository $serviceOrderRepository)
    {
        $this->serviceOrderRepository = $serviceOrderRepository;
    }

    public function getAll()
    {
        return $this->serviceOrderRepository->getAllServiceOrders();
    }
    public function create(ServiceOrderRequest $request)
    {
        $serviceOrder = new ServiceOrder();

        $serviceOrder->title = $request->input('title');
        $serviceOrder->description = $request->input('description');
        $serviceOrder->service_date = $request->input('service_date');
        $serviceOrder->value = $request->input('value');

        $serviceOrder->customer = new Customer();
        $serviceOrder->customer->name = $request->input('customer.name');
        $serviceOrder->customer->phone = $request->input('customer.phone');
        $serviceOrder->customer->cpf_cnpj = $request->input('customer.cpf_cnpj');

        $serviceOrder->address = new Address();
        $serviceOrder->address->road = $request->input('address.road');
        $serviceOrder->address->number = $request->input('address.number');
        $serviceOrder->address->complement = $request->input('address.complement');
        $serviceOrder->address->neighborhood = $request->input('address.neighborhood');
        $serviceOrder->address->city = $request->input('address.city');
        $serviceOrder->address->state = $request->input('address.state');

        $dbServiceOrder = $this->serviceOrderRepository->createServiceOrder($serviceOrder);

        return $dbServiceOrder;
    }
}
