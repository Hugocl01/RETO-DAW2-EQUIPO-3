<?php

namespace Database\Factories;

use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Partido;
use App\Models\Reto;
use App\Models\Ong;
use App\Models\Pabellon;

class PublicacionFactory extends Factory
{
    protected $model = Publicacion::class;

    public function definition()
    {
        // Elige al azar uno de los modelos que pueden tener publicaciones
        $tipos = [
            Equipo::class,
            Partido::class,
            Reto::class,
        ];

        $modeloElegido = $this->faker->randomElement($tipos);

        // Tomamos un registro aleatorio de ese modelo o creamos uno si no hay
        $modeloId = $modeloElegido::inRandomOrder()->value('id');

        return [
            'titulo'               => $this->faker->sentence(),
            'contenido'            => $this->faker->paragraph(),
            // Campos polimórficos
            'publicacionable_id'   => $modeloId,
            'publicacionable_type' => $modeloElegido,

            // Video/audio opcionales
            'ruta_video' => $this->faker->boolean(50)
                ? $this->faker->url
                : null,
            'ruta_audio' => $this->faker->boolean(30)
                ? $this->faker->url
                : null,

            // Portada puede ser true/false
            'portada' => $this->faker->boolean(),

            // Auditoría (ajusta a tus necesidades)
            'usuario_creador_id'    => 1,
            'fecha_creacion'         => now(),
            'usuario_modificador_id' => null,
            'fecha_modificacion'      => null,
        ];
    }
}
