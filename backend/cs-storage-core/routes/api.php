<?php

use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('cashregisters', [CashRegisterController::class, 'getAll']);
Route::get('debts', [DebtController::class, 'getAll']);
Route::post("cashregisters", [CashRegisterController::class, 'post'],);
