<?php

namespace App\Services;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Product;

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

    public function update(CategoryRequest $request, int $id)
    {
        $category = $this->getById($id);
        $category->update($request->validated());
        $category->save();

        return $category;
    }

    public function search($name)
    {
        return Category::where('name', 'LIKE', "{$name}%")->get();
    }

    public function remove($id)
    {
        $products = Product::where('category_id', $id);

        if ($products->count() > 0) {
            return false;
        }

        Category::destroy($id);
        return true;
    }
}