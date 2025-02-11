<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login',LoginController::class);


Route::get('/usuarios',[UsuarioController::class, 'index']);
Route::put('/usuarios/{Usuario}',[UsuarioController::class, 'updateActivo']);
Route::post('/usuarios',[UsuarioController::class, 'store']);
Route::put('/usuarios',[UsuarioController::class, 'edit']);
