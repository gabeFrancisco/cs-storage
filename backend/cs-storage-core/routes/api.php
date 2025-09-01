<?php

use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\MissingProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//CashRegister
Route::get('cashregisters', [CashRegisterController::class, 'getAll']);
Route::get('cashregisters/monthtotal', [CashRegisterController::class, 'getDayAndMonthTotal']);
Route::get('cashregisters/{id}', [CashRegisterController::class, 'getById']);
Route::post("cashregisters", [CashRegisterController::class, 'post'],);
Route::put("cashregisters", [CashRegisterController::class, 'put'],);
Route::delete("cashregisters/{id}", [CashRegisterController::class, 'delete']);

//Debts
Route::get('debts', [DebtController::class, 'getAll']);
Route::get('debts/monthtotal', [DebtController::class, 'getDayAndMonthTotal']);
Route::get('debts/{id}', [DebtController::class, 'getById']);
Route::post('debts', [DebtController::class, 'post']);
Route::put('debts', [DebtController::class, 'put']);
Route::delete('debts/{id}', [DebtController::class, 'delete']);

//MissingProducts
Route::get('missingproducts', [MissingProductController::class, 'getAll']);
Route::post('missingproducts', [MissingProductController::class, 'post']);
Route::post('missingproducts/setstate', [MissingProductController::class, 'post_bought_state']);
Route::get('missingproducts/{id}', [MissingProductController::class, 'getById']);
Route::delete('missingproducts/{id}', [MissingProductController::class, 'remove']);
Route::delete('missingProducts/deleteallbought', [MissingProductController::class, 'removeAllBought']);
