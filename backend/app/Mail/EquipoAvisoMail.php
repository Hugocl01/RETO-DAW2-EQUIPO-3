<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Inscripcion;

class EquipoAvisoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $inscripcion;

    /**
     * Crea una nueva instancia del mailable.
     *
     * @param Inscripcion $inscripcion
     */
    public function __construct(Inscripcion $inscripcion)
    {
        $this->inscripcion = $inscripcion;
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
