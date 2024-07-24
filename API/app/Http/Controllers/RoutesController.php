<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class RoutesController extends Controller
{
    public function index()
    {
        $routes = collect(Route::getRoutes())
            ->filter(function ($route) {
                return in_array('api', $route->gatherMiddleware());
            })
            ->map(function ($route) {
                return [
                    'uri' => $route->uri(),
                    'name' => $route->getName(),
                    'action' => $route->getActionName(),
                    'method' => implode('|', $route->methods()),
                ];
            });

        return view('index', compact('routes'));
    }
}
