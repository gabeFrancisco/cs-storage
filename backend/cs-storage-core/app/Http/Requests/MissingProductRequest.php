<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MissingProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'numeric',
            'name' => 'required|string',
            'needed_day' => 'required|date',
            'customer_name' => 'string|nullable',
            'customer_phone' => 'string|nullable',
            'image_url' => 'string|nullable'
        ];
    }
}
