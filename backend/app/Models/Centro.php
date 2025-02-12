<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Centro extends Model
{
    use Auditable;

    protected $table = 'centros';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

    public function estudios()
    {
        return $this->hasMany(Estudio::class, 'centro_id');
    }

    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'centro_id');
    }

}
