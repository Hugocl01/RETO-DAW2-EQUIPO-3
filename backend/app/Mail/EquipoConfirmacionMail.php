<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EquipoConfirmacionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $equipo;
    public $inscripcion;
    public $rol;
    public $token;
    public $email;

    public function __construct($equipo, $rol, $token, $email)
    {
        $this->equipo = $equipo;
        $this->inscripcion = $equipo->inscripcion;
        $this->rol = $rol;
        $this->token = $token;
        $this->email = $email;
    }

    public function build()
    {
        return $this
            ->subject('Confirma tu inscripción en el equipo')
            ->markdown('emails.equipo_confirmacion') // la vista Blade personalizada
            ->with([
                'equipo'       => $this->equipo,
                'inscripcion'  => $this->inscripcion,
                'rol'          => $this->rol,
                'token'        => $this->token,
                'email'        => $this->email,
            ]);
    }

}
