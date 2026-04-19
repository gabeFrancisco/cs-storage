<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Services\ProductService;

class ProductController extends Controller
{
    private readonly ProductService $_productService;

    public function __construct(ProductService $productService)
    {
        $this->_productService = $productService;
    }

    public function getAll()
    {
        return response()->json($this->_productService->getAll(), 200);
    }

    public function post(ProductRequest $request)
    {
        $product = $this->_productService->create($request);
        return response()->json($product, 200);
    }
}
