<?php
namespace App\Enums;

enum TipoPartido: string {
    case Clasificatorio = 'clasificatorio';
    case Semifinal = 'semifinal';
    case Final = 'final';
}
