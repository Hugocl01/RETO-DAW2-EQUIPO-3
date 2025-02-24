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
        return $this->belongsToMany(Seccion::class, 'perfil_seccion_accion', 'perfil_id', 'seccion_id')
                    ->with('acciones') // Cargar también las acciones
                    ->distinct(); // Evita duplicados
    }

    public function acciones()
    {
        return $this->belongsToMany(Accion::class, 'perfil_seccion_accion')
            ->withPivot('seccion_id')
            ->withTimestamps();
    }

    public static function getLista()
    {
        return self::pluck('tipo', 'id');
    }
}
