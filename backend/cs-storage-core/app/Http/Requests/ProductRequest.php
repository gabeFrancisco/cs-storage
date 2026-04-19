<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'numeric',
            'name' => 'required|string',
            'description' => 'string',
            'quantity' => 'required|numeric',
            'price' => 'required|numeric',
            'product_type' => 'required|numeric',
            'category_id' => 'required|numeric'
        ];
    }
}
