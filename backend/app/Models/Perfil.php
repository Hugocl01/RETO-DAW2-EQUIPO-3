<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;


/**
 * @OA\Schema(
 *     schema="Perfil",
 *     type="object",
 *     title="Perfil",
 *     required={"tipo"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del perfil",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="tipo",
 *         type="string",
 *         description="Nombre del tipo de usuario",
 *         example="administrador"
 *     )
 * )
 */
class Perfil extends Model
{
    use Auditable;

    protected $table = 'perfiles';

    protected $fillable = [
        'tipo',
    ];

    public function usuarios()
    {
        return $this->HasMany(Usuario::class, 'perfil_id');
    }

    /**
     * Relación con secciones (muchos a muchos)
     */
    public function secciones()
    {
        return $this->belongsToMany(Seccion::class, 'perfiles_secciones', 'perfil_id', 'seccion_id');
    }
}
