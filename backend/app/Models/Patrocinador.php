<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Patrocinador extends Model
{
    use Auditable;

    protected $table = 'patrocinadores';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

}
