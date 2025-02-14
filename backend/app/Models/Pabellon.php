<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Pabellon extends Model
{
    use Auditable, HasFactory;

    protected $table = 'pabellones';

    protected $fillable = [
        'nombre',
        'direccion',
    ];
}
