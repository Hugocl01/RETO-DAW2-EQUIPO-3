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
        'usuario_id'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

}
