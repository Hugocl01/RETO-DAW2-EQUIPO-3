@component('mail::message')
# Nueva inscripción de equipo

Se ha registrado una nueva inscripción.

**Nombre del equipo:** {{ $equipo->nombre }}
**Centro:** {{ $equipo->centro->nombre ?? 'N/D' }}
**Entrenador propuesto:** {{ $equipo->usuario->name ?? 'N/D' }}
@component('mail::button', ['url' => 'http://23.23.87.65/administracion/inscripciones'])
Ver Inscripciones
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent
