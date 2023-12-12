<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol_usuario;
use App\Http\Controllers\RolControlador;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsuarioControlador extends Controller
{

    public function changePassword(Request $request, $id){              
        try {
            $user = User::find($id);
            $user->password = sha1($request->newPassword);
            $user->save(); 
            return response()->json(["success"=>true, "message" => "Password changed successfully"], 200); 
        }catch(Exception $e){
            return response()->json(["success"=>false, "message" => "Error al cambiar la contraseña"], 400);
        }
        
    }

    public function addRol(Request $request, $id) { 

        $messages = [
            'Error del rol' => 'El rol debe ser diseñador, admin, clasificador o colaborador',
        ];
        $validator = Validator::make($request->all(),[
            'rol' => ['required', 'in:diseñador,admin,clasificador,colaborador'],
        ], $messages);
        if ($validator->fails()) { 
            return response()->json($validator->messages(), 203);
        }

        $usuario = $this->existeUsuario($id);
        if (is_null($usuario)) { 
            return response()->json(['success' => false,'error' => 'Usuario no encontrado.'], 404);
        }

        //devuelve el id del rol que se pasa por parametro
        $idNuevoRol = RolControlador::getIdRol($request->rol);


        //Buscar si ya existe el rol en el usuario en la tabla rol_usuarios
        $roles = RolUsuarioControlador::usuarioTieneRol($id, $idNuevoRol);
        if ($roles) {
            return response()->json(['success' => false,'message' => 'El usuario ya tiene este rol.'], 200);
        }

        //añade un rol a un usuario si todo ha ido correctamente
        try {
            Rol_usuario::create([
                'id_usuario' => $id,
                'id_rol' => $idNuevoRol,
            ]);
            return response()->json(['success' => true,'message' => 'Rol añadido con éxito.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['success' => false,'error' => 'error al añadir usuario'], 500);
        }
    }

    public function destroyRol(Request $request, $id) { 
        $messages = [
            'Error del rol' => 'El rol debe ser diseñador, admin, clasificador o colaborador',
        ];
        $validator = Validator::make($request->all(),[
            'rol' => ['required', 'in:diseñador,admin,clasificador,colaborador'],
        ], $messages);
        if ($validator->fails()) { 
            return response()->json($validator->messages(), 203);
        }

        //comprueba si el usuario existe
        $usuario = $this->existeUsuario($id);
        if (is_null($usuario)) { 
            return response()->json(['success' => false,'error' => 'Usuario no encontrado.'], 404);
        }

        //obtiene el id del rol a eliminar
        $idRol = RolControlador::getIdRol($request->rol);

        //Comprueba que ese usuario tenga ese rol
        $roles = RolUsuarioControlador::usuarioTieneRol($id, $idRol);
        if (!$roles) {
            return response()->json(['success' => false,'message' => 'El usuario no tiene este rol.'], 200);
        }

        $numRolesUsuario = RolUsuarioControlador::numeroRoles($id);
        if ($numRolesUsuario == 1) {
            return response()->json(['success' => false,'message' => 'No se puede eliminar el ultimo rol del usuario.'], 200);
        }

        try {
            $rolUsuario = Rol_usuario::where('id_usuario', $id)->where('id_rol', $idRol)->first();
            $rolUsuario->delete();
            return response()->json(['success' => true,'message' => 'Rol eliminado con éxito.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['success' => false,'error' => 'error al eliminar usuario'], 203);
        }

    }
    public function cambiarRolToken(Request $request, $id) { 
        $usuario = $this->existeUsuario($id);
        if (is_null($usuario)) { 
            return response()->json(['success' => false,'error' => 'Usuario no encontrado.'], 404);
        }

        $input = $request->all();
        $messages = [
            'Error del rol' => 'El rol debe ser diseñador, admin, clasificador o colaborador',
        ];
        $validator = Validator::make($input, [
            'rol' => ['required', 'in:diseñador,admin,clasificador,colaborador'],
        ], $messages);
        if ($validator->fails()) { 
            return response()->json($validator->messages(), 203);
        }
        $usuario->tokens()->delete();
        $success['token'] =  $usuario->createToken('LaravelSanctumAuth', [$input['rol']])->plainTextToken;
        return response()->json(['success' => true, 'data' => $success], 201);
    }

    public function obtenerRoles($id) {
        
        if (is_null($this->existeUsuario($id))) {
            return response()->json(['success' => false,'error' => 'Usuario no encontrado.'], 404);
        } 

        $rolesUsuario = RolUsuarioControlador::getRoles($id);
        if (!$rolesUsuario) {
            return response()->json(['success' => false,'message' => 'Usuario no tiene roles.'], 200);
        }
        return response()->json(['success' => true, 'data' => $rolesUsuario], 200);
    }

    public static function existeUsuario($id) {
        $usuario = User::find($id);
        if (!$usuario) { 
            return null;
        }
        return $usuario;
    }
    


    public static function crearUsuario($nombre, $email, $password, $dni, $direccion) {
        try {
            $usuario = User::create(['nombre' => $nombre, 'email' => $email, 'password' => $password,'foto' => 'src','dni_cif' => $dni, 'direccion' => $direccion]);
            
            return $usuario;
        } catch (\Throwable $th) {
            return false;
        }

    }   

    public function index(){
        $usuarios = User::all();
        return response()->json(['success' => true, 'usuarios' => $usuarios]);
    }

    public function store(Request $request) { 
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombre' =>'required',
            'email' => 'required|email|unique:users', 
            'password' => 'required',
            'dni_cif' => 'required|unique:users',
            'direccion' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }
        try {
            $usuario = User::create(['nombre'=> $input['nombre'],'email'=> $input['email'],'password'=> $input['password'],'foto'=> 'src', 'dni_cif' => $input['dni_cif'], 'direccion' => $input['direccion']]);
            return response()->json(['success' => true, 'usuario' => $usuario], 200); 
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => 'Error al procesar la solicitud.'], 500);
        }
    }

    public function show($id){
        $usuario = self::existeUsuario($id); 
        if(!$usuario){
            return response()->json(['success' => false,'error' => 'Usuario no encontrado.'], 404);
        }else{
            return response()->json(['success' => true, 'usuario' => $usuario], 200);
        }
    }

    public function update(Request $request, $id){
        $input = $request->all();
        $validator = Validator::make($input, [
            'nombre' =>'required',
            'email' => 'required|email',             
            'dni_cif' => 'required|',
            'direccion' => 'required'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $usuario = self::existeUsuario($id); 
        if(!$usuario){
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }else{
            try{                 
                $usuario->nombre = $input['nombre'];
                $usuario->email = $input['email'];                
                $usuario->direccion = $input['direccion'];
                $usuario->dni_cif = $input['dni_cif'];
                $usuario->save();
                return response()->json(['success' => true, 'usuario' => $usuario], 200);
            }catch(\Throwable $th){
                return response()->json(['error' => 'Error al actualizar el usuario.'], 500);
            }
        } 
    }

    public function destroy($id){
        $usuario = User::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }
        try {            
            $usuario->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error al eliminar el usuario.'], 500);
        }
    }

    public static function tieneRol($nombreRol, $idUsuario) {
        $idRol = RolControlador::getIdRol($nombreRol);
        $existe = Rol_usuario::where('id_rol', $idRol)->where('id_usuario', $idUsuario)->first();
        if (is_null($existe)) {
            return null;
        } else {
            return $existe;
        }
    }

    /**
     * @author Alejandro Garcia 
     */
    public function uptadeFoto(Request $request, $id){
        $user = self::existeUsuario($id);
        if($user == null){ 
            return response()->json(['success' => false, 'mes' => 'Usuario no encontrado'], 404); 
        }
        $user->foto = $request->foto;
        $user->save(); 
        return response()->json(['success' => true, 'data' => $user], 200); 
    }
}
