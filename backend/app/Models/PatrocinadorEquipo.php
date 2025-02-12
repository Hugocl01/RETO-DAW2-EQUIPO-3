<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class PatrocinadorEquipo extends Model
{
    use Auditable;

    protected $table = 'patrocinadores_equipos';

    protected $fillable = [
        'patrocinador_id',
        'equipo_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

}
