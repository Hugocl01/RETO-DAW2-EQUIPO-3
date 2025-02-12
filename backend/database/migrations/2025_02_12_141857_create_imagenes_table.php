<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('imagenes', function (Blueprint $table) {
            $table->id();
            $table->string('url', 45);
            $table->string('nombre', 45);

            $table->unsignedBigInteger('equipo_id')->nullable();
            $table->foreign('equipo_id')->references('id')->on('equipos')->onDelete('cascade');
            $table->unsignedBigInteger('jugador_id')->nullable();
            $table->foreign('jugador_id')->references('id')->on('jugadores')->onDelete('cascade');
            $table->unsignedBigInteger('partido_id')->nullable();
            $table->foreign('partido_id')->references('id')->on('partidos')->onDelete('cascade');
            $table->unsignedBigInteger('patrocinador_id')->nullable();
            $table->foreign('patrocinador_id')->references('id')->on('patrocinadores')->onDelete('cascade');
            $table->unsignedBigInteger('reto_id')->nullable();
            $table->foreign('reto_id')->references('id')->on('retos')->onDelete('cascade');
            $table->unsignedBigInteger('ong_id')->nullable();
            $table->foreign('ong_id')->references('id')->on('ongs')->onDelete('cascade');
            $table->unsignedBigInteger('publicacion_id')->nullable();
            $table->foreign('publicacion_id')->references('id')->on('publicaciones')->onDelete('cascade');
            $table->unsignedBigInteger('pabellon_id')->nullable();
            $table->foreign('pabellon_id')->references('id')->on('pabellones')->onDelete('cascade');

            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('imagenes');
    }
};
