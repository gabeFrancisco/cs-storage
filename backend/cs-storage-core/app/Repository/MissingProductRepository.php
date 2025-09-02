<?php

namespace App\Repository;

use App\Models\MissingProduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MissingProductRepository
{
    private $selectAllQuery =
        'SELECT id, name, needed_day, is_bought, customer_name,
             customer_phone, created_at, updated_at
        FROM missing_products
        ORDER BY is_bought, created_at desc';

    public function getAllMissingProducts()
    {
        $dbMissingProducts = DB::select($this->selectAllQuery);
        return $dbMissingProducts;
    }

    public function getMissingProduct($id)
    {
        $dbMissingProduct = DB::selectOne(
            $this->selectAllQuery . ' WHERE id = ?',
            [$id]
        );

        return $dbMissingProduct;
    }

    public function createMissingProduct(MissingProduct $missingProduct)
    {
        $dbMissingProduct = DB::selectOne(
            'INSERT INTO missing_products(name, needed_day, is_bought,
                        customer_name, customer_phone, created_at)
                    VALUES (?,?,0,?,?,?) returning *',
            [
                $missingProduct->name,
                $missingProduct->needed_day,
                $missingProduct->customer_name,
                $missingProduct->customer_phone,
                Carbon::now()
            ]
        );

        return $dbMissingProduct;
    }

    public function setBoughtState($id, bool $state)
    {
        $dbMissingProduct = DB::selectOne(
            'UPDATE missing_products
                    SET is_bought = ? where id = ? returning *',
            [
                $state,
                $id
            ]
        );

        return $dbMissingProduct;
    }

    public function updateMissingProduct(MissingProduct $missingProduct)
    {
        $dbMissingProduct = DB::select(
            'UPDATE missing_products
                    SET name = ?, needed_day = ?, is_bought = ?,
                        customer_name = ?, customer_phone = ?, updated_at = ?
                    WHERE id = ? returning *
            ',
            [
                $missingProduct->name,
                $missingProduct->needed_day,
                $missingProduct->is_bought,
                $missingProduct->customer_name,
                $missingProduct->customer_phone,
                Carbon::now()
            ]
        );

        return $dbMissingProduct;
    }

    public function deleteMissingProduct($id)
    {
        DB::selectOne(
            'DELETE from missing_products WHERE id = ?',
            [$id]
        );
    }

    public function deleteBoughtProducts(){
        DB::select(
            'DELETE from missing_products WHERE is_bought'
        );
    }
}
