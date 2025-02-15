@component('mail::message')
# Nueva inscripción de equipo

Se ha registrado una nueva inscripción.

**Nombre del equipo:** {{ $equipo->nombre }}
**Centro:** {{ $equipo->centro->nombre ?? 'N/D' }}
**Entrenador propuesto:** {{ $equipo->usuario->name ?? 'N/D' }}

@component('mail::button', ['url' => url('/administracion')])
Ver Inscripciones
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent
