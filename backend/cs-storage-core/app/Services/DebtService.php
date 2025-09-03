<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Address;
use App\Http\Requests\DebtRequest;
use App\Models\Debt;
use App\Repository\AddressRepository;
use App\Repository\CustomerRepository;
use App\Repository\DebtRepository;
class DebtService
{
    private DebtRepository $debtRepository;
    private CustomerRepository $customerRepository;
    private AddressRepository $addressRepository;

    public function __construct(
        DebtRepository $debtRepository,
        CustomerRepository $customerRepository,
        AddressRepository $addressRepository
    ) {
        $this->debtRepository = $debtRepository;
        $this->customerRepository = $customerRepository;
        $this->addressRepository = $addressRepository;
    }
    public function getAll()
    {
        return $this->debtRepository->getAllDebts();
    }

    public function getById($id)
    {
        return $this->debtRepository->getDebt($id);
    }

    public function create(DebtRequest $request)
    {
        $address = null;

        if (!empty($request->input('customer.address'))) {
            $address = new Address();
            $address->road = $request->input('customer.address.road');
            $address->number = $request->input('customer.address.number');
            $address->complement = $request->input('customer.address.complement');
            $address->neighborhood = $request->input('customer.address.neighborhood');
            $address->city = $request->input('customer.address.city');
            $address->state = $request->input('customer.address.state');

        }

        $customer = new Customer();
        $customer->name = $request->input('customer.name');
        $customer->phone = $request->input('customer.phone');
        $customer->cpf_cnpj = $request->input('customer.cpf_cnpj');
        $address->id;

        $value = $request->input('value');
        $forecast = $request->input('forecast');

        $debt = new Debt();
        $debt->value = $value;
        $debt->forecast = $forecast;

        $this->debtRepository->createDebt($debt, $customer, $address);

        return $debt;
    }

    public function update(DebtRequest $request)
    {
        $id = $request->input('id');

        $debt = new Debt();
        $debt->id = $id;
        $debt->value = $request->input('value');
        $debt->forecast = $request->input('forecast');

        $customer = new Customer();
        $customerData = $request->input('customer');
        $customer->name = $customerData['name'];
        $customer->phone = $customerData['phone'];
        $customer->cpf_cnpj = $customerData['cpf_cnpj'];

        $address = new Address();
        $addressData = $customerData['address'];
        $address->road = $addressData['road'];
        $address->number = $addressData['number'];
        $address->complement = $addressData['complement'];
        $address->neighborhood = $addressData['neighborhood'];
        $address->city = $addressData['city'];
        $address->state = $addressData['state'];

        $dbDebt = $this->debtRepository->updateDebt($debt, $customer, $address);

        return $dbDebt;
    }

    public function remove($id)
    {
        $debt = $this->debtRepository->removeDebt($id);
        return $debt;
    }

    public function getDayAndMonthTotal()
    {
       return $this->debtRepository->getDayAndMonthTotal();
    }
}
