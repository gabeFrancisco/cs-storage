<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private readonly CategoryService $_cashRegisterService;

    public function __construct(CategoryService $categoryService)
    {
        $this->_cashRegisterService = $categoryService;
    }

    public function getAll()
    {
        return response()->json($this->_cashRegisterService->getAll(), 200);
    }

    public function post(CategoryRequest $request)
    {
        $category = $this->_cashRegisterService->create($request);
        return response()->json($category, 200);
    }
}
