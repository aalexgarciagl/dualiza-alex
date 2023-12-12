<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estado_entrega;
class EstadoEntregaControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public static function getIdEstadoEntrega($nombreEstado) {
        $idEstado = Estado_entrega::where('nombre', $nombreEstado)->value('id');
        if (is_null($idEstado)){ 
            return null;
        } else {
            return $idEstado;
        }
    }

    /**
     * @author Javier Morales
     */

    public static function getEstados() {
        $estados = Estado_entrega::all();
        return response()->json(['success' => true, 'estados' => $estados], 200);
    }

    /**
     * @author Javier Morales
     */
    public static function getNombreEstado($id) {
        $estado = Estado_entrega::find($id);
        if (is_null($estado)) {
            return null;
        }else {
            return $estado;
        }
    }
}
