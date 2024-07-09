<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\Downloads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

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
        $request->validate([
            'model' => 'required|string|max:255',
            'price' => 'required|numeric',
            'brand' => 'required|exists:brands,id',
            'link' => 'required|string',
            'files.*' => 'required|file|mimes:jpg,jpeg,png,webp|max:5120',
        ]);
        $imagePaths = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('car_photos', 'public');
                $imagePaths[] = $path;
            }
        }
        $car = new Cars();
        $car->model = $request->input('model');
        $car->price = $request->input('price');
        $car->brand_id = $request->input('brand');
        $car->imgArray = json_encode($imagePaths);
        $car->save();

        $download = new Downloads();
        $download->car_id = $car->id;
        $download->link = Crypt::encryptString($request->input('link'));
        $download->save();
        return response()->json([
            'message' => 'Car added successfully!',
            'link' => 'Link has been crypted successfully!',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $car = Cars::with('Brand')->where('id', $id)->first();
        if (empty($car)) {
            return response()->json(['error' => 'The car link you asked for is not available'], 500);
        }
        return response()->json($car, 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'model' => 'required|string|max:255',
                'price' => 'required|numeric',
                'brand' => 'required|exists:brands,id',
                'link' => 'required|string',
                'files.*' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:5120',
            ]);

            $car = Cars::findOrFail($id);

            $car->model = $request->input('model');
            $car->price = $request->input('price');
            $car->brand_id = $request->input('brand');

            $imagePaths = json_decode($car->imgArray, true);
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('car_photos', 'public');
                    $imagePaths[] = $path;
                }
            }
            $car->imgArray = json_encode($imagePaths);
            $car->save();

            $download = Downloads::where('car_id', $car->id)->first();
            if ($download) {
                $download->link = Crypt::encryptString($request->input('link'));
                $download->save();
            } else {
                $download = new Downloads();
                $download->car_id = $car->id;
                $download->link = Crypt::encryptString($request->input('link'));
                $download->save();
            }

            return response()->json([
                'message' => 'Car updated successfully!',
                'link' => 'Link has been crypted successfully!',
                'car' => $car
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed!',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the car!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $car = Cars::findOrFail($id);
            $imagePaths = json_decode($car->imgArray, true);
            foreach ($imagePaths as $path) {
                Storage::disk('public')->delete($path);
            }
            $download = Downloads::where('car_id', $id)->first();
            if (isset($download)) {
                $download->delete();
            }
            $car->delete();
            return response()->json([
                'message' => 'Car deleted successfully!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete the car.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
