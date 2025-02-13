<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Jugador extends Model
{
    use Auditable, HasFactory;

    protected $table = 'jugadores';

    protected $fillable = [
        'equipo_id',
        'nombre_completo',
        'capitan',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'activo',
    ];

    // Relationship with Equipo
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relationship with Estudio
    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
    }

    public function actas()
    {
        return $this->hasMany(Acta::class, 'jugador_id');
    }


    // Custom method to compute stats for the player
    public function statsJugador(): array
    {
        // Load actas with their associated incidencia to avoid N+1 issues

        $goles = $this->actas()->where('incidencia_id', 1)->count();
        $tarjetas_amarillas = $this->actas()->where('incidencia_id', 7)->count();
        $tarjetas_rojas = $this->actas()->where('incidencia_id', 8)->count();
        $faltas = $this->actas()->where('incidencia_id', 13)->count();

        return [
            'goles'             => $goles,
            'tarjetas_amarillas' => $tarjetas_amarillas,
            'tarjetas_rojas'     => $tarjetas_rojas,
            'faltas'             => $faltas,
        ];
    }
}
