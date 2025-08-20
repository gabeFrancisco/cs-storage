<?php

namespace App\Repository;

use App\Models\MissingProduct;
use App\Utils\ClassHelper;
use Illuminate\Support\Facades\DB;

class MissingProductRepository
{
    private $selectAllQuery =
        'select id, name, needed_day, is_bought, customer_name,
         customer_phone, created_at, updated_at from missing_products
         order by is_bought';

    public function    getAllMissingProducts()
    {
        $dbMissingProducts = DB::select($this->selectAllQuery);
        return $dbMissingProducts;
    }
}
