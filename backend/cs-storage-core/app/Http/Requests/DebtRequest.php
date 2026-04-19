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
            'customer.address' => 'nullable|array',
            'customer.address.road' => 'nullable|string',
            'customer.address.number' => 'nullable|string',
            'customer.address.complement' => 'nullable|string',
            'customer.address.neighborhood' => 'nullable|string',
            'customer.address.city' => 'nullable|string',
            'customer.address.state' => 'nullable|string',
        ];
    }
}
