<?php

namespace App\Http\Controllers;

use App\Http\Requests\MissingProductRequest;
use App\Services\MissingProductService;
use Illuminate\Http\Request;

class MissingProductController extends Controller
{
    private MissingProductService $_missingProductService;
    public function __construct(MissingProductService $missingProductService)
    {
        $this->_missingProductService = $missingProductService;
    }

    public function getAll()
    {
        $missingProducts = $this->_missingProductService->getAll();
        return response()->json($missingProducts);
    }

    public function post(MissingProductRequest $request)
    {
        $missingProduct = $this->_missingProductService->create($request);
        return response()->json($missingProduct);
    }
}
