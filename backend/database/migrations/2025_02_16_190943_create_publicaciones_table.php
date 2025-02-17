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
        Schema::create('publicaciones', function (Blueprint $table) {
            $table->id();

            $table->string('titulo');
            $table->text('contenido')->nullable();  // Texto, puede ser HTML si usas TinyMCE

            // Relación polimórfica con la entidad a la que pertenece esta publicación
            // Esto crea publicacionable_id (bigInteger) y publicacionable_type (string)
            $table->morphs('publicacionable');

            // Opcional: si la publicación tiene video/audio
            $table->string('ruta_video')->nullable();
            $table->string('ruta_audio')->nullable();

            // Opcional: si va a portada
            $table->boolean('portada')->default(false);

            // Creaciones y modificaciones
            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publicaciones');
    }
};
