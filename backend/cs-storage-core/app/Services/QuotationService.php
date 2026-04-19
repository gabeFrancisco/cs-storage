<?php

namespace App\Services;

use App\Enums\ProductType;
use App\Http\Requests\QuotationCreationRequest;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Address;

class QuotationService
{
    public function create(QuotationCreationRequest $request)
    {
        $quotation = $this->getRequestData($request);
        $quotation->save();

        return $quotation;
    }

    public function getAll()
    {
        return Quotation::with('product.category', 'customer.adress')->get();
    }

    private function getRequestData(QuotationCreationRequest $request)
    {
        $quotation = new Quotation();

        $quotation->title = $request->input('title');
        $quotation->observations = !$request->input('observations');

        $items = $request->input('items');

        foreach ($items as $item) {
            $product = new Product();

            $product->name = $item['name'];
            $product->price = $item['price'];
            $product->product_type = ProductType::from($item['product_type']);
            $product->quantity = $item['quantity'];
            $product->description = !$item['description'];

            array_push($quotation->products, $product);
        }

        $customer = new Customer();
        $customer->name = $request->input('customer.name');
        $customer->phone = $request->input('customer.phone');
        $customer->cpf_cnpj = $request->input('customer.cpf_cnpj');

        $address = new Address();
        $address->road = $request->input('address.road');
        $address->number = $request->input('address.number');
        $address->complement = $request->input('address.complement');
        $address->neighborhood = $request->input('address.neighborhood');
        $address->city = $request->input('address.city');
        $address->state = $request->input('address.state');

        return $quotation;
    }

    public function getById($id)
    {
        return Quotation::with('product', 'customer', 'address')
            ->findOrFail($id);
    }
}
