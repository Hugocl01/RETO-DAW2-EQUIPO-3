<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Equipo;

class EquipoInscripcionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $equipo;

    /**
     * Crea una nueva instancia del mailable.
     *
     * @param Equipo $equipo
     */
    public function __construct(Equipo $equipo)
    {
        $this->equipo = $equipo;
    }

    /**
     * Construye el mensaje de correo.
     */
    public function build()
    {
        return $this->subject('Nueva inscripción de equipo')
                    ->markdown('emails.inscripcion_equipo');
    }
}
