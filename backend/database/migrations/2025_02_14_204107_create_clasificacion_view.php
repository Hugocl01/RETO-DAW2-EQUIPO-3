<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Vista para la clasificación del Grupo A
        DB::statement(/** @lang SQL */ "
            CREATE OR REPLACE VIEW clasificacion_grupo_a AS
            WITH overall AS (
                SELECT
                    e.id AS equipo_id,
                    e.nombre AS equipo,
                    COUNT(p.id) AS partidos_jugados,
                    SUM(
                        CASE
                            WHEN (e.id = p.equipo_local_id AND p.goles_local > p.goles_visitante)
                              OR (e.id = p.equipo_visitante_id AND p.goles_visitante > p.goles_local)
                            THEN 3
                            WHEN p.goles_local = p.goles_visitante THEN 1
                            ELSE 0
                        END
                    ) AS puntos,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_local
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_visitante
                            ELSE 0
                        END
                    ) AS goles_favor,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_visitante
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_local
                            ELSE 0
                        END
                    ) AS goles_contra,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_local - p.goles_visitante
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_visitante - p.goles_local
                            ELSE 0
                        END
                    ) AS diferencia_goles
                FROM equipos e
                LEFT JOIN partidos p ON e.id = p.equipo_local_id OR e.id = p.equipo_visitante_id
                WHERE e.grupo = 'A'
                GROUP BY e.id, e.nombre
            )
            SELECT *
            FROM overall
            ORDER BY puntos DESC, diferencia_goles DESC
        ");

        // Vista para la clasificación del Grupo B
        DB::statement(/** @lang SQL */ "
            CREATE OR REPLACE VIEW clasificacion_grupo_b AS
            WITH overall AS (
                SELECT
                    e.id AS equipo_id,
                    e.nombre AS equipo,
                    COUNT(p.id) AS partidos_jugados,
                    SUM(
                        CASE
                            WHEN (e.id = p.equipo_local_id AND p.goles_local > p.goles_visitante)
                              OR (e.id = p.equipo_visitante_id AND p.goles_visitante > p.goles_local)
                            THEN 3
                            WHEN p.goles_local = p.goles_visitante THEN 1
                            ELSE 0
                        END
                    ) AS puntos,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_local
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_visitante
                            ELSE 0
                        END
                    ) AS goles_favor,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_visitante
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_local
                            ELSE 0
                        END
                    ) AS goles_contra,
                    SUM(
                        CASE
                            WHEN e.id = p.equipo_local_id THEN p.goles_local - p.goles_visitante
                            WHEN e.id = p.equipo_visitante_id THEN p.goles_visitante - p.goles_local
                            ELSE 0
                        END
                    ) AS diferencia_goles
                FROM equipos e
                LEFT JOIN partidos p ON e.id = p.equipo_local_id OR e.id = p.equipo_visitante_id
                WHERE e.grupo = 'B'
                GROUP BY e.id, e.nombre
            )
            SELECT *
            FROM overall
            ORDER BY puntos DESC, diferencia_goles DESC
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS clasificacion_grupo_a");
        DB::statement("DROP VIEW IF EXISTS clasificacion_grupo_b");
    }
};
