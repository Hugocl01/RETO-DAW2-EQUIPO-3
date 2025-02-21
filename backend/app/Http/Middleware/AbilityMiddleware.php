<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AbilityMiddleware
{
    public function handle(Request $request, Closure $next, $ability)
    {
        if (!$request->user() || !$request->user()->tokenCan($ability)) {
            return response()->json(['message' => 'No tienes permisos para acceder a esta ruta'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
