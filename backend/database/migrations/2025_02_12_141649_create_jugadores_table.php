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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('equipo_id');
            $table->foreign('equipo_id')
                ->references('id')
                ->on('equipos')
                ->onDelete('cascade');
            $table->string('nombre_completo', 70);
            $table->boolean('capitan');
            $table->unsignedBigInteger('estudio_id')->nullable();
            $table->foreign('estudio_id')
                ->references('id')
                ->on('estudios')
                ->onDelete('cascade');
            $table->string('dni', 9)->nullable();
            $table->string('email', 45)->nullable();
            $table->string('telefono', 45)->nullable();

            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jugadores');
    }
};
