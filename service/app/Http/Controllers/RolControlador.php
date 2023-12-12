<?php

namespace App\Http\Controllers;

use App\Models\Rol;
class RolControlador extends Controller
{
    public static function getIdRol($rol) { 
        $idRol = Rol::where('nombre', $rol)->first()->id;
        if (!$rol) { 
            return null;
        }else {
            return $idRol;
        }
    }

    public static function getNombreRol($idRol) {
        $rol = Rol::where('id', $idRol)->first();
        return $rol->nombre;
    }
}
