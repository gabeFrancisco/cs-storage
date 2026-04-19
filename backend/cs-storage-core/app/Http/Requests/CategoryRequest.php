<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'numeric',
            'name' => 'required|string',
            'description' => 'string',
            'color' => 'string'
        ];
    }
}
