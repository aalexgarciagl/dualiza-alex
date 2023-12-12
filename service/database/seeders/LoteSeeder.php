<?php

namespace Database\Seeders;

use App\Models\Estado_entrega;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Lote;


class LoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estadoEntregado = Estado_entrega::where('nombre', 'entregado')->first();
        $estadoCancelado = Estado_entrega::where('nombre', 'cancelado')->first();
        $estadoClasificado = Estado_entrega::where('nombre', 'clasificado')->first();
        $estadoEnviado = Estado_entrega::where('nombre', 'enviado')->first();

        $usuarioColaborador = User::where('email', 'colaborador@gmail.com')->first();
        Lote::create(['id_usuario' => $usuarioColaborador->id, 'latitud' => '-500', 'longitud' => '-500','descripcion' => 'Estado entregado','estado' => $estadoEntregado->id]);
        Lote::create(['id_usuario' => $usuarioColaborador->id, 'latitud' => '-500', 'longitud' => '-500', 'descripcion' => 'Estado cancelado','estado' => $estadoCancelado->id]);
        Lote::create(['id_usuario' => $usuarioColaborador->id, 'latitud' => '-500', 'longitud' => '-500', 'descripcion' => 'Estado clasificado','estado' => $estadoClasificado->id]);
        Lote::create(['id_usuario' => $usuarioColaborador->id, 'latitud' => '-500', 'longitud' => '-500', 'descripcion' => 'Estado enviado','estado' => $estadoEnviado->id]);


    }
}
