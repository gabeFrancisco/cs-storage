<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DebtRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'value' => 'required|numeric',
            'forecast' => 'required|date',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'customer.cpf_cnpj' => 'nullable|string',
            'address' => 'nullable|array',
            'address.road' => 'nullable|string',
            'address.number' => 'nullable|string',
            'address.complement' => 'nullable|string',
            'address.neighborhood' => 'nullable|string',
            'address.city' => 'nullable|string',
            'address.state' => 'nullable|string',
        ];
    }
}
