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
        Schema::create('perfil_seccion_accion', function (Blueprint $table) {
            $table->id();

            // Relación con perfiles
            $table->foreignId('perfil_id')->constrained('perfiles')->onDelete('cascade');

            // Relación con secciones
            $table->foreignId('seccion_id')->constrained('secciones')->onDelete('cascade');

            // Relación con acciones
            $table->foreignId('accion_id')->constrained('acciones')->onDelete('cascade');

            // Asegurar que no haya registros duplicados
            $table->unique(['perfil_id', 'seccion_id', 'accion_id']);

            // Auditoría
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
        Schema::dropIfExists('perfil_seccion_accion');
    }
};
