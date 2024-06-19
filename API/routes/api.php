<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('Brands', BrandController::class);
Route::apiResource('Cars', CarsController::class);
