<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClasificacionGrupoB extends Model
{
    protected $table = 'clasificacion_grupo_b'; // Nombre de la vista en la BD
    protected $hidden = ['equipo_id']; // Oculta el id en la respuesta JSON
}
