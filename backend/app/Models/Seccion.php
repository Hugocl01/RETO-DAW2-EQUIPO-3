<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;


/**
 * @OA\Schema(
 *     schema="Seccion",
 *     type="object",
 *     title="Seccion",
 *     required={"nombre","familia_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la seccion",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre de la seccion",
 *         example="Equipos"
 *     ),
 *     @OA\Property(
 *         property="descripcion",
 *         type="string",
 *         description="Descripcion de lo que representa la seccion",
 *         example="Gestión de los equipos participantes en el torneo."
 *     )
 * )
 */
class Seccion extends Model
{
    use Auditable;

    protected $table = 'secciones';

    // Asegura que los campos que pueden ser asignados masivamente están definidos
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    /**
     * Relación con perfiles (muchos a muchos)
     */
    public function perfiles()
    {
        return $this->belongsToMany(Perfil::class, 'perfiles_secciones');
    }

    public function acciones()
    {
        return $this->hasMany(Accion::class);
    }

}
