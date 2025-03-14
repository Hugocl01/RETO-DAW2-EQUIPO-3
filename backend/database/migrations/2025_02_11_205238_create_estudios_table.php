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
        Schema::create('estudios', function (Blueprint $table) {
            // Datos Estudios
            $table->id();
            $table->unsignedBigInteger('centro_id');
            $table->foreign('centro_id')
                ->references('id')
                ->on('centros')
                ->onDelete('restrict');
            $table->unsignedBigInteger('ciclo_id');
            $table->foreign('ciclo_id')
                ->references('id')
                ->on('ciclos')
                ->onDelete('restrict');
            $table->integer('curso');

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
        Schema::dropIfExists('estudios');
    }
};
