<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Address;
use App\Http\Requests\DebtRequest;
use App\Models\Debt;
use App\Repository\AddressRepository;
use App\Repository\CustomerRepository;
use App\Repository\DebtRepository;
use Carbon\Carbon;
class DebtService
{
    private DebtRepository $debtRepository;


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
        return Debt::with('customer.address')->get();
    }

    public function getById($id)
    {
        return Debt::with('customer', 'customer.address')->findOrFail($id);
    }

    public function create(DebtRequest $request)
    {
        $address = null;

        if (!empty($request->input('customer.address'))) {
            $address = new Address(
                null,
                $request->input('customer.address.road'),
                $request->input('customer.address.number'),
                $request->input('customer.address.complement'),
                $request->input('customer.address.neighborhood'),
                $request->input('customer.address.city'),
                $request->input('customer.address.state'),
                date('Y-m-d')
            );
        }

        $customer = new Customer(
            null,
            $request->input('customer.name'),
            $request->input('customer.phone'),
            $request->input('customer.cpf_cnpj'),
            $address->id,
            date('Y-m-d')
        );

        // if ($address) {
        //     $customer->address()->associate($address);
        //     $customer->save();
        // }

        $value = $request->input('value');
        $forecast = $request->input('forecast');

        $debt = $this->debtRepository->createDebt(new Debt(
            null,
            $value,
            $forecast,
            $customer->id,
            date("Y-m-d"),
        ), $customer, $address);

        // $debt->customer()->associate($customer);
        // $debt->save();

        return $debt;
    }

    public function update(DebtRequest $request)
    {
        $id = $request->input('id');
        $debt = Debt::with('customer.address')->findOrFail($id);

        $debt->value = $request->input('value');
        $debt->forecast = $request->input('forecast');
        $debt->updated_at = now()->toString();
        $debt->save();

        if ($request->has('customer', 'customer.address')) {
            $customerData = $request->input('customer');
            $customer = $debt->customer;

            $customer->name = $customerData['name'];
            $customer->phone = $customerData['phone'];
            $customer->cpf_cnpj = $customerData['cpf_cnpj'];
            $customer->updated_at = now()->toString();


            if (isset($customerData['address'])) {
                $addressData = $customerData['address'];
                if ($customer->address != null) {

                    $address = $customer->address;

                    $address->road = $addressData['road'];
                    $address->number = $addressData['number'];
                    $address->complement = $addressData['complement'];
                    $address->neighborhood = $addressData['neighborhood'];
                    $address->city = $addressData['city'];
                    $address->state = $addressData['state'];

                    $address->save();
                } else {
                    $newAddress = Address::create([
                        'road' => $addressData['road'],
                        'number' => $addressData['number'],
                        'complement' => $addressData['complement'],
                        'neighborhood' => $addressData['neighborhood'],
                        'city' => $addressData['city'],
                        'state' => $addressData['state']
                    ]);

                    $customer->address()->associate($newAddress);
                }
            }

            $customer->save();
        }

        return $debt;
    }

    public function remove($id)
    {
        $debt = $this->getById($id);
        $debt->delete();

        return $debt;
    }

    public function getDayAndMonthTotal()
    {
        $day = Debt::whereDate('created_at', Carbon::today())->sum('value');
        $month = Debt::whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->get()->sum('value');

        return [
            'day' => $day,
            'month' => $month
        ];
    }
}
