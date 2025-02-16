<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imagenes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable();
            $table->string('ruta');

            // Relación polimórfica -> crea imageable_id y imageable_type
            $table->morphs('imageable');

            // Auditoría
            $table->unsignedBigInteger('usuario_id_creacion')->nullable();
            $table->dateTime('fecha_creacion')->nullable();
            $table->unsignedBigInteger('usuario_id_actualizacion')->nullable();
            $table->dateTime('fecha_actualizacion')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagenes');
    }
};
