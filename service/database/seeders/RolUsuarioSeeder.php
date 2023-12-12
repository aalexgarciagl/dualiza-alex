<?php

namespace Database\Seeders;

use App\Models\Rol_usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Http\Controllers\RolControlador;


class RolUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $idRolAdmin = RolControlador::getIdRol('admin');
        $idRolColaborador = RolControlador::getIdRol('colaborador');
        $idRolDiseñador = RolControlador::getIdRol('diseñador');
        $idRolClasificador = RolControlador::getIdRol('clasificador');

        $idUsuarioRoot = User::where('email', '=', 'root@gmail.com')->first();
        Rol_usuario::create(['id_usuario' => $idUsuarioRoot->id, 'id_rol' => $idRolAdmin]);
        Rol_usuario::create(['id_usuario' => $idUsuarioRoot->id, 'id_rol' => $idRolColaborador]);
        Rol_usuario::create(['id_usuario' => $idUsuarioRoot->id, 'id_rol' => $idRolDiseñador]);
        Rol_usuario::create(['id_usuario' => $idUsuarioRoot->id, 'id_rol' => $idRolClasificador]);

        $idUsuarioColaborador = User::where('email', '=', 'colaborador@gmail.com')->first();
        Rol_usuario::create(['id_usuario' => $idUsuarioColaborador->id, 'id_rol' => $idRolColaborador]);

        $idUsuarioDiseñador = User::where('email', '=', 'diseñador@gmail.com')->first();
        Rol_usuario::create(['id_usuario' => $idUsuarioDiseñador->id, 'id_rol' => $idRolDiseñador]);

        $idUsuarioClasificador = User::where('email', '=', 'clasificador@gmail.com')->first();
        Rol_usuario::create(['id_usuario' => $idUsuarioClasificador->id, 'id_rol' => $idRolClasificador]);

        $idUsuarioAdmin = User::where('email', '=', 'administrador@gmail.com')->first();
        Rol_usuario::create(['id_usuario' => $idUsuarioAdmin->id, 'id_rol' => $idRolAdmin]);
    }
}
