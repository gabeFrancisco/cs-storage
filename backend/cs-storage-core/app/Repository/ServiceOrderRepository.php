<?php

namespace App\Repository;

use App\Models\Address;
use App\Models\ServiceOrder;
use App\Models\Customer;
use App\Utils\ClassHelper;
use Carbon\Carbon;
use DB;
use Exception;

class ServiceOrderRepository
{
    private AddressRepository $addressRepository;
    private CustomerRepository $customerRepository;

    public function __construct(
        AddressRepository $addressRepository,
        CustomerRepository $customerRepository
    ) {
        $this->addressRepository = $addressRepository;
        $this->customerRepository = $customerRepository;
    }
    private function parseServiceOrder($dbServiceOrder)
    {
        $serviceOrder = ClassHelper::fillFromSql($dbServiceOrder, ServiceOrder::class, 's_');
        $customer = ClassHelper::fillFromSql($dbServiceOrder, Customer::class, 'c_');
        $address = ClassHelper::fillFromSql($dbServiceOrder, Address::class, 'a_');

        $serviceOrder->customer = $customer;
        $serviceOrder->address = $address;

        return $serviceOrder;
    }

    public function createServiceOrder(ServiceOrder $serviceOrder)
    {
        $dbServiceOrder = null;

        try {
            DB::beginTransaction();

            $dbAddress = $this->addressRepository->createAddress($serviceOrder->address);
            $dbCustomer = $this->customerRepository->createCustomer($serviceOrder->customer);

            $dbServiceOrder = DB::selectOne(
                'insert into service_orders(title, description, service_date, value, customer_id, address_id, created_at)
                    values (?,?,?,?,?,?,?) returning *',
                [
                    $serviceOrder->title,
                    $serviceOrder->description,
                    $serviceOrder->service_date,
                    $serviceOrder->value,
                    $dbCustomer->id,
                    $dbAddress->id,
                    Carbon::now()
                ]
            );

            DB::commit();

        } catch( Exception $e){
            error_log($e->getMessage());
            DB::rollBack();
        }
        return $dbServiceOrder;
    }
}
