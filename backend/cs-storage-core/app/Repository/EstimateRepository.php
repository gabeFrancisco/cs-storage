<?php

namespace App\Repository;

use App\Models\Estimate;
use Exception;
use DB;
use App\Mappers\EstimateMapper;

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

    private $selectAllWithJoinQuery =
        'SELECT e.id        AS e_id,
            e.title         AS e_title,
            e.observations  AS e_observations,
            e.total         AS e_total,
            e.customer_id   AS e_customer_id,
            e.created_at    AS e_created_at,
            e.updated_at    AS e_updated_at,
            c.id            AS c_id,
            c.name          AS c_name,
            c.phone         AS c_phone,
            c.cpf_cnpj      AS c_cpf_cnpj,
            c.created_at    AS c_created_at,
            c.updated_at    AS c_updated_at,
            ei.id           AS ei_id,
            ei.name         AS ei_name,
            ei.description  AS ei_description,
            ei.quantity     AS ei_quantity,
            ei.price        AS ei_price,
            ei.product_type AS ei_product_type,
            ei.total        AS ei_total,
            ei.estimate_id  AS ei_estimate_id,
            ei.created_at   AS ei_created_at,
            ei.updated_at   AS ei_updated_at
        FROM estimates e
            INNER JOIN customers c
                ON e.customer_id = c.id
            LEFT JOIN estimate_items ei
                ON ei.estimate_id = e.id
            ';

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

    public function getAllEstimates()
    {
        $result = DB::select($this->selectAllWithJoinQuery);
        $content = [];
        foreach($result as $value){
            $content[] = EstimateMapper::fromSql($value);
        }
        return $content;
    }
}
