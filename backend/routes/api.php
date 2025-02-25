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

// RUTAS PÚBLICAS
Route::post('/login', LoginController::class);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('donaciones', DonacionController::class)->only(['index']);
Route::apiResource('ciclos', CicloController::class)->only(['index']);
Route::apiResource('retos', RetoController::class)->only(['index', 'show']);
Route::apiResource('centros', CentroController::class)->only(['index']);
Route::apiResource('equipos', EquipoController::class)->only(['index', 'show']);
Route::apiResource('jugadores', JugadorController::class)->only(['index', 'show']);
Route::apiResource('partidos', PartidoController::class)->only(['index', 'show']);
Route::apiResource('estudios', EstudioController::class)->only(['index']);
Route::apiResource('publicaciones', PublicacionController::class)->only(['index', 'show']);

Route::get('/clasificacion/grupo-a', [ClasificacionController::class, 'grupoA']);
Route::get('/clasificacion/grupo-b', [ClasificacionController::class, 'grupoB']);



// Funcionalidades de Inscripción
Route::post('/set-password/{id}/{token}', [UsuarioController::class, 'setPassword']);
Route::get('/confirmarInscripcion/{inscripcion}/{rol}/{token}', [InscripcionController::class, 'confirmarInscripcion'])
    ->name('confirmarInscripcion');

Route::get('/inscripcion-confirmada', function () {
    return view('inscripcion.confirmada');
})->name('inscripcion.confirmada.view');




// RUTAS PRIVADAS
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('usuarios', UsuarioController::class)
        ->middleware('ability:Usuarios.index,Usuarios.store,Usuarios.update,Usuarios.destroy');

    Route::apiResource('ciclos', CicloController::class)->except(['index']);
    Route::get('/lista/ciclos', [CicloController::class, 'getListaCiclos'])
        ->middleware('ability:Ciclos.store,Ciclos.update,Ciclos.destroy');

    Route::apiResource('centros', CentroController::class)->except(['index'])
        ->middleware('ability:Centros.store,Centros.update,Centros.destroy');
    Route::get('/lista/centros', [CentroController::class, 'getListaCentros']);

    Route::apiResource('estudios', EstudioController::class)->except(['index'])
        ->middleware('ability:Estudios.index,Estudios.show,Estudios.store,Estudios.update,Estudios.destroy');
    Route::get('/lista/estudios', [EstudioController::class, 'getListaEstudios']);

    Route::apiResource('equipos', EquipoController::class)->except(['index', 'show']);
    Route::get('/lista/equipos', [EquipoController::class, 'getListaEquipos']);

    Route::apiResource('familias', FamiliaController::class)
        ->middleware('ability:Familias.index,Familias.show,Familias.store,Familias.update,Familias.destroy');
    Route::get('/lista/familias', [FamiliaController::class, 'getListaFamilias']);

    Route::apiResource('perfiles', PerfilController::class)->only('show')
        ->middleware('ability:Perfiles.show');
    Route::get('/lista/perfiles', [PerfilController::class, 'getListaPerfiles'])
        ->middleware('ability:Perfiles.getListaPerfiles');

    Route::apiResource('donaciones', DonacionController::class)->except(['index'])
        ->middleware('ability:Donaciones.store,Donaciones.update,Donaciones.destroy');

    Route::apiResource('jugadores', JugadorController::class)->except(['index', 'show']);
    Route::get('/lista/jugadores', [JugadorController::class, 'getListaJugadores']);

    Route::apiResource('retos', RetoController::class)->except(['index', 'show'])
        ->middleware('ability:Retos.store,Retos.update,Retos.destroy');

    Route::apiResource('partidos', PartidoController::class)->except(['index', 'show']);
    Route::get('/lista/partidos', [PartidoController::class, 'getListaTipoPartido'])
        ->middleware('ability:Partidos.getListaTipoPartido');

    Route::apiResource('publicaciones', PublicacionController::class)
        ->middleware('ability:Publicaciones.store,Publicaciones.update');
    Route::get('/lista/publicaciones', [PublicacionController::class, 'getListaPublicacionModelos'])
        ->middleware('ability:Publicaciones.getListaPublicacionModelos');

    Route::apiResource('imagenes', ImagenController::class);
    Route::get('/lista/imagenes', [ImagenController::class, 'getListaImagenModelos'])
        ->middleware('ability:Imagenes.getListaImagenModelos');

    Route::apiResource('inscripciones', InscripcionController::class);
    Route::put('/cambiarEstado/{inscripcion}', [InscripcionController::class, 'cambiarEstado'])
        ->middleware('ability:Inscripciones.cambiarEstado');

    Route::get('/lista/incidencias', [IncidenciaController::class, 'getListaIncidencias'])
        ->middleware('ability:Incidencias.getListaIncidencias');

    Route::get('/comienzo-torneo', [TorneoController::class, 'comienzoTorneo'])->middleware('ability:Torneo.comienzoTorneo');
    Route::get('/reinicio-torneo', [TorneoController::class, 'reinicioTorneo'])->middleware('ability:Torneo.reinicioTorneo');
});
