<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\PaypalController;
use Illuminate\Support\Facades\Route;

Route::apiResource('Brands', BrandController::class);

Route::apiResource('Cars', CarsController::class);
Route::get('Cars/Search/{query}', [CarsController::class, 'search']);


Route::post('/create-paypal-order', [PaypalController::class, 'createOrder']);
Route::post('/capture-paypal-order', [PaypalController::class, 'captureOrder']);
Route::post('/confirm-payment-source', [PaypalController::class, 'confirmPayment']);
