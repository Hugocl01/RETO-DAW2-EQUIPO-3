<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\Auditable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @OA\Schema(
 *     schema="Usuario",
 *     type="object",
 *     title="Usuario",
 *     description="Modelo de usuario",
 *     required={"nombre_completo", "email", "perfil_id"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre_completo", type="string", example="Juan Pérez"),
 *     @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
 *     @OA\Property(property="perfil_id", type="integer", example=2)
 * )
 */
class Usuario extends Authenticatable
{
    use HasApiTokens, Auditable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre_completo',
        'email',
        'password',
        'perfil_id',
        'password',
    ];

    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'perfil_id');
    }

    public function equipo()
    {
        return $this->hasOne(Equipo::class, 'usuario_id', 'id');
    }
}
