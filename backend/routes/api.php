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
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\IncidenciaController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\TorneoController;

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
Route::middleware('auth:sanctum')->get('/usuario', function (Request $request) {
    return $request->user();
});

//                                Ruta para login __invoke | ruta /logout
/** <---------------------------------------------------------------------------------------> */

Route::post('/login', LoginController::class);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

/** <---------------------------------------------------------------------------------------> */




//                                 Rutas de la API PÚBLICA
/** <---------------------------------------------------------------------------------------> */

// Donaciones
Route::apiResource('donaciones', DonacionController::class)->only(['index']);

// Ciclos
Route::apiResource('ciclos', CicloController::class)->only(['index']);

// Retos
Route::apiResource('retos', RetoController::class)->only(['index', 'show']);

// Centros
Route::apiResource('centros', CentroController::class)->only(['index']);

// Equipos
Route::apiResource('equipos', EquipoController::class)->only(['index', 'show']);

// Jugadores
Route::apiResource('jugadores', JugadorController::class)->only(['index', 'show']);

// Partidos
Route::apiResource('partidos', PartidoController::class)->only('index', 'show');

// Estudios
Route::apiResource('estudios', EstudioController::class)->only('index');

// Clasificaciones
Route::get('/clasificacion/grupo-a', [ClasificacionController::class, 'grupoA']);
Route::get('/clasificacion/grupo-b', [ClasificacionController::class, 'grupoB']);

/** <---------------------------------------------------------------------------------------> */




//                                  Funcionalidades Inscripcion
/** <---------------------------------------------------------------------------------------> */
Route::post('/set-password/{id}/{token}', [UsuarioController::class, 'setPassword']);

Route::get('/confirmarInscripcion/{inscripcion}/{rol}/{token}', [InscripcionController::class, 'confirmarInscripcion'])
    ->name('confirmarInscripcion');

Route::get('/inscripcion-confirmada', function () {
    // Simplemente devolvemos una vista (que crearemos en el siguiente paso)
    return view('inscripcion.confirmada');
})->name('inscripcion.confirmada.view');

/** <---------------------------------------------------------------------------------------> */




//                                      RUTAS PRIVADAS
/** <---------------------------------------------------------------------------------------> */

Route::apiResource('usuarios', UsuarioController::class)->middleware('auth:sanctum');

// Ciclos
Route::apiResource('ciclos', CicloController::class)->except(['index'])->middleware('auth:sanctum');
Route::get('/lista/ciclos', [CicloController::class, 'getListaCiclos'])->middleware('auth:sanctum');

// Centros
Route::apiResource('centros', CentroController::class)->except('index')->middleware('auth:sanctum');
Route::get('/lista/centros', [CentroController::class, 'getListaCentros'])->middleware('auth:sanctum');

// Estudios
Route::apiResource('estudios', EstudioController::class)->except(['index'])->middleware('auth:sanctum');
Route::get('/lista/estudios', [EstudioController::class, 'getListaEstudios'])->middleware('auth:sanctum');

// Equipos
Route::apiResource('equipos', EquipoController::class)->except(['index', 'show'])->middleware('auth:sanctum');
Route::get('lista/equipos', [EquipoController::class, 'getListaEquipos'])->middleware('auth:sanctum');

// Familias
Route::apiResource('familias', FamiliaController::class)->middleware('auth:sanctum');

// Secciones
Route::apiResource('secciones', SeccionController::class)->middleware('auth:sanctum');

// Perfiles
Route::apiResource('perfiles', PerfilController::class)->middleware('auth:sanctum');
Route::get('/lista/perfiles', [PerfilController::class, 'getListaPerfiles'])->middleware('auth:sanctum');

// Donaciones
Route::apiResource('donaciones', DonacionController::class)->except(['index'])->middleware('auth:sanctum');

// Jugadores
Route::apiResource('jugadores', JugadorController::class)->except(['index', 'show'])->middleware('auth:sanctum');

// Retos
Route::apiResource('retos', RetoController::class)->except(['index', 'show'])->middleware('auth:sanctum');

// Partidos
Route::apiResource('partidos', PartidoController::class)->except(['index', 'show'])->middleware('auth:sanctum');
Route::get('/lista/partidos', [PartidoController::class, 'getListaTipoPartido'])->middleware('auth:sanctum');

// Publicaciones
Route::apiResource('publicaciones', PublicacionController::class)->middleware('auth:sanctum');
Route::get('/lista/publicaciones', [PublicacionController::class, 'getListaPublicacionModelos'])->middleware('auth:sanctum');

// Imagenes
Route::apiResource('imagenes', ImagenController::class)->middleware('auth:sanctum');
Route::get('/lista/imagenes', [ImagenController::class, 'getListaImagenModelos'])->middleware('auth:sanctum');

// Inscripciones
Route::apiResource('inscripciones', InscripcionController::class)->middleware('auth:sanctum');
Route::put('/cambiarEstado/{inscripcion}', [InscripcionController::class, 'cambiarEstado'])->middleware('auth:sanctum');

// Incidencia
Route::get('/lista/incidencias', [IncidenciaController::class, 'getListaIncidencias'])->middleware('auth:sanctum');

// Torneo
Route::get('/comienzo-torneo', [TorneoController::class, 'comienzoTorneo'])
    ->middleware(['auth:sanctum', 'ability:Torneo.comienzoTorneo']);

Route::get('/reinicio-torneo', [TorneoController::class, 'reinicioTorneo'])
    ->middleware(['auth:sanctum', 'ability:Torneo.reinicioTorneo']);
