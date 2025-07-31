<?php

use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/cashregisters', [CashRegisterController::class, 'getAll']);
Route::get('api/debts', [DebtController::class, 'getAll']);
