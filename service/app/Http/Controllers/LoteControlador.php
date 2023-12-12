<?php

namespace App\Http\Controllers;

use App\Models\Lote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Estado_entrega;



class LoteControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public static function crearLote($idUsuario, $latitud, $longitud, $idEstado, $descripcion) {
        try {

            $lote = Lote::create([
                'id_usuario' => $idUsuario,
                'latitud' => $latitud,
                'longitud' => $longitud,
                'estado' => $idEstado,
                'descripcion' => $descripcion
            ]);
            return $lote;
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * @author Javier Morales
     */
    public function cambiarEstado(Request $request, $id) { 
        $input = $request->all();
        $validator = Validator::make($input, [
            'estado' => 'required|string|in:cancelado,entregado,clasificado',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $lote = Lote::where('id', $id)->first();
        if(is_null($lote)) {
            return response()->json(['success' => false, 'message' => 'Lote no encontrado'],404);
        }
        $id_estado = Estado_entrega::where('nombre', $input['estado'])->first();
        if (is_null($id_estado)) {
            return response()->json(['success'=> false,'message'=> 'estado no disponible'],404);
        }

        try {
            $lote->estado = $id_estado->id;
            $lote->save();
            return response()->json(['success'=> true,'message'=> 'Lote cambiado correctamente', 'estado' => $input['estado'], 'Lote' => $lote],200);
        } catch (\Throwable $th) {
            return response()->json(['success'=> false,'message'=> 'Error al cambiar el estado del lote'],500);
        }
    }

    /**
     * @author Javier Morales
     */
    public function cambiarEstadoColaborador(Request $request, $id_lote, $id_usuario) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'estado' => 'required|string|in:cancelado',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $id_estado = Estado_entrega::where('nombre', $input['estado'])->first();
        if (is_null($id_estado)) {
            return response()->json(['success'=> false,'message'=> 'estado no disponible'],404);
        }

        $idUsuario = UsuarioControlador::existeUsuario($id_usuario);
        if (is_null($idUsuario)) { 
            return response()->json(['success'=> false,'message'=> 'Usuario no encontrado'],404);
        }

        $lote = Lote::where('id', $id_lote)->where('id_usuario', $id_usuario)->first();
        if(is_null($lote)) {
            return response()->json(['success' => false, 'message' => 'Lote no encontrado'],404);
        }
        $lote->estado = $input['estado'];
        try {
            $lote->estado = $id_estado->id;
            $lote->save();
            return response()->json(['success'=> true,'message'=> 'Lote cambiado correctamente', 'estado' => $input['estado'], 'Lote' => $lote],200);
        } catch (\Throwable $th) {
            return response()->json(['success'=> false,'message'=> 'Error al cambiar el estado del lote'],500);
        }
    }

    /**
     * @author Javier Morales
     */
    public static function lotesColaborador($id) {
        $lotes = Lote::where('id_usuario', '=', $id)->get();
        return $lotes;
    }

    /**
     * @author Javier Morales
     */
    public function lotesEntregados() {
        $idEstadoEntregado = EstadoEntregaControlador::getIdEstadoEntrega('entregado');

        $lotes = Lote::where('estado','=', $idEstadoEntregado)->get();

        $lotesDevolver = [];

        foreach ($lotes as $lote) {
            $emailUsuario = User::find($lote->id_usuario);
            $l = [
                'id' => $lote->id,
                'usuario' => $emailUsuario->email,
                'fecha' => $lote->created_at,
            ];
            array_push($lotesDevolver, $l);
        }
        return response()->json(['success'=> true,'lotes'=> $lotesDevolver],200);
    }
    public function show() {
        $lotes  = Lote::all();

        $jsonReturn = [];

        foreach($lotes as $lote) {
            $usuario = User::where('id','=',$lote->id_usuario)->first();
            $estado = EstadoEntregaControlador::getNombreEstado($lote->estado);
            $j = [
                'id' => $lote->id,
                'usuario' => $usuario->email,
                'latitud' => $lote->latitud,
                'longitud' => $lote->longitud,
                'estado' => $estado->nombre
            ];
            array_push($jsonReturn, $j);
        }

        return response()->json(['success'=> true,'lotes'=>$jsonReturn],200);
    }
    
}

