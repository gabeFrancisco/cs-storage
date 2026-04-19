<?php

namespace App\Services;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryService
{
    private function getRequestData(CategoryRequest $request)
    {
        $category = new Category();
        $category->id = $request['id'];
        $category->name = $request['name'];
        $category->description = $request['description'];

        $category->color = $request['color'] ?: "#777";

        return $category;
    }
    public function getAll()
    {
        return Category::all();
    }

    public function create(CategoryRequest $request)
    {
        $category = $this->getRequestData($request);
        $category->save();

        return $category;
    }

    public function getById($id)
    {
        return Category::findOrFail($id);
    }

    public function update(CategoryRequest $request)
    {
        $category = $this->getRequestData($request);
        $category->save();

        return $category;
    }

    public function remove($id)
    {
        return Category::destroy($id);
    }
}