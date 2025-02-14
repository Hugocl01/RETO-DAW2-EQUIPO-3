<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClasificacionGrupoA extends Model
{
    protected $table = 'clasificacion_grupo_a'; // Nombre de la vista en la BD
    protected $hidden = ['equipo_id']; // Oculta el id en la respuesta JSON
}
