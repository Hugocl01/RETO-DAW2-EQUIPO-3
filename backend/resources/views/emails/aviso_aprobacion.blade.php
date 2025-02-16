@component('mail::message')
# Aprobada inscripción de equipo

**Nombre del equipo:** {{ $inscripcion->equipo->nombre }}
**Centro:** {{ $inscripcion->equipo->centro->nombre ?? 'N/D' }}
@component('mail::button', ['url' => 'http://localhost:5173/equipos/' . $inscripcion->equipo->slug])
Su Equipo
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent
