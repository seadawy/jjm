<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    public function createOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        $price = $request->input('price');
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => "http://localhost:3000/admin",
                "cancel_url" => "http://localhost:3000/admin",
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => "$price"
                    ]
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return response()->json([
                        'id' => $response['id'],
                        'approve_url' => $links['href']
                    ], 200);
                }
            }
            return response()->json(['error' => 'Approval link not found'], 500);
        } else {
            return response()->json(['error' => 'Order creation failed'], 500);
        }
    }

    public function captureOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);
        return response()->json($response, 200);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {

            return response()->json(['message' => 'Transaction completed successfully'], 200);
        } else {
            return response()->json(['error' => 'Transaction not completed'], 500);
        }
    }
}
