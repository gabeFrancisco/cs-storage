<?php

namespace Tests\Unit;

use App\Models\Customer;
use App\Enums\ProductType;
use App\Models\Estimate;
use App\Models\EstimateItem;
use App\Repository\EstimateRepository;
use PHPUnit\Framework\TestCase;

class EstimateTest extends TestCase
{
      public function testEstimateCanBeInsertedToDb(): void
    {
        //TODO
        $service = app(EstimateRepository::class);

        $estimateItem = new EstimateItem();
        $estimateItem->name = "Some name";
        $estimateItem->description = "Some test description";
        $estimateItem->quantity = 2;
        $estimateItem->price = 12.0;
        $estimateItem->productType = ProductType::Product->value;

        $customer = new Customer();
        $customer->name = "Some test customer";
        $customer->phone = "33333333";

        $estimate = new Estimate();
        $estimate->title = "Test case";
        $estimate->items = [
          $estimateItem
        ];
        $estimate->observations = "Some test observations";
        $estimate->customer = $customer;

        $service->createEstimate($estimate);



        $this->assertTrue(true);
    }
}
