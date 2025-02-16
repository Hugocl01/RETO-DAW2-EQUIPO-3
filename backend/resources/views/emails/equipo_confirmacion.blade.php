@component('mail::message')
# Confirmación de Inscripción

Te han asignado al equipo **"{{ $equipo->nombre }}"**.

### 📌 **Detalles del equipo:**
- **Nombre del equipo:** {{ $equipo->nombre }}
- **Centro:** {{ $equipo->centro->nombre ?? 'N/D' }}
- **Rol:** {{ $rol }}

### 🔹 **Confirma tu inscripción**
Por favor, confirma tu participación en el equipo haciendo clic en el botón de abajo:

@component('mail::button', ['url' => url("/api/confirmarInscripcion/{$inscripcion->id}/{$rol}/{$token}")])
Confirmar Inscripción
@endcomponent

Gracias,
**{{ config('app.name') }}**
@endcomponent
