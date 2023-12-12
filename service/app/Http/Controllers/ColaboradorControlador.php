<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Controllers\UsuarioControlador;
use App\Http\Controllers\RolControlador;
use App\Http\Controllers\DespieceControlador;


class ColaboradorControlador extends Controller
{
    public function index()
    {
        $usuariosConColaborador = User::join('rol_usuarios', 'users.id', '=', 'rol_usuarios.id_usuario')
            ->join('roles', 'rol_usuarios.id_rol', '=', 'roles.id')
            ->where('roles.nombre', '=', 'colaborador')
            ->select('users.*')
            ->get();

        return response()->json(['usuarios' => $usuariosConColaborador]);
    }

    //Funcion realizada por Javier Morales
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombre' => 'required',
            'email' => 'required|email|unique:user',
            'password' => 'required',
            'dni' => 'required|unique:user',
            'direccion' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $usuario = UsuarioControlador::crearUsuario($input['nombre'], $input['email'],  $input['password'], $input['dni'], $input['direccion']);
        if (!$usuario) {
            return response()->json(['success' => false, 'message' => 'Error al crear el usuario'], 400);
        }

        $idRolColaborador = RolControlador::getIdRol('colaborador');
        $rol_usuario = RolUsuarioControlador::crearRolUsuario($usuario->id, $idRolColaborador);

        if (!$rol_usuario) {
            return response()->json(['success' => false, 'message' => 'Error al crear el usuario'], 400);
        }
        return response()->json(['success' => true, 'data' => $usuario], 200);
    }

    //Funcion realizada por Javier Morales
    public function show($id)
    {
        $usuario = UsuarioControlador::existeUsuario($id);
        if (is_null($usuario)) {
            return response()->json(['success' => false, 'error' => 'Usuario no encontrado.'], 404);
        }

        $usuarioColaborador = User::join('rol_usuarios', 'users.id', '=', 'rol_usuarios.id_usuario')
            ->join('roles', 'rol_usuarios.id_rol', '=', 'roles.id')
            ->where('roles.nombre', '=', 'colaborador')
            ->select('users.*')
            ->get();

        return response()->json(['usuario' => $usuarioColaborador]);
    }

    //Funcion realizada por Javier Morales
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $usuario = UsuarioControlador::existeUsuario($id); 
        if (is_null($usuario)) {
            return response()->json(['success' => false, 'error' => 'Usuario no encontrado.'], 404);
        }
        
        $validator = Validator::make($input, [
            'nombre' => 'required',
            'email' => 'required|email|unique:user',
            'password' => 'required',
            'dni' => 'required|unique:user',
            'direccion' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $usuario->nombre = $input['nombre'];
            $usuario->email = $input['email'];
            $usuario->password = $input['password'];
            $usuario->dni = $input['dni'];
            $usuario->direccion = $input['direccion'];
            $usuario->save();
            return response()->json(['success' => true, 'data' => $usuario], 400);
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'message' => 'error al actualizar el usuario'], 400);
        }
    }

    //Funcion realizada por Javier Morales
    public function destroy($id)
    {
        $usuario = UsuarioControlador::existeUsuario($id); 
        if (is_null($usuario)) {
            return response()->json(['success' => false, 'error' => 'Usuario no encontrado.'], 404);
        }

        try {
            $usuario->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error al eliminar el usuario.'], 500);
        }
    }

    //Funcion realizada por Javier Morales
    public function entregaLote(Request $request, $id)
    {
        $usuario = UsuarioControlador::existeUsuario($id);
        if (is_null($usuario)) {
            return response()->json(['success' => false, 'error' => 'Usuario no encontrado.'], 404);
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'latitud' => 'required|string',
            'longitud' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $idEstadoEnviado = EstadoEntregaControlador::getIdEstadoEntrega('enviado');
        if (is_null($idEstadoEnviado)) { 
            return response()->json(['success' => false, 'error' => 'El estado de entra del lote no existe'], 400);
        }

        $loteCreado = LoteControlador::crearLote($usuario->id, $input['latitud'], $input['longitud'],$idEstadoEnviado, $input['descripcion'] );

        if (is_null($loteCreado)) { 
            return response()->json(['success' => false, 'error' => 'Error al crear el lote.'], 401);
        }

        return response()->json(['success' => true, 'message' => 'Lote entregado con éxito.'], 200);
    }

    //Funcion realizada por Javier Morales
    public function lotesColaborador($id) {
        $usuario = UsuarioControlador::existeUsuario($id);
        if (is_null($usuario)) {
            return response()->json(['success' => false, 'error' => 'Usuario no encontrado.'], 404);
        }

        $lotes = LoteControlador::lotesColaborador($id);

        return response()->json(['success'=> true,'lotes'=> $lotes, 'usuario' => $usuario],200);
    }
}
