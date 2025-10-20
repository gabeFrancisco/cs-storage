<?php

namespace App\Repository;

use App\Models\Estimate;
use Exception;
use DB;
use Illuminate\Support\Carbon;

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
            $dbCustomer = $this->customerRepository->createCustomer($estimate->customer);
            $dbEstimate = DB::selectOne(
                'INSERT INTO estimates(title, observations, total, customer_id, created_at)
                VALUES (?,?,?,?,?) RETURNING *',
                [
                    $estimate->title,
                    $estimate->observations,
                    $estimate->getTotal(),
                    $dbCustomer->id,
                    Carbon::now()
                ]
            );

            if (!empty($estimate->items)) {
                foreach ($estimate->items as $item) {
                    $item->estimate_id = $dbEstimate->id;
                    $this->estimateItemRepository->createEstimateItem($item);
                }
            }

            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
