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
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\DonacionController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\RetoController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\ClasificacionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí se definen las rutas de la API de tu aplicación. Estas rutas
| son cargadas por el RouteServiceProvider dentro de un grupo que
| asigna el middleware "api" a todas ellas.
|
*/

// Ruta para obtener el usuario autenticado (usando Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ruta para login (suponiendo un controlador invocable)
Route::post('/login', LoginController::class);

// Rutas de la API:

// Usuarios
Route::apiResource('usuarios', UsuarioController::class);
Route::put('usuarios/{usuario}/activo', [UsuarioController::class, 'updateActivo']);

// Ciclos
Route::apiResource('ciclos', CicloController::class);

// Centros
Route::apiResource('centros', CentroController::class);

// Estudios
Route::apiResource('estudios', EstudioController::class);

// Equipos
Route::apiResource('equipos', EquipoController::class);

// Familias
Route::apiResource('familias', FamiliaController::class);

// Secciones
Route::apiResource('secciones', SeccionController::class);

// Perfiles
Route::apiResource('perfiles', PerfilController::class);

// Donaciones
Route::apiResource('donaciones', DonacionController::class);

// Jugadores
Route::apiResource('jugadores', JugadorController::class);
Route::put('jugadores/{jugadore}/activar', [UsuarioController::class, 'activar']);

// Retos
Route::apiResource('retos', RetoController::class);

// Partidos
Route::apiResource('partidos', PartidoController::class);

// Clasificaciones
Route::get('/clasificacion/grupo-a', [ClasificacionController::class, 'grupoA']);
Route::get('/clasificacion/grupo-b', [ClasificacionController::class, 'grupoB']);

// Inscripciones
Route::apiResource('inscripciones', InscripcionController::class);
Route::put('inscripciones/{inscripcion}/activo', [InscripcionController::class, 'updateActivo']);

// (Opcional) Reto
// Route::apiResource('retos', RetoController::class);
