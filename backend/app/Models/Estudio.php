<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Estudio extends Model
{
    use Auditable;

    protected $table = 'estudios';

    protected $fillable = [
        'centro_id',
        'ciclo_id',
        'curso'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'ciclo_id');
    }

}
