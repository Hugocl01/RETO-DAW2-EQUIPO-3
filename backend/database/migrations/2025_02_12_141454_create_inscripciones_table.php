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
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->id();
            $table->longText('comentarios');
            $table->unsignedBigInteger('equipo_id');
            $table->foreign('equipo_id')
                ->references('id')
                ->on('equipos')
                ->onDelete('cascade');
            $table->unsignedBigInteger('estado_id');
            $table->foreign('estado_id')
                ->references('id')
                ->on('estado_inscripciones')
                ->onDelete('cascade');
            $table->boolean('confirmado_capitan')->default('false');
            $table->string('token_confirmacion_capitan')->nullable();
            $table->boolean('confirmado_entrenador')->default('false');
            $table->string('token_confirmacion_entrenador')->nullable();

            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inscripciones');
    }
};
