<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    public function getAll(){
        $debts = Debt::with('customer')->get();
        // dd($debts);
        return response()->json($debts, 200);
    }
}
