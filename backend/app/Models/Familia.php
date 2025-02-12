<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Familia extends Model
{
    use Auditable;

    protected $table = 'familias';

    protected $fillable = [
        'nombre',
    ];

    public function ciclos()
    {
        $this->hasMany(Ciclo::class, 'familia_id');
    }

}
