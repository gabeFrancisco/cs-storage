<?php

namespace App\Http\Controllers;

use App\Models\CashRegister;
use Illuminate\Http\Request;

class CashRegisterController extends Controller
{
    public function getAll(){
        $registers = CashRegister::all();
        return response()->json($registers, 200);
    }

    public function post(){

    }
}
