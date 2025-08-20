<?php

use App\Models\MissingProduct;
use App\Utils\ClassHelper;

class MissingProductRepository
{
    private $selectAllQuery =
        'select id, name, needed_day, is_bought, customer_name,
         customer_phone, created_at, updated_at from missing_products';

    public function getAllMissingProducts()
    {
        $dbMissingProducts = DB::select($this->selectAllQuery);

        $missingProducts = [];

        foreach ($dbMissingProducts as $row) {
            $missingProduct = $this->parseMissingProduct($row);
            $missingProducts[] = $missingProduct;
        }

        return $missingProducts;
    }

    private function parseMissingProduct($dbMissingProduct): MissingProduct
    {
        return ClassHelper::fillFromSql($dbMissingProduct, MissingProduct::class, '');

    }
}
