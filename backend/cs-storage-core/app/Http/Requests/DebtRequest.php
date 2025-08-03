<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DebtRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'value' => 'required|numeric',
            'forecast' => 'required|date',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'customer.cpf_cnpj' => 'required|string',
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
