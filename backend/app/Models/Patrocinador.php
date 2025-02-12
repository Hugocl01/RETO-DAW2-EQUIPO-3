<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Patrocinador extends Model
{
    use Auditable, HasFactory;

    protected $table = 'patrocinadores';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

}
