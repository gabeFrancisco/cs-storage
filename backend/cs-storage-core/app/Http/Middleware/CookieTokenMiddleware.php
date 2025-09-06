<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class CookieTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');
        error_log($token);

        $tokenRecord = PersonalAccessToken::findToken($token);

        if (!$tokenRecord) {
            return response()->json(['message' => 'Invalid token!'], 401);
        }

        $request->setUserResolver(fn() => $tokenRecord->tokenable);
        $request->headers->set("Authorization", "Bearer " . $token);
        return $next($request);
    }
}
