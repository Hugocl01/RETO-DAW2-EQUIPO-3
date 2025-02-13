<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Equipo extends Model
{
    use HasFactory, Auditable;

    protected $table = 'equipos';

    protected $fillable = [
        'nombre',
        'centro_id',
        'grupo',
        'usuario_id',
        'activo'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id'); // o el modelo que represente al entrenador
    }

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function inscripcion()
    {
        return $this->hasOne(Inscripcion::class);
    }

    public function statsEquipo(): array
    {
        // Obtener todos los jugadores del equipo
        $jugadores = $this->jugadores;

        // Inicializar contadores
        $totalGoles = 0;
        $totalTarjetasAmarillas = 0;
        $totalTarjetasRojas = 0;
        $totalFaltas = 0;

        // Recorrer cada jugador y sumar sus estadísticas
        foreach ($jugadores as $jugador) {
            $stats = $jugador->statsJugador();
            $totalGoles += $stats['goles'];
            $totalTarjetasAmarillas += $stats['tarjetas_amarillas'];
            $totalTarjetasRojas += $stats['tarjetas_rojas'];
            $totalFaltas += $stats['faltas'];
        }

        return [
            'goles'             => $totalGoles,
            'tarjetas_amarillas' => $totalTarjetasAmarillas,
            'tarjetas_rojas'     => $totalTarjetasRojas,
            'faltas'             => $totalFaltas,
        ];
    }
}
