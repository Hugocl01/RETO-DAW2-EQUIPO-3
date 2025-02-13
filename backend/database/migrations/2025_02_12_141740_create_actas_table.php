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
        Schema::create('actas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('partido_id');
            $table->foreign('partido_id')
                ->references('id')
                ->on('partidos')
                ->onDelete('cascade');
            $table->unsignedBigInteger('jugador_id')->nullable();
            $table->foreign('jugador_id')
                ->references('id')
                ->on('jugadores')
                ->onDelete('cascade');
            $table->unsignedBigInteger('incidencia_id')->nullable();
            $table->foreign('incidencia_id')
                ->references('id')
                ->on('incidencias')
                ->onDelete('cascade');
            $table->integer('tiempo');
            $table->longText('comentario')->nullable();

            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('actas');
    }
};
