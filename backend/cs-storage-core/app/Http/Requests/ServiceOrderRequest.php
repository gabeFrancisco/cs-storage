<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceOrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'numeric|nullable',
            'title' => 'required|string',
            'description' => 'required|string',
            'service_date' => 'date|nullable',
            'value' => 'numeric|nullable',
            'customer' => 'required',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'customer.cpf_cnpj' => 'nullable|string',
            'address.road' => 'nullable|string',
            'address.number' => 'nullable|string',
            'address.complement' => 'nullable|string',
            'address.neighborhood' => 'nullable|string',
            'address.city' => 'nullable|string',
            'address.state' => 'nullable|string',
        ];
    }
}
