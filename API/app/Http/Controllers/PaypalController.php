<?php

namespace App\Http\Controllers;

use App\Mail\InvoiceMail;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    public function createOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $carId = $request->input("carId");
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
                    Orders::create([
                        "status" => $response["status"],
                        "customer_email" => "uncomplete@gmail.com",
                        "product" => $carId,
                        "paypal_transaction_id" => $response["id"]
                    ]);
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

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            Orders::where('paypal_transaction_id', $response['id'])->update([
                'status' => $response['status'],
                'customer_email' => $response['payment_source']['paypal']['email_address'],
            ]);
            $order = Orders::with('carDetails.brand', 'downloadLink')->where('paypal_transaction_id', $response['id'])->first();
            Mail::to("clashofclans1112003@gmail.com")->send(new InvoiceMail($order));
            return response()->json(['message' => $response, "order" => $order], 200);
        } else {
            Orders::where('paypal_transaction_id', $response['id'])->update([
                'status' => $response['status'],
                'customer_email' => $response['payment_source']['paypal']['email_address'],
            ]);
            return response()->json(['error' => 'Transaction not completed'], 500);
        }
    }
}
