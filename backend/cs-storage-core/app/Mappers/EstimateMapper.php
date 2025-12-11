<?php

namespace App\Mappers;

use App\Enums\ProductType;
use App\Models\Customer;
use App\Models\Estimate;
use App\Models\EstimateItem;

class EstimateMapper
{
    public static function fromSqlList($source)
    {
        $estimates = [];

        foreach ($source as $row) {
            $estimateId = $row->e_id;

            $estimate = new Estimate();
            $estimate->id = $estimateId;
            $estimate->title = $row->e_title;
            $estimate->observations = $row->e_observations;
            $estimate->created_at = $row->e_created_at;
            $estimate->updated_at = $row->e_updated_at;

            $customer = new Customer();
            $customer->id = $row->c_id;
            $customer->name = $row->c_name;
            $customer->phone = $row->c_phone;
            $customer->cpf_cnpj = $row->c_cpf_cnpj;
            $customer->created_at = $row->c_created_at;
            $customer->updated_at = $row->c_updated_at;

            $estimate->customer = $customer;

            if(!isset($estimates[$estimateId])){
                $estimates[$estimateId] = $estimate;
            }

            if($row->ei_id !== null){
                $estimateItem = new EstimateItem();
                $estimateItem->id = $row->ei_id;
                $estimateItem->name = $row->ei_name;
                $estimateItem->description = $row->ei_description;
                $estimateItem->quantity = $row->ei_quantity;
                $estimateItem->price = $row->ei_price;
                $estimateItem->productType = ProductType::from($row->ei_product_type);
                $estimateItem->getTotal();
                $estimateItem->estimate_id = $estimateId;
                $estimateItem->created_at = $row->ei_created_at;
                $estimateItem->updated_at = $row->ei_updated_at;

                $estimates[$estimateId]->items[] = $estimateItem;
            }

            $estimate->getTotal();

        }

        return $estimates;
    }

}
