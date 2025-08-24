<?php

namespace App\Services;

use App\Http\Requests\MissingProductRequest;
use App\Models\Customer;
use App\Models\MissingProduct;
use App\Repository\MissingProductRepository;

class MissingProductService
{
    private MissingProductRepository $missingProductRepository;
    public function __construct(MissingProductRepository $missingProductRepository) {
        $this->missingProductRepository = $missingProductRepository;
    }
    public function getAll()
    {
        return $this->missingProductRepository->getAllMissingProducts();
    }

    public function getById($id)
    {
        return $this->missingProductRepository->getMissingProduct($id);
    }

    public function setBoughtState(int $id, bool $state){
        $product = $this->missingProductRepository->setBoughtState($id, $state);
        return $product;
    }

    public function create(MissingProductRequest $request)
    {
        $missingProduct = new MissingProduct();

        $missingProduct->name = $request->input('name');
        $missingProduct->needed_day = $request->input('needed_day');
        $missingProduct->image_url = $request->input('image_url');
        $missingProduct->customer_name = $request->input('customer_name');
        $missingProduct->customer_phone = $request->input('customer_phone');

        $dbMissingProduct = $this->missingProductRepository->createMissingProduct($missingProduct);

        return $dbMissingProduct;
    }
}
