<?php

namespace App\Services;

use App\Http\Requests\MissingProductRequest;
use App\Models\Customer;
use App\Models\MissingProduct;

class MissingProductService
{
    public function getAll()
    {
        return MissingProduct::with('customer')->get();
    }

    public function getById($id)
    {
        return MissingProduct::with('customer')->findOrFail($id);
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
