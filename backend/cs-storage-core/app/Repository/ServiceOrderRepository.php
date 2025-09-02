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

    private $selectAllWithJoinQuery =
        'SELECT s.id  AS s_id,
            s.title        AS s_title,
            s.description  AS s_description,
            s.value        AS s_value,
            s.customer_id  AS s_customer_id,
            s.address_id   AS s_address_id,
            s.service_date AS s_service_date,
            s.created_at   AS s_created_at,
            s.updated_at   AS s_updated_at,
            c.id           AS c_id,
            c.name         AS c_name,
            c.phone        AS c_phone,
            c.cpf_cnpj     AS c_cpf_cnpj,
            a.id           AS a_id,
            a.road         AS a_road,
            a.number       AS a_number,
            a.complement   AS a_complement,
            a.neighborhood AS a_neighborhood,
            a.city         AS a_city,
            a.state        AS a_state,
            a.created_at   AS a_created_at,
            a.updated_at   AS a_updated_at
        FROM   service_orders s
            INNER JOIN customers c
                    ON s.customer_id = c.id
            INNER JOIN addresses a
                    ON s.address_id = a.id ';

    private function parseServiceOrder($dbServiceOrder)
    {
        $serviceOrder = ClassHelper::fillFromSql($dbServiceOrder, ServiceOrder::class, 's_');
        $customer = ClassHelper::fillFromSql($dbServiceOrder, Customer::class, 'c_');
        $address = ClassHelper::fillFromSql($dbServiceOrder, Address::class, 'a_');

        $serviceOrder->customer = $customer;
        $serviceOrder->address = $address;

        return $serviceOrder;
    }

    public function getAllServiceOrders(){
        $dbServiceOrders = DB::select($this->selectAllWithJoinQuery);

        $serviceOrders = [];

        foreach($dbServiceOrders as $row){
            $serviceOrder = $this->parseServiceOrder($row);
            $serviceOrders[] = $serviceOrder;
        }

        return $serviceOrders;
    }

    public function getServiceOrder($id){
        $dbServiceOrder = DB::selectOne($this->selectAllWithJoinQuery . ' WHERE s_id = ?', [$id]);
        $serviceOrder = $this->parseServiceOrder($dbServiceOrder);

        return $serviceOrder;
    }

    public function createServiceOrder(ServiceOrder $serviceOrder)
    {
        DB::beginTransaction();

        try {

            $dbAddress = $this->addressRepository->createAddress($serviceOrder->address);
            $dbCustomer = $this->customerRepository->createCustomer($serviceOrder->customer);

            $dbServiceOrder = DB::selectOne(
                'INSERT INTO service_orders
                            (title, description, service_date, value, customer_id, address_id, created_at)
                        VALUES (?,?,?,?,?,?,?) returning *',
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

    //TODO
    // public function updateServiceOrder(ServiceOrder $serviceOrder){
    //     DB::beginTransaction();

    //     try{
    //
    //     }
    // }
}
