<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * OA\Schema(
 *     schema="Ong",
 *     type="object",
 *     title="Ong",
 *     required={"nombre","landing_page"},
 *     OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la ong",
 *         example=1
 *     ),
 *     OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre de la ong",
 *         example="Centro de Salud A"
 *     ),
 *     OA\Property(
 *         property="landing_page",
 *         type="string",
 *         description="URL de la página de aterrizaje de la ong",
 *         example="https://centrosaluda.com"
 *     )
 * )
 */
class Ong extends Model
{
    use Auditable;

    protected $table = 'ongs';

    protected $fillable = [
        'nombre',
        'landing_page',
    ];

    public function donacion()
    {
        return $this->hasMany(Donacion::class);
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }
}
