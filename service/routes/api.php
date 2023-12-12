<?php

use App\Http\Controllers\AwsController;
use App\Http\Controllers\CorreoControlador;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ColaboradorControlador;
use App\Http\Controllers\EstadoEntregaControlador;
use App\Http\Controllers\ClasificadorControlador;
use App\Http\Controllers\LoteControlador;
use App\Http\Controllers\ComponenteControlador;
use App\Http\Controllers\DespieceControlador;
use App\Http\Controllers\UsuarioControlador;
use App\Http\Controllers\InventarioControlador;
use App\Http\Controllers\JoyaControlador;
use App\Http\Middleware\MidAdmin;
use App\Http\Middleware\midColaborador;
use App\Http\Middleware\midAdminClasificador;
use App\Http\Middleware\midClasificador;
use App\Http\Middleware\midAdminClasiDis;
use App\Http\Middleware\midDisenador;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('login')->group(function () { 
    Route::post('', [AuthController::class, 'login']);
    Route::post('token', [AuthController::class, 'loginToken']);
});

Route::post('logout/{id}', [AuthController::class, 'logout']);
Route::post('register', [AuthController::class, 'register']);

Route::prefix('admin')->middleware(['auth:sanctum', midAdmin::class])->group(function () {
    Route::prefix('colaboradores')->group(function () {
        Route::get('', [ColaboradorControlador::class, 'index']);
        Route::post('', [ColaboradorControlador::class,'store']);
        Route::get('{id}', [ColaboradorControlador::class,'show'])->whereNumber('id');
        Route::put('{id}', [ColaboradorControlador::class, 'update'])->whereNumber('id');
        Route::delete('{id}', [ColaboradorControlador::class, 'destroy'])->whereNumber('id');
    });
    Route::prefix('usuarios')->group(function () { 
        Route::prefix('roles')->group(function () {
            Route::put('{id}', [UsuarioControlador::class, 'addRol'])->whereNumber('id');
            Route::delete('{id}', [UsuarioControlador::class, 'destroyRol'])->whereNumber('id');
        });
        Route::get('',[UsuarioControlador::class,'index']);
        Route::post('',[UsuarioControlador::class,'store']);
        Route::get('{id}', [UsuarioControlador::class,'show'])->whereNumber('id');
        Route::put('{id}', [UsuarioControlador::class, 'update'])->whereNumber('id');
        Route::delete('{id}', [UsuarioControlador::class, 'destroy'])->whereNumber('id');
    });
    Route::prefix('inventario')->group(function() { 
        Route::post('componentes', [InventarioControlador::class, 'insertarCompInventario']);        
    });
});

Route::put('inventario/update',[InventarioControlador::class, 'actualizarCantidadComponente']);
Route::get('inventario/list',[InventarioControlador::class, 'obtenerInventarioComponentes']); 

//Admin o clasificador cambian estado de una entrega
Route::put('admin/clasificador/entrega/cambio_estado/{id}',[LoteControlador::class, 'cambiarEstado'])->middleware(['auth:sanctum', midAdminClasificador::class])->whereNumber('id');
//Devuelve todos los estados que hay
Route::get('estados_entrega', [EstadoEntregaControlador::class, 'getEstados']);

Route::prefix('usuarios')->group(function () {
    Route::get('{id}', [UsuarioControlador::class,'show'])->whereNumber('id');
    Route::put('{id}', [UsuarioControlador::class, 'update'])->whereNumber('id');
    //el usuario cambia el rol con el que su sesion esta iniciada
    Route::put('cambiar_rol/{id}', [UsuarioControlador::class,'cambiarRolToken'])->middleware('auth:sanctum')->whereNumber('id');
    //devuelve todos los roles que tiene un usuario
    Route::get('roles/{id}', [UsuarioControlador::class, 'obtenerRoles'])->whereNumber('id');
    Route::put('password/{id}',[UsuarioControlador::class,'changePassword'])->middleware('auth:sanctum')->whereNumber('id');
});

Route::prefix('colaborador')->middleware(['auth:sanctum', midColaborador::class])->group(function () { 
    Route::prefix('entrega')->group(function () { 
        //colaborador entrega un lote
        Route::post('{id}', [ColaboradorControlador::class, 'entregaLote'])->whereNumber('id');
        //colaborador cambia el estado de su lote solo a cancelado
        Route::put('cambio_estado/{id_lote}/{id_usuario}', [LoteControlador::class, 'cambiarEstadoColaborador'])->whereNumber('id');
        //colaborador recibe todos sus lotes
        Route::get('{id}', [ColaboradorControlador::class, 'lotesColaborador'])->whereNumber('id');
    });
});


Route::post('subirImagen', [AwsController::class, 'subirImagen'])->whereNumber('id');
Route::put('actualizarFoto/{id}', [UsuarioControlador::class,'uptadeFoto'])->whereNumber('id');


Route::prefix('clasificar')->middleware(['auth:sanctum', midClasificador::class])->group(function () {
    //Añade un componente a un lote
    Route::post('componente/{id_lote}', [ClasificadorControlador::class, 'clasificarComponente'])->whereNumber('id_lote');
    //Marca una entrega como clasificada
    Route::put('entrega/{id}', [LoteControlador::class, 'cambiarEstado'])->whereNumber('id_lote');
});
//muestra al clasificador todos los lotes sin clasificar
Route::get('clasificador/lotes_pendientes', [LoteControlador::class, 'lotesEntregados'])->middleware(['auth:sanctum', midAdminClasificador::class]);
//documentado
//Devuelve todos los componentes clasificados de un lote
Route::get('lote/componentes/{id}', [DespieceControlador::class, 'componentesLote'])->middleware(['auth:sanctum', midClasificador::class]);

Route::prefix('componentes')->middleware(['auth:sanctum', midAdminClasificador::class])->group(function() {
    //inserta componente que admite el sistema
    Route::post('insertar', [ComponenteControlador::class, 'insertarComponente']);
    //Actualiza la información de un componente
    Route::put('actualizar/{id}', [ComponenteControlador::class, 'update'])->whereNumber('id');
    //Elimina un componente que admite el sistema
    Route::delete('{id}', [ComponenteControlador::class, 'destroy'])->whereNumber('id');
});
Route::get('componentes', [ComponenteControlador::class, 'show'])->middleware(['auth:sanctum', midAdminClasiDis::class]);

//devuelve todos los lotes
Route::get('lotes', [LoteControlador::class,'show'])->middleware(['auth:sanctum', midAdminClasificador::class]);

Route::prefix('disenador/recetas')->middleware(['auth:sanctum', midDisenador::class])->group(function() {
    Route::post('{id}', [JoyaControlador::class, 'crearDiseno'])->whereNumber('id');
    Route::get('',  [JoyaControlador::class, 'show']);
    Route::post('random', [JoyaControlador::class, 'recetaAleatoria']);
});


Route::put('solicitarNewPassword', [CorreoControlador::class, 'enviarNuevaPassword']);
Route::post('anadirFotoJoya', [AwsController::class, 'subirImagenJoya']);