<?php

namespace App\Services;

use App\Http\Requests\ProductRequest;
use App\Models\Product;

class ProductService
{
    private function getRequestData(ProductRequest $request)
    {
        $product = new Product();

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->quantity = $request->input('quantity');
        $product->price = $request->input('price');
        $product->product_type = $request->input('product_type');
        $product->category_id = $request->input('category_id');

        return $product;
    }
    public function getAll()
    {
        return Product::with('category')->get();
    }

    public function getById($id)
    {
        return Product::with('category')
            ->findOrFail($id);
    }

    public function create(ProductRequest $request)
    {
        $product = $this->getRequestData($request);
        $product->save();

        return $product;
    }

    public function update(ProductRequest $request, int $id)
    {
        $product = $this->getById($id);
        $product->update($request->validated());
        $product->save();

        return $product;
    }
}