<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Cars::with('brand');
        if ($request->has('brand') && $request->brand != '') {
            $brandIds = explode(',', $request->brand);
            $query->whereIn('brand_id', $brandIds);
        }
        $cars = $query->paginate(12);
        $cars->appends(['brand' => $request->brand]);
        return response()->json($cars);
    }

    public function search($query)
    {
        $cars = Cars::with('brand')->where('model', 'LIKE', "%{$query}%")->paginate(12);
        return response()->json($cars, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $car = Cars::with('Brand')->where('id', $id)->get();
        return response()->json($car, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cars $cars)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cars $cars)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cars $cars)
    {
        //
    }
}
