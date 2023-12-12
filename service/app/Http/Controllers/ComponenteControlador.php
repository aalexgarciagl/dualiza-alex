<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Componente;
use Exception;
use Illuminate\Support\Facades\Validator;

class ComponenteControlador extends Controller
{
    /**
     * @author Javier Morales
     */
    public static function getIdComponente($nombre) { 
        $componente = Componente::where('nombre', $nombre)->first();
        if (!$componente) { 
            return null;
        }
        return $componente->id;
    }

    /**
     * @author Javier Morales
     */
    public static function getNombreComponente($id) {
        $componente = Componente::where('id', $id)->first();
        if (!$componente) {
            return null;
        }else {
            return $componente->nombre;
        }
    }
    /**
     * @author Javier Morales
     */
    public function insertarComponente(Request $request) {
        $input = $request->all();

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'hardware' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $componenteRepetido = Componente::where('nombre', $input['nombre'])->first();
        if (is_null($componenteRepetido)) {
            try {
                $componente = Componente::create(['nombre' => $input['nombre'], 'hardware' => $input['hardware']]);
                return response()->json(['success' => true, 'message' => 'Componente creado correctamente', 'componente_creado' => $componente], 201);
            } catch (\Throwable $th) {
                return response()->json(['success' => false, 'message' => 'Error al crear el componente'], 400);
            }
        }else {
            return response()->json(['success' => false, 'message' => 'Ya hay un componente con este nombre: '.$input['nombre']], 400);
        }
    }

    /**
     * @author Javier Morales
     * 
     */
    public function show() {
        $componentes = Componente::all();
        return response()->json(['success' => true, 'componentes' => $componentes],200);
    }


    /**
     * @author Javier Morales
     */
    public function update(Request $request, $id) {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombre' => 'string',
            // 'hardware' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $componente = Componente::find($id);
        if (is_null($componente)) {
            return response()->json(['success' => false, 'message' => 'Componente no encontrado'], 404);
        }

        try {
            $componente->nombre = $input['nombre'];
            if ($input['hardware']) {
                $componente->hardware = 0;
            }else if (!$input['hardware']){
                $componente->hardware = 1;
            }
            $componente->save();
            return response()->json(['success' => true, 'message' => 'Componente actualizado', 'componente' => $componente],200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e],400);
        }
    }  

    public function destroy($id) {
        $componente = Componente::find($id);
        if (is_null($componente)) {
            return response()->json(['success' => false, 'message' =>'Componente no encontrado'],404);
        }

        try {
            $componente->delete();
            return response()->json(['success' => true, 'message' => 'Componente eliminado'],200);
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'message' =>'Error al eliminar el componente'],400);

        }
    }
}
