<?php

namespace App\Repository;

use App\Models\MissingProduct;
use App\Utils\ClassHelper;
use App\Utils\DateHelper;
use Illuminate\Support\Facades\DB;

class MissingProductRepository
{
    private $selectAllQuery =
        'select id, name, needed_day, is_bought, customer_name,
         customer_phone, created_at, updated_at from missing_products
         order by is_bought';

    public function getAllMissingProducts()
    {
        $dbMissingProducts = DB::select($this->selectAllQuery);
        return $dbMissingProducts;
    }

    public function createMissingProduct(MissingProduct $missingProduct)
    {
        $dbMissingProduct = DB::selectOne(
            'insert into missing_products(name, needed_day, is_bought,
            customer_name, customer_phone, created_at) values
            (?,?,0,?,?,?) returning *',
            [
                $missingProduct->name,
                $missingProduct->needed_day,
                $missingProduct->customer_name,
                $missingProduct->customer_phone,
                DateHelper::now()
            ]
        );

        return $dbMissingProduct;
    }

    public function setBoughtState($id, bool $state)
    {
        $dbMissingProduct = DB::selectOne(
            'update missing_products
                    set is_bought = ? where id = ? returning *',
            [
                $state,
                $id
            ]
        );

        return $dbMissingProduct;
    }

    public function updateMissingProduct(MissingProduct $missingProduct){
        $dbMissingProduct = DB::select(
            'update missing_products
                    set name = ?, needed_day = ?, is_bought = ?,
                    customer_name = ?, customer_phone = ?, updated_at = ?
                    where id = ? returning *
            ',
            [
                $missingProduct->name,
                $missingProduct->needed_day,
                $missingProduct->is_bought,
                $missingProduct->customer_name,
                $missingProduct->customer_phone,
                DateHelper::now()
            ]
        );

        return $dbMissingProduct;
    }
}
