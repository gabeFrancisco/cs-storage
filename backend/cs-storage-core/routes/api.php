<?php

use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\MissingProductController;
use App\Http\Controllers\ServiceOrderController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CookieTokenMiddleware;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//User
Route::post('users/register', [UserController::class, 'register']);
Route::post('users/login', [UserController::class, 'login']);

Route::middleware([CookieTokenMiddleware::class])->group(function () {
    Route::get('users/getuser', [UserController::class, 'getActualUser']);
    //CashRegister
    Route::get('cashregisters', [CashRegisterController::class, 'getAll']);
    Route::get('cashregisters/monthtotal', [CashRegisterController::class, 'getDayAndMonthTotal']);
    Route::get('cashregisters/{id}', [CashRegisterController::class, 'getById']);
    Route::post("cashregisters", [CashRegisterController::class, 'post'], );
    Route::put("cashregisters", [CashRegisterController::class, 'put'], );
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
    Route::delete('missingproducts', [MissingProductController::class, 'delete']);
    Route::delete('missingproducts/deleteallbought', [MissingProductController::class, 'deleteAllBought']);

    //ServiceOrders
    Route::get('serviceorders', [ServiceOrderController::class, 'getAll']);
    Route::get('serviceorders/{id}', [ServiceOrderController::class, 'getById']);
    Route::post('serviceorders', [ServiceOrderController::class, 'post']);
    Route::put('serviceorders', [ServiceOrderController::class, 'put']);
    Route::delete('serviceorders/{id}', [ServiceOrderController::class, 'delete']);

});

