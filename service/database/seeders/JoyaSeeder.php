<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Http\Controllers\RolControlador;
use App\Models\Rol_usuario;
use App\Models\User;
use App\Models\Joya;

class JoyaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idRolDiseñador = RolControlador::getIdRol('diseñador');
        $usuarioDiseñador = Rol_usuario::where('id_rol', $idRolDiseñador)->first();
        
        Joya::create(['id_usuario' => $usuarioDiseñador->id,'nombre' => 'Collar de Gandalf', 'foto' => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg']);
        Joya::create(['id_usuario' => $usuarioDiseñador->id,'nombre' => 'Pulsera Jedi Brillante', 'foto' => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg']);
        Joya::create(['id_usuario' => $usuarioDiseñador->id,'nombre' => 'Anillo Sith Oscuro', 'foto' => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg']);
        Joya::create(['id_usuario' => $usuarioDiseñador->id,'nombre' => 'Pendientes de la Fuerza Estelar', 'foto' => 'https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg']);
    }
}
