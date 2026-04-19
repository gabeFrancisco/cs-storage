<?php

namespace App\Services;

use App\Http\Requests\MissingProductRequest;
use App\Models\MissingProduct;

class MissingProductService
{
    public function getAll()
    {
        return MissingProduct::all();
    }

    public function getById($id)
    {
        return MissingProduct::findOrFail($id);
    }

    public function setBoughtState(int $id, bool $state)
    {
        $product = $this->getById($id);
        $product->is_bought = $state;
        $product->save();

        return $product;
    }

    public function create(MissingProductRequest $request)
    {
        $missingProduct = new MissingProduct();

        $missingProduct->name = $request->input('name');
        $missingProduct->needed_day = $request->input('needed_day');
        $missingProduct->image_url = $request->input('image_url');
        $missingProduct->customer_name = $request->input('customer_name');
        $missingProduct->customer_phone = $request->input('customer_phone');

        $missingProduct->save();

        return $missingProduct;
    }

    public function remove($id)
    {
        return MissingProduct::destroy($id);
    }

    public function removeAllBought()
    {
        MissingProduct::where('is_bought', true)->delete();
    }
}
