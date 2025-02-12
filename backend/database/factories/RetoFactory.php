<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Reto;
use App\Models\Estudio;
use App\Models\User;

class RetoFactory extends Factory
{
    protected $model = Reto::class;

    public function definition()
    {
        $titulo = $this->generarString(45);  // Generar nombre de máximo 45 caracteres

        return [
            'titulo' =>$titulo, 
            'texto' => $this->faker->paragraph(3),
            'estudio_id' => Estudio::inRandomOrder()->first()->id ?? Estudio::factory(),
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

        // Generar palabras hasta que la longitud total no supere el máximo
        while ($currentLength < $maxLength) {
            $word = $this->faker->word;
            $newLength = $currentLength + strlen($word) + (count($words) > 0 ? 1 : 0);  // +1 por el espacio entre palabras

            if ($newLength <= $maxLength) {
                $words[] = $word;  
                $currentLength = $newLength;
            } else {
                break;  // Si añadir la palabra excede el límite, salir del bucle
            }
        }

        return implode(' ', $words);
    }
}
