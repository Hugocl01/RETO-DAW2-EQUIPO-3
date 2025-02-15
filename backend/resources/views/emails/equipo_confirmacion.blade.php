@component('mail::message')
# Confirmación de Inscripción

Hola,

Has sido asignado como **{{ $rol }}** en el equipo **"{{ $equipo->nombre }}"**.

### 📌 **Detalles del equipo:**
- **Nombre del equipo:** {{ $equipo->nombre }}
- **Centro:** {{ $equipo->centro->nombre ?? 'N/D' }}

### 🔹 **Confirma tu inscripción**
Por favor, confirma tu participación haciendo clic en el siguiente botón:

@component('mail::button', ['url' => url("/confirmarInscripcion/{$inscripcion}/{$rol}/{$token}")])
Confirmar Inscripción
@endcomponent

Gracias,
**{{ config('app.name') }}**
@endcomponent
