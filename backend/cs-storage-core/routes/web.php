<?php

use App\Http\Controllers\CashRegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/cashregisters', [CashRegisterController::class, 'getAll']);
