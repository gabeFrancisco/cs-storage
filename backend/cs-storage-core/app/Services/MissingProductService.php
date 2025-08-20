<?php

namespace App\Services;

use App\Http\Requests\MissingProductRequest;
use App\Models\Customer;
use App\Models\MissingProduct;
use App\Repository\MissingProductRepository;

class MissingProductService
{
    private MissingProductRepository $missingProductRepository;
    public function __construct(MissingProductRepository $missingProductRepository) {
        $this->missingProductRepository = $missingProductRepository;
    }
    public function getAll()
    {
        return $this->missingProductRepository->getAllMissingProducts();
    }

    public function getById($id)
    {
        return MissingProduct::with('customer')->findOrFail($id);
    }

    public function setBoughtState(int $id, bool $state){
        $product = MissingProduct:: findOrFail($id);
        $product->is_bought = $state;
        $product->save();

        return $product;
    }

    public function create(MissingProductRequest $request)
    {
        $customer = null;
        if (
            !empty($request->input('customer.name'))
            ||
            !empty($request->input('customer.phone'))
        ) {
            $customer = Customer::create([
                'name' => $request->input('customer.name'),
                'phone' => $request->input('customer.phone')
            ]);
        }

        $missingProduct = new MissingProduct([
            'name' => $request->input('name'),
            'needed_day' => $request->input('needed_day'),
            'is_bought' => $request->input('is_bought'),
            'image_url' => $request->input('image_url')
        ]);

        if ($customer) {
            $missingProduct->customer()->associate($customer);
        }


        $missingProduct->save();

        return $missingProduct;
    }
}
