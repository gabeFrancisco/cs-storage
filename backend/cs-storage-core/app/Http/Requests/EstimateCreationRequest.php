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

            "items" => 'required|array',
            'items.*.name' => 'required|string',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|numeric|min:1',
            'items.*.price' => 'required|numeric',
            'items.*.product_type' => 'required|numeric'
        ];
    }
}
