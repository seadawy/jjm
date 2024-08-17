<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaypalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "auth:sanctum"], function () {
    // Auth
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Car Contolling
    Route::post('cars', [CarsController::class, 'store']);
    Route::put('cars/{id}', [CarsController::class, 'update']);
    Route::delete('cars/{id}', [CarsController::class, 'destroy']);

    // Brand Controlling
    Route::post('brands', [BrandController::class, 'store']);
    Route::put('brands/{id}', [BrandController::class, 'update']);
    Route::delete('brands/{id}', [BrandController::class, 'destroy']);

    // Orders Controlling
    Route::get('orders', [OrdersController::class, 'index']);
});


Route::post('/login', [AuthController::class, 'login']);

// Car Public
Route::get('cars', [CarsController::class, 'index']);
Route::get('cars/{id}', [CarsController::class, 'show']);
Route::get('cars/Search/{query}', [CarsController::class, 'search']);

// Brand Public
Route::get('brands', [BrandController::class, 'index']);
Route::get('brands/{id}', [BrandController::class, 'show']);

// Orders
Route::get('orders/{id}', [OrdersController::class, 'show']);
Route::post('/create-paypal-order', [PaypalController::class, 'createOrder']);
Route::post('/capture-paypal-order', [PaypalController::class, 'captureOrder']);
Route::post('/confirm-payment-source', [PaypalController::class, 'confirmPayment']);
