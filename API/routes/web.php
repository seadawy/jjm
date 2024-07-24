<?php

use App\Http\Controllers\RoutesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RoutesController::class, 'index']);
