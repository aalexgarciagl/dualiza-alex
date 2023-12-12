<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\DespieceControlador;
use App\Http\Controllers\InventarioControlador;
use App\Models\Lote;
use App\Models\Inventario;


class ClasificadorControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public function clasificarComponente(Request $request, $id_lote)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'componente' => 'required|string',
            'cantidad' => 'required|integer|min:1',
            'descripcion' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $lote = Lote::find($id_lote);

        if (is_null($lote)) {
            return response()->json(['success' => false, 'message' => 'Lote no encontrado']);
        }

        $estado = EstadoEntregaControlador::getNombreEstado($lote->estado);

        if ($estado->nombre == 'entregado') {
            $idComponente = ComponenteControlador::getIdComponente($input['componente']);
            if (is_null($idComponente)) {
                return response()->json(['success' => false, 'message' => 'Componente no encontrado']);
            }

            $despiece = DespieceControlador::crearDespiece($id_lote, $idComponente, $input['cantidad'], $input['descripcion']);
            if (is_null($despiece)) {
                return response()->json(['success' => false, 'message' => 'Error al clasificar']);
            }

            $inventario = InventarioControlador::existeComponente($idComponente);

            if (is_null($inventario)) {
                try {
                    $inventario = Inventario::create([
                        'id_componente' => $idComponente,
                        'cantidad' => $input['cantidad']
                    ]);
                } catch (\Throwable $th) {
                    return response()->json(['success' => false, 'message' => 'Error al crear inventario'], 404);
                }
            } else {
                try {
                    $inventario->cantidad += $input['cantidad'];
                    $inventario->save();
                } catch (\Throwable $th) {
                    return response()->json(['success' => false, 'message' => 'error al añadir compontente a inventario'], 404);
                }
            }
            return response()->json(['success' => true, 'despiece' => $despiece, 'inventario' => $inventario], 200);
        }else {
            return response()->json(['success' => false, 'message' => 'Este lote no esta listo para ser clasificado'],200);
        }
    }
}
