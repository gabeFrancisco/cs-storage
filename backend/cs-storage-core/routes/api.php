<?php

use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//CashRegister
Route::get('cashregisters', [CashRegisterController::class, 'getAll']);
Route::get('cashregisters/{id}', [CashRegisterController::class, 'getById']);
Route::post("cashregisters", [CashRegisterController::class, 'post'],);
Route::put("cashregisters", [CashRegisterController::class, 'put'],);

//Debts
Route::get('debts', [DebtController::class, 'getAll']);
Route::post('debts', [DebtController::class, 'post']);
