<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class PatrocinadorEquipo extends Model
{
    use Auditable, HasFactory;

    protected $table = 'patrocinadores_equipos';

    protected $fillable = [
        'patrocinador_id',
        'equipo_id',
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
