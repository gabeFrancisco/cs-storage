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

    public function create(MissingProductRequest $request)
    {
        if(!empty($request)){
            $missingProduct = MissingProduct::create([
                'name' => $request->input('name'),
                'needed_day' => $request->input('needed_day'),
                'is_bought' => $request->input('is_bought'),
                'image_url' => $request->input('image_url')
            ]);
        }

        return $missingProduct;
    }
}
