@component('mail::message')
# Aprobada inscripción de equipo

**Nombre del equipo:** {{ $inscripcion->equipo->nombre }}
**Centro:** {{ $inscripcion->equipo->centro->nombre ?? 'N/D' }}

@if ($token)
### 🔑 **Establece tu contraseña**
Tu cuenta ha sido creada, pero necesitas establecer una contraseña. Haz clic en el botón de abajo para hacerlo:

@component('mail::button', ['url' => 'http://localhost:5173/set-password/' . $inscripcion->equipo->usuario->id.'/'.$token])
Establecer Contraseña
@endcomponent

@else
@component('mail::button', ['url' => 'http://localhost:5173/equipos/' . $inscripcion->equipo->slug])
Ver Equipo
@endcomponent
@endif

Gracias,
**{{ config('app.name') }}**
@endcomponent
