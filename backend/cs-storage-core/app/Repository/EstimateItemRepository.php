<?php

namespace App\Repository;

use App\Models\EstimateItem;
use Carbon\Carbon;
use DB;
use Exception;

class EstimateItemRepository
{
    public function createEstimateItem(EstimateItem $item)
    {
        DB::beginTransaction();

        try {

            $dbItem = DB::selectOne(
                'INSERT INTO estimate_items (name, description, quantity,
                    price, product_type, total, estimate_id, created_at)
                    VALUES (?,?,?,?,?,?,?,?) RETURNING *',
                    [
                        $item->name,
                        $item->description,
                        $item->quantity,
                        $item->price,
                        $item->productType->value,
                        $item->getTotal(),
                        1,
                        Carbon::now()
                    ]);

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $dbItem;
    }
}
