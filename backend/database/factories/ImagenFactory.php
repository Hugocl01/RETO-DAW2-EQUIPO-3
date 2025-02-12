<?php

namespace Database\Factories;

use App\Models\Imagen;
use App\Models\Equipo;
use App\Models\Partido;
use App\Models\Patrocinador;
use App\Models\Jugador;
use App\Models\Reto;
use App\Models\Ong;
use App\Models\Pabellon;
use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImagenFactory extends Factory
{
    protected $model = Imagen::class;

    
    public function definition()
    {
        $ruta = $this->generarString(45);
        return [
            'ruta' => $ruta,
            'nombre' => $this->faker->word,  
            'tipo_entidad' => $this->faker->randomElement(['equipo', 'partido', 'jugador', 'reto', 'ong', 'pabellon']),
            'equipo_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(), 
            'partido_id' => Partido::inRandomOrder()->first()->id ?? Partido::factory(),  
            'patrocinador_id' => Patrocinador::inRandomOrder()->first()->id ?? Patrocinador::factory(),  
            'jugador_id' => Jugador::inRandomOrder()->first()->id ?? Jugador::factory(),  
            'reto_id' => Reto::inRandomOrder()->first()->id ?? Reto::factory(), 
            'ong_id' => Ong::inRandomOrder()->first()->id ?? Ong::factory(),
            'publicacion_id' => Publicacion::inRandomOrder()->first()->id ?? Publicacion::factory(),
            'pabellon_id' => Pabellon::inRandomOrder()->first()->id ?? Pabellon::factory(), 
            'usuario_creador_id' => 1
        ];
    }
    /**
     * Genera una cadena de palabras que no supere un número de caracteres determinado.
     * 
     * @param int $maxLength
     * @return string
     */
    private function generarString(int $maxLength)
    {
        $words = [];
        $currentLength = 0;

        while ($currentLength < $maxLength) {
            $word = $this->faker->word;
            $newLength = $currentLength + strlen($word) + (count($words) > 0 ? 1 : 0);

            if ($newLength <= $maxLength) {
                $words[] = $word;
                $currentLength = $newLength;
            } else {
                break;
            }
        }

        return implode(' ', $words);
    }
}
