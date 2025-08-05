<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CashRegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'numeric',
            'value' => 'required|string',
            'created_at' => 'required|date',
            'payment_type' => 'required|numeric',
            'description' => 'required|string'
        ];
    }
}
