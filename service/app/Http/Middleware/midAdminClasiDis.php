<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Symfony\Component\HttpFoundation\Response;

class midAdminClasiDis
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user()) {            
            if (Auth::user()->tokenCan('admin') || Auth::user()->tokenCan('clasificador')|| Auth::user()->tokenCan('diseñador')){
                return $next($request);
            }
        }
        
        return response()->json(['error' => 'Acceso no autorizado.'], 401);
    }
}
