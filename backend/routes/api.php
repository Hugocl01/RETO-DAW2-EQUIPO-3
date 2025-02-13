<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\CentroController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\EstudioController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\FamiliaController;
use App\http\Controllers\SeccionController;
use App\http\Controllers\PerfilController;
use App\http\Controllers\DonacionController;
use App\http\Controllers\JugadorController;
use App\http\Controllers\InscripcionController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', LoginController::class);

// Usuarios
Route::apiResource('usuarios', UsuarioController::class);
Route::put('usuarios/{usuario}/activo', [UsuarioController::class, 'updateActivo']);

// Rutas de la API
Route::apiResource('ciclos', CicloController::class);
/*
Route::get('ciclos/todos', [CicloController::class, 'index']);
Route::get('ciclos/{ciclo}', [CicloController::class, 'show']);
Route::post('ciclos/crear', [CicloController::class, 'store']);
Route::put('ciclos/actualizar/{ciclo}', [CicloController::class, 'update']);
Route::delete('ciclos/eliminar/{ciclo}', [CicloController::class, 'destroy']);*/

Route::apiResource('centros', CentroController::class);
/*
Route::get('centros/todos', [CentroController::class, 'index']);
Route::get('centros/{centro}', [CentroController::class, 'show']);
Route::post('centros/crear', [CentroController::class, 'store']);
Route::put('centros/actualizar/{centro}', [CentroController::class, 'update']);
Route::delete('centros/eliminar/{centro}', [CentroController::class, 'destroy']);
*/
Route::apiResource('estudios', EstudioController::class);
/*
Route::get('estudios/todos', [EstudioController::class, 'index']);
Route::post('estudios/crear', [EstudioController::class, 'store']);
Route::delete('estudios/eliminar/{centro}', [EstudioController::class, 'destroy']);*/

Route::apiResource('equipos', EquipoController::class);
Route::apiResource('familias', FamiliaController::class);
Route::apiResource('secciones', SeccionController::class);
Route::apiResource('perfiles', PerfilController::class);
Route::apiResource('donaciones', DonacionController::class);
Route::apiResource('jugadores', JugadorController::class);
Route::apiResource('inscripciones', InscripcionController::class);
Route::put('inscripciones/{inscripcion}/activo', [InscripcionController::class, 'updateActivo']);


