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
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('equipoL_id')->nullable();
            $table->foreign('equipoL_id')->references('id')->on('equipos')->onDelete('cascade');
            $table->unsignedBigInteger('equipoV_id')->nullable();
            $table->foreign('equipoV_id')->references('id')->on('equipos')->onDelete('cascade');
            $table->date('fecha')->nullable();
            $table->time('hora')->nullable();
            $table->smallInteger('golesL')->nullable();
            $table->smallInteger('golesV')->nullable();
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
        Schema::dropIfExists('partidos');
    }
};
