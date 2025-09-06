<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Exception;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);

        $token = $user->createToken('access-token')->plainTextToken;

        return response()->json([
            "message" => "User created with success!",
            "user" => $user,
            "token" => $token
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => "Invalid credentials!"], 401);
            }

            $user = Auth::user();
            $token = $user->createToken("access_token")->plainTextToken;

            return response()->json([
                "user" => $user,
            ], 200)->cookie('access_token', $token, 262800);

        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
