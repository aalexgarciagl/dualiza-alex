<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Componente;
use App\Models\Inventario;



class InventarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $componentes = Componente::all();
        foreach ($componentes as $componente) {
            Inventario::create(['id_componente' => $componente->id, 'cantidad' => rand(1,90)]);
        }
    }
}
