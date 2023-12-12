<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class midAdminClasificador
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        
        if (Auth::user()) {            
            if (Auth::user()->tokenCan('admin') || Auth::user()->tokenCan('clasificador')){
                return $next($request);
            }
        }
        
        return response()->json(['error' => 'Acceso no autorizado.'], 401);
    }
}
