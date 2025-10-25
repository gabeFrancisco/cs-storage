<?php

namespace App\Services;

use App\Enums\ProductType;
use App\Http\Requests\EstimateCreationRequest;
use App\Models\Estimate;
use App\Models\Customer;
use App\Models\Address;
use App\Models\EstimateItem;
use App\Repository\EstimateRepository;

class EstimateService
{
    private EstimateRepository $estimateRepository;
    public function __construct(EstimateRepository $estimateRepository)
    {
        $this->estimateRepository = $estimateRepository;
    }

    public function create(EstimateCreationRequest $request)
    {
        $estimate = $this->getRequestData($request);
        return $estimate;
    }

    private function getRequestData(EstimateCreationRequest $request)
    {
        $estimate = new Estimate();

        $estimate->title = $request->input('title');
        $estimate->observations = !$request->input('observations');

        $items = $request->input('items');

        foreach($items as $item){
            $estimateItem = new EstimateItem();

            $estimateItem->name = $item['name'];
            $estimateItem->price = $item['price'];
            $estimateItem->productType = ProductType::from($item['product_type']);
            $estimateItem->quantity = $item['quantity'];
            $estimateItem->description = !$item['description'];

            array_push($estimate->items, $estimateItem);
        }

        $estimate->customer = new Customer();
        $estimate->customer->name = $request->input('customer.name');
        $estimate->customer->phone = $request->input('customer.phone');
        $estimate->customer->cpf_cnpj = $request->input('customer.cpf_cnpj');

        $estimate->customer->address = new Address();
        $estimate->customer->address->road = $request->input('address.road');
        $estimate->customer->address->number = $request->input('address.number');
        $estimate->customer->address->complement = $request->input('address.complement');
        $estimate->customer->address->neighborhood = $request->input('address.neighborhood');
        $estimate->customer->address->city = $request->input('address.city');
        $estimate->customer->address->state = $request->input('address.state');
//
        return $estimate;
    }
}
