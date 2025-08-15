<?php

namespace App\Repository;

use App\Models\Debt;
use Illuminate\Support\Facades\DB;
use Exception;

class DebtRepository
{
    private CustomerRepository $customerRepository;
    private AddressRepository $addressRepository;
    public function __construct(
        CustomerRepository $customerRepository,
        AddressRepository $addressRepository
    ) {
        $this->customerRepository = $customerRepository;
        $this->addressRepository = $addressRepository;
    }
    public function createDebt(Debt $debt)
    {
        DB::beginTransaction();

        try {
            $address = $this->addressRepository->createAddress($debt->customer->address);
            $customer = $this->customerRepository->createCustomer($debt->customer);

            $dbDebt = DB::selectOne(
                'insert into debts(value, forecast, customer_id, created_at)
                    values (?,?,?,?)',
                [
                    $debt->value,
                    $debt->forecast,
                    $debt->customer_id,
                    $debt->created_at
                ]
            );

            DB::commit();
        }
        catch(Exception $e){
            error_log($e->getMessage());
            DB::rollBack();
        }


        return $dbDebt;
    }
}
