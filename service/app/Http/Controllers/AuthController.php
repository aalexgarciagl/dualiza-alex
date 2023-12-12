<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Rol_usuario;
use App\Http\Controllers\RolControlador;



class AuthController extends Controller
{
    public function login(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email' =>'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => sha1($request->password)])){
            $user = Auth::user();
            return response()->json(["success"=>true, "message" => "User logged-in!", 'data' => $user], 200);
        }else {
            if (!$user = User::where('email', '=', $request->email)->where('password', '=', sha1($request->password))->first()) {
                return response()->json(["success"=>false, "message" => "Invalid credentials!"], 202);
            }else {
                return response()->json("Unauthorised",204);
            }
        }
    }

    public function loginToken(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email' =>'required|email',
            'password' => 'required|string',
            'rol' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if(Auth::attempt(['email'=> $input['email'],'password'=> sha1($input['password'])])){ 
            $user = Auth::user();
            $tieneRol = UsuarioControlador::tieneRol($input['rol'], $user->id);
            if (is_null($tieneRol)) {
                return response()->json(["success" => false, 'message' => "El usuario no tiene el rol seleccionado"],403);
            }
            try {
                $success['token'] =  $user->createToken('LaravelSanctumAuth', [$input['rol']])->plainTextToken;
            } catch (\Throwable $th) {
                return response()->json("Error al crear el token", 500);
            }
            $success['name'] =  $user->name;
            return response()->json(["success"=>true,"data"=>$success, "message" => "Usuario logeado correcatemnte", 'user' => $user], 200);
        }else {
            if (!$user = User::where('email', '=', $request->email)->where('password', '=', sha1($request->password))->first()) {
                return response()->json(["success"=>false, "message" => "Invalid credentials!"], 404);
            }else {
                return response()->json("Unauthorised",204);
            }
        }
    }

    public function logout($id) {
        $user = User::where("id", $id)->first();

        if ($user) {
            $cantidad = $user->tokens()->delete();
            return response()->json(["success"=>true, 'tokens borrados' => $cantidad],200);
        } else {
            return response()->json(["success"=>false, "message" => "User not found"],404);
        }
    }

    public function register(Request $request) { 
        $idRolColaborador = RolControlador::getIdRol('colaborador');
        $validator = Validator::make($request->all(), [ 
            'nombre' =>'required|string|max:255',
            'email' =>'required|string|email|max:255|unique:users',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::create(['nombre' => $request->nombre,
                                     'email' => $request->email, 
                                     'password' => sha1($request->password), 
                                     'foto' => "https://dualiza-bucket.s3.eu-north-1.amazonaws.com/perfiles/profile-icon.png", 
                                     'dni_cif' => $request->dni_cif, 
                                     'direccion' => $request->direccion]);

            Rol_usuario::create(['id_rol' => $idRolColaborador, 'id_usuario' => $usuario->id]);
            return response()->json(["success"=>true,"data" => $usuario, "message" => "User successfully registered!"], 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(["success"=>false, "message" => $e], 400);
        }
    }

}   
