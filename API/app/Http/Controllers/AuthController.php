<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $candidate = $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);

            if (Auth::attempt($candidate)) {
                $token = $request->user()->createToken($candidate['email'])->plainTextToken;
                return response()->json(['token' => $token, 'user' => $request->user()], 200);
            } else {
                return response()->json(['error' => 'user inforamtion not valid'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
