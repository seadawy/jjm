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
        // Validate the request
        $request->validate([
            'model' => 'required|string|max:255',
            'price' => 'required|numeric',
            'brand' => 'required|exists:brands,id',
            'files.*' => 'required|file|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        // Array to store image paths
        $imagePaths = [];

        // Handle file uploads
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('car_photos', 'public');
                $imagePaths[] = $path;
            }
        }

        // Create a new Car entry
        $car = new Cars();
        $car->model = $request->input('model');
        $car->price = $request->input('price');
        $car->brand_id = $request->input('brand');
        $car->imgArray = json_encode($imagePaths);
        $car->save();

        return response()->json([
            'message' => 'Car added successfully!',
            'car' => $car
        ], 201);
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
