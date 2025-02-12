<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Publicacion extends Model
{
    use Auditable;

    protected $table = 'publicaciones';

    protected $fillable = [
        'titulo',
        'texto',
        'portada',
        'rutavideo',
        'rutaaudio',
        'imagen',
        'tipo_entidad',
        'equipo_id',
        'partido_id',
        'patrocinador_id',
        'jugador_id',
        'reto_id',
        'ong_id',
        'pabellon_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function reto()
    {
        return $this->belongsTo(Reto::class);
    }

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }

    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
    }

}
