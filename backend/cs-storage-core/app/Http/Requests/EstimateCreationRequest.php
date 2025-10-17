<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EstimateCreationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'observations' => 'nullable|string',

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

            'estimate_item.name' => 'required|string',
            'estimate_item.description' => 'nullable|string',
            'estimate_item.quantity' => 'required|numeric|min:1',
            'estimate_item.price' => 'required|numeric',
            'estimate_item.product_type' => 'required|numeric'
        ];
    }
}
