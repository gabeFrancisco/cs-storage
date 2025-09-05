<?php

namespace App\Http\Controllers;

use App\Http\Requests\MissingProductRequest;
use App\Services\MissingProductService;
use Illuminate\Http\Request;

class MissingProductController extends Controller
{
    private MissingProductService $missingProductService;
    public function __construct(MissingProductService $missingProductService)
    {
        $this->missingProductService = $missingProductService;
    }

    public function getAll()
    {
        $missingProducts = $this->missingProductService->getAll();
        return response()->json($missingProducts);
    }

    public function getById($id)
    {
        $missingProduct = $this->missingProductService->getById($id);
        return response()->json($missingProduct, 200);
    }

    public function post(MissingProductRequest $request)
    {
        $missingProduct = $this->missingProductService->create($request);
        return response()->json($missingProduct);
    }

    public function post_bought_state(Request $request)
    {
        $id = $request->input('id');
        $state = $request->input('state');

        $missingProduct = $this->missingProductService->setBoughtState($id, $state);

        return $missingProduct;
    }

    public function delete()
    {
        $id = request()->query('id');
        $this->missingProductService->remove($id);
        return response()->json([
            "message" => 'Deleted with success!'
        ], 200);
    }

    public function deleteAllBought(){
        $this->missingProductService->removeAllBought();
        return response()->json([
            "message" => 'All bought products deleted with success!'
        ], 200);
    }
}
