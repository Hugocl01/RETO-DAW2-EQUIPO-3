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


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', LoginController::class);

// Usuarios
Route::apiResource('usuarios', UsuarioController::class);
Route::put('usuarios/{usuario}/activo', [UsuarioController::class, 'updateActivo']);

// Rutas de la API
Route::apiResource('ciclos', CicloController::class);
Route::apiResource('centros', CentroController::class);
Route::apiResource('estudios', EstudioController::class);
Route::apiResource('equipos', EquipoController::class);
Route::apiResource('familias', FamiliaController::class);
Route::apiResource('secciones', SeccionController::class);
Route::apiResource('perfiles', PerfilController::class);
