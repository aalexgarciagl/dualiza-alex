<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Estado_entrega;

class EstadoEntregaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Estado_entrega::factory()->create(['id' => 1, 'nombre' => 'entregado']);
        Estado_entrega::factory()->create(['id' => 2, 'nombre' => 'cancelado']);
        Estado_entrega::factory()->create(['id' => 3, 'nombre' => 'clasificado']);
        Estado_entrega::factory()->create(['id' => 4, 'nombre' => 'enviado']);
    }
}
