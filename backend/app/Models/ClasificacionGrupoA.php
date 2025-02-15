<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="ClasificacionA",
 *     type="object",
 *     title="ClasificacionA",
 * )
 */
class ClasificacionGrupoA extends Model
{
    protected $table = 'clasificacion_grupo_a'; // Nombre de la vista en la BD
    protected $hidden = ['equipo_id']; // Oculta el id en la respuesta JSON
}
