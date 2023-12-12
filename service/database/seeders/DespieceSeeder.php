<?php

namespace Database\Seeders;

use App\Models\Componente;
use App\Models\Despiece;
use App\Models\Estado_entrega;
use App\Models\Lote;
use Illuminate\Database\Seeder;

class DespieceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idClasidicado = Estado_entrega::where('nombre', 'clasificado')->first();
        $lote = Lote::where('estado', $idClasidicado->id)->first();
        $componentes = Componente::all();
        foreach ($componentes as $componente) {
            Despiece::create(['id_lote' => $lote->id, 'id_componente' => $componente->id, 'descripcion' => 'defualt', 'cantidad' => 4]);
        }
    }
}
