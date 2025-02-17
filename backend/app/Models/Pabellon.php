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

    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }
}
