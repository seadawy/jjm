<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Orders::with("carDetails.brand")->orderBy("id", "desc")->get();
        return response()->json($orders, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($order)
    {
        $orderDetails = Orders::with("carDetails.brand")->where("paypal_transaction_id", $order)->first();
        return response()->json($orderDetails, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Orders $orders)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orders $orders)
    {
        //
    }
}
