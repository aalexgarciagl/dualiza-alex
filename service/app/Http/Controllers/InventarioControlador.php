<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Inventario;

class InventarioControlador extends Controller
{

    /**
     * @author Javier Morales
     */
    public function insertarCompInventario(Request $request) {
        $ArrayComponentesInsertados = [];
        $ArrayComponentesNoInsertados = [];
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'componentes' => 'required|array',
            'componentes.*.nombre' => 'required|string',
            'componentes.*.cantidad' => 'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $componentes = $input['componentes'];
        foreach ($componentes as $componente) {
            $id_componente = ComponenteControlador::getIdComponente($componente['nombre']);
            if (is_null($id_componente)) {
                array_push($ArrayComponentesNoInsertados, $componente);
            }else {
                $inv = Inventario::where('id_componente', $id_componente)->first();
                if (is_null($inv)) {
                    Inventario::create(['id_componente' => $id_componente, 'cantidad' => $componente['cantidad']]);
                    array_push($ArrayComponentesInsertados, $componente);
                }else {
                    try {
                        $inv->cantidad += $componente['cantidad'];
                        $inv->save();
                        array_push($ArrayComponentesInsertados, $componente);
                    } catch (\Throwable $e) {
                        array_push($ArrayComponentesNoInsertados, $componente);
                    }
                }
            }
        }
        return response()->json(['success' => true, 'message' => 'Componentes insertados', 'Componentes insertados' => $ArrayComponentesInsertados, 'Componentes no insertados' => $ArrayComponentesNoInsertados], 200);
    }

    /**
     * @author Javier Morales
     */

    public static function existeComponente($id) {
        $inventario = Inventario::where('id_componente', $id)->first();
        if ($inventario) {
            return $inventario;
        }else {
            return null;
        }
    }

    /**
     * @author Alejandro Garcia 
     */
    function obtenerInventarioComponentes()
    {
        $resultado = DB::table('inventario')
    ->join('componentes', 'inventario.id_componente', '=', 'componentes.id')
    ->select('componentes.nombre AS nombre_componente', 'inventario.cantidad')
    ->get();

        return response()->json(["success" => true, "componentes" =>$resultado]);
    }

    /**
     * @author Alejandro Garcia 
     */
    function actualizarCantidadComponente(Request $request){
        try {
            $datosComponente = DB::table('inventario')
                ->join('componentes', 'inventario.id_componente', '=', 'componentes.id')
                ->where('componentes.nombre', $request->nombre)
                ->select('componentes.id AS id_componente', 'componentes.nombre AS nombre_componente', 'inventario.cantidad')
                ->first();
    
            if (!$datosComponente) {
                return response()->json(['success' => false, 'message' => 'Componente no encontrado'], 404);
            }
    
            $idComponente = $datosComponente->id_componente;
    
            DB::table('inventario')
            ->where('id_componente', $idComponente)
            ->update(['cantidad' => $request->cantidad]);
    
            return response()->json(['success' => true, 'message' => 'Cantidad actualizada'], 200);
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'message' => 'Fallo al actualizar: '], 500);
        }
    }
    
}
