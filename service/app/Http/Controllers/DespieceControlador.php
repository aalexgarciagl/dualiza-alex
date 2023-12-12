<?php

namespace App\Http\Controllers;

use App\Models\Despiece;
use App\Models\Lote;
use App\Models\Componente;


class DespieceControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public static function crearDespiece($id_lote, $id_componente, $cantidad, $descripcion) { 
        try {
            $despiece = Despiece::create([
                'id_lote' => $id_lote,
                'id_componente' => $id_componente,
                'cantidad' => $cantidad,
                'descripcion' => $descripcion
            ]);
            return $despiece;
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * @author Javier Morales
     */
    public function componentesLote($id) {
        $lote = Lote::find($id);
        if ($lote === null) { 
            return response()->json(['success' => false, 'message' => 'Lote no encontrado']);
        }
        $despiece = Despiece::where('id_lote', $id)->get();

        $componentes = [];
        foreach ($despiece as $componente) {
            $nombreComponente = Componente::where('id',$componente->id_componente)->first();
            $c = [
                'componente' => $nombreComponente->nombre,
                'cantidad' => $componente->cantidad,
                'descripcion' => $componente->descripcion
            ];
            array_push($componentes, $c);
        };
        return response()->json([$componentes], 200);
    }
}   
