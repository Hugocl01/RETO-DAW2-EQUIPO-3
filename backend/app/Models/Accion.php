<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accion extends Model
{
    use HasFactory;

    protected $table = 'acciones';

    protected $fillable = ['nombre', 'seccion_id']; // Añadir otros campos según necesites

    public function seccion()
    {
        return $this->belongsTo(Seccion::class, 'seccion_id', 'id');
    }
}
