@component('mail::message')
# Nueva inscripción de equipo

Se ha registrado una nueva inscripción.

**Nombre del equipo:** {{ $equipo->nombre }}
**Centro:** {{ $equipo->centro->nombre ?? 'N/D' }}
**Entrenador propuesto:** {{ $equipo->usuario->name ?? 'N/D' }}
{{-- http://localhost:5173/?inscripcion-status=success --}}
@component('mail::button', ['url' => 'http://localhost:5173/administracion/inscripciones'])
Ver Inscripciones
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent
