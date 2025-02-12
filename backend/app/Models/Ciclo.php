<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Ciclo extends Model
{
    use Auditable;

    protected $table = 'ciclos';

    protected $fillable = [
        'nombre',
        'familia_id'
    ];

    public function familia()
    {
        return $this->belongsTo(Familia::class, 'familia_id');
    }

}
