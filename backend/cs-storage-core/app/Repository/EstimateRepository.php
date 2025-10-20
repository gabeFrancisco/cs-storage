<?php

namespace App\Repository;

use App\Models\Estimate;
use Exception;
use DB;

class EstimateRepository
{
    private EstimateItemRepository $estimateItemRepository;
    private CustomerRepository $customerRepository;

    public function __construct(
        EstimateItemRepository $estimateRepository,
        CustomerRepository $customerRepository
    ) {
        $this->estimateItemRepository = $estimateRepository;
        $this->customerRepository = $customerRepository;
    }

    public function createEstimate(Estimate $estimate)
    {

        DB::beginTransaction();

        try {
            if (!empty($estimate->items)) {
                foreach ($estimate->items as $item) {
                    $this->estimateItemRepository->createEstimateItem($item);
                }
            }

            $this->customerRepository->createCustomer($estimate->customer);



        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
