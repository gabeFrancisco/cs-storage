<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CashRegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'quantity' => 'required|numeric',
            'created_at' => 'required|date',
            'payment_type' => 'required|numeric',
            'product_id' => 'required|numeric'
        ];
    }
}
