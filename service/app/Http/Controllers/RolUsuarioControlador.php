<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\Rol_usuario;
class RolUsuarioControlador extends Controller
{
    
/**
 * The function checks if a user has a specific role.
 * 
 * @param int $idUsuario The id of the user for whom you want to check if they have a specific role.
 * @param int $idRol The idRol parameter represents the ID of a specific role.
 * 
 * @return array value indicating whether a user has a specific role.
 */
    public static function usuarioTieneRol($idUsuario, $idRol) {
        $roles = Rol_usuario::where('id_usuario', $idUsuario)->where('id_rol', $idRol)->exists();
        return $roles;
    }

    public static function numeroRoles($idUsuario) {
        $nRoles = Rol_usuario::where('id_usuario', $idUsuario)->count();
        return $nRoles;
    }

    public static function getRoles($idUsuario) {
        $nombreRoles = [];
        $idRoles = DB::table('rol_usuarios')->where('id_usuario', $idUsuario)->get('id_rol');
        foreach($idRoles as $id){
            array_push($nombreRoles, RolControlador::getNombreRol($id->id_rol));
        }
        return $nombreRoles;
    }

    public static function crearRolUsuario($idUsuario, $idRol) {
        try {
            $rol_usuario = Rol_usuario::create(['id_usuario' => $idUsuario, 'id_rol' => $idRol]);
            return $rol_usuario;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
