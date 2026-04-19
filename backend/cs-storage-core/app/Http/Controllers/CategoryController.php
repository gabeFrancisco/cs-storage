<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    private readonly CategoryService $_categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->_categoryService = $categoryService;
    }

    public function getAll()
    {
        return response()->json($this->_categoryService->getAll(), 200);
    }

    public function post(CategoryRequest $request)
    {
        $category = $this->_categoryService->create($request);
        return response()->json($category, 200);
    }

    public function put(CategoryRequest $request)
    {
        $category = $this->_categoryService->update($request);
        return response()->json($category, 200);
    }

    public function delete($id)
    {
        $result = $this->_categoryService->remove($id);
        if (!$result) {
            return response()->json("Category not found!", 404);
        }

        return response()->json("Category deleted with success!", 200);
    }
}
