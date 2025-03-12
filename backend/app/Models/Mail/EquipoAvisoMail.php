<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Inscripcion;

/**
 * @OA\Schema(
 *   schema="EquipoAvisoMail",
 *   type="object",
 *   required={"inscripcion", "nuevo_estado"},
 *   @OA\Property(property="inscripcion", type="object", ref="#/components/schemas/Inscripcion"),
 *   @OA\Property(property="nuevo_estado", type="string"),
 *   @OA\Property(property="token", type="string", nullable=true)
 * )
 */
class EquipoAvisoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $inscripcion;
    public $token;
    public $nuevo_estado;

    /**
     * Crea una nueva instancia del mailable.
     *
     * @param Inscripcion $inscripcion
     */
    public function __construct(Inscripcion $inscripcion, $nuevo_estado, $token = null)
    {
        $this->inscripcion = $inscripcion;
        $this->token = $token;
        $this->nuevo_estado = $nuevo_estado;
    }

    /**
     * Construye el mensaje de correo.
     */
    public function build()
    {
        return $this->subject('Inscripción Aprobada')
            ->markdown('emails.aviso_aprobacion');
    }
}
