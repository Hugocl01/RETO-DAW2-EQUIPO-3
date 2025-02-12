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
        Schema::create('retos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 45);
            $table->longText('texto');
            $table->unsignedBigInteger('estudio_id');
            $table->foreign('estudio_id')
                ->references('id')
                ->on('estudios')
                ->onDelete('cascade');

            $table->unsignedBigInteger('usuario_creador_id')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent()->nullable();
            $table->unsignedBigInteger('usuario_modificador_id')->nullable();
            $table->timestamp('fecha_modificacion')->useCurrentOnUpdate()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('retos');
    }
};
