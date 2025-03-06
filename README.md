# RETO-DAW2-EQUIPO-3

Proyecto desarrollado como parte del reto de DAW2 por el **Equipo 3**, formado por:  
- **[Adrián](https://github.com/adriantresgallo)**  
- **[Diego](https://github.com/DiegoFerF)**  
- **[Eloy](https://github.com/4K4smol)**  
- **[Hugo](https://github.com/Hugocl01)**  
- **[Paula](https://github.com/paularivero22)**  

Este proyecto incluye un **frontend en React** y un **backend en Laravel**, diseñado para gestionar y organizar un **torneo de fútbol solidario** en colaboración con la [Cruz Roja de Torrelavega](https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional). El objetivo es facilitar la inscripción de equipos, la programación de partidos, la visualización de resultados y la recaudación de fondos para apoyar las iniciativas solidarias de la Cruz Roja.

---

## Instalación y Configuración

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v16 o superior) - Incluye `npm`, necesario para instalar dependencias de React.
- [Composer](https://getcomposer.org/) - Gestor de dependencias para PHP (Laravel).
- [PHP](https://www.php.net/) (v8.2.12 o superior) - Requerido para ejecutar Laravel.
- [Laravel](https://laravel.com/) (v11.31 o superior) - Framework de backend.
- [MySQL](https://www.mysql.com/) o cualquier otro sistema de base de datos compatible con Laravel.
- [React](https://es.react.dev/): No es necesario instalarlo manualmente. Las dependencias de React se instalarán automáticamente al ejecutar `npm install` en la carpeta del frontend.
---

### Clonar el Repositorio (SOLO UNA VEZ)
Para obtener el proyecto en tu máquina local, ejecuta:
```bash
git clone https://github.com/Hugocl01/RETO-DAW2-EQUIPO-3.git
```

## Instalar Dependencias

### Backend (Laravel)

1. Navega a la carpeta del backend:
    ```bash
    cd RETO-DAW2-EQUIPO-3/backend
    ```

2. Instala las dependencias de Laravel:
    ```bash
    composer install
    ```

3. Configura el archivo `.env` con tus credenciales de base de datos y otros ajustes necesarios, puedes copiar el `.env.example`.
   ```bash
    cp .env.example .env
    ```

4. Genera una nueva clave de aplicación:
    ```bash
    php artisan key:generate
    ```

5. Ejecuta las migraciones para crear las tablas de la base de datos y los seeders para completar la base de datos con datos de prueba:
    ```bash
    php artisan migrate:fresh --seed
    ```

6. Inicia el servidor de desarrollo de Laravel:
    ```bash
    php artisan serve
    ```

> Con todos estos pasos completados, el backend estará disponible en `http://localhost:8000`.

### Frontend (React)

1. Navega a la carpeta del frontend:
    ```bash
    cd RETO-DAW2-EQUIPO-3/frontend
    ```

2. Instala las dependencias de React:
    ```bash
    npm install
    ```

3. Configura el archivo `.env` con la URL del backend:
    ```bash
    VITE_API_URL=http://127.0.0.1:8000/api/
    ```

4. Configura el archivo `.env.production` con la URL del backend:
    ```bash
    VITE_API_URL=http://23.23.87.65/api/
    ```

5. Inicia el servidor de desarrollo de React:
    ```bash
    npm run dev
    ```

> Con todos estos pasos completados, el frontend estará disponible en el puerto que te indique React.

## Documentación del reto

[Documentación](Documentacion/Documentacion%20del%20Reto%20-%20Markdown/documentacionReto.md)

[Manual de usuario](Documentacion/Documentacion%20del%20Reto%20-%20Markdown/Manual%20de%20Usuario.pdf)

### Documentación del Código

#### Frontend (React)
Hemos generado documentación automática del código del frontend utilizando **JSDoc**. Esta documentación proporciona una descripción detallada de los componentes, funciones y props utilizados en el proyecto.

Documentacion: [Documentación del Frontend](https://hugocl01.github.io/RETO-DAW2-EQUIPO-3/global.html)