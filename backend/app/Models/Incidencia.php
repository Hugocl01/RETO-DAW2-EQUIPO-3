<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Incidencia extends Model
{
    protected $table = 'incidencias';

    protected $fillable = [
        'tipo',
    ];

    // Un tipo de incidencia puede estar relacionado con varias actas.
    public function actas()
    {
        return $this->hasMany(Acta::class, 'incidencia_id');
    }

    public static function getLista()
    {
        return self::pluck('tipo', 'id');
    }
}
