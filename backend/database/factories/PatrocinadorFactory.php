<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Patrocinador;

class PatrocinadorFactory extends Factory
{
    protected $model = Patrocinador::class;

    public function definition()
    {
        $nombre = $this->generarString(45);  // Generar nombre de máximo 45 caracteres
        $landingPage = $this->generarURL(45);  // Generar URL de máximo 45 caracteres

        return [
            'nombre' => $nombre,
            'landing_page' => $landingPage,
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

    /**
     * Genera una URL que no supere un número de caracteres determinado.
     * 
     * @param int $maxLength
     * @return string
     */
    private function generarURL(int $maxLength)
    {
        $protocol = "https://";
        $domain = $this->faker->domainName(); 
        $path = $this->faker->slug();

        $baseUrl = $protocol . $domain . '/' . $path;  // Formar la URL completa

        // Si la URL generada supera el límite de caracteres, recortarla
        if (strlen($baseUrl) > $maxLength) {
            $remainingLength = $maxLength - strlen($protocol) - 8;  // Resta la longitud del protocolo y "https://"
            $domain = substr($domain, 0, $remainingLength);
            $baseUrl = $protocol . $domain . '/' . $path;
        }

        return substr($baseUrl, 0, $maxLength);  
    }
}

