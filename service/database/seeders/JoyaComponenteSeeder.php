<?php

namespace Database\Seeders;

use App\Models\Joya_componente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Componente;
use App\Models\Joya;


class JoyaComponenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $componentes = Componente::all();
        $joyas = Joya::first();
        
        //Collar de Gandalf
        Joya_componente::create(['id_componente' => $componentes[7]->id,  'id_joya' => 1, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[23]->id, 'id_joya' => 1, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[22]->id, 'id_joya' => 1, 'cantidad' => rand(1,3)]);
        
        //Pulsera de Jedi Brillante
        Joya_componente::create(['id_componente' => $componentes[17]->id, 'id_joya' => 2, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[29]->id, 'id_joya' => 2, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[11]->id, 'id_joya' => 2, 'cantidad' => rand(1,3)]);

        //Anillo Sith Oscuro
        Joya_componente::create(['id_componente' => $componentes[16]->id, 'id_joya' => 3, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[26]->id, 'id_joya' => 3, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[28]->id, 'id_joya' => 3, 'cantidad' => rand(1,3)]);

        //Pendientes de la Fuerza Estelar
        Joya_componente::create(['id_componente' => $componentes[3]->id, 'id_joya' => 4,  'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[12]->id, 'id_joya' => 4, 'cantidad' => rand(1,3)]);
        Joya_componente::create(['id_componente' => $componentes[25]->id, 'id_joya' => 4, 'cantidad' => rand(1,3)]);
    }
}
