<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AbilityMiddleware;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Middleware para verificar un único ability
        Route::aliasMiddleware('ability', AbilityMiddleware::class);
    }
}
