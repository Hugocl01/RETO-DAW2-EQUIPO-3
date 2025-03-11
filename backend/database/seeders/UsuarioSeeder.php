<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([
            'nombre_completo' => 'Carmen Iza',
            'email' => 'ciza01@educantabria.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 1,
        ]);

        Usuario::create([
            'nombre_completo' => 'Lorenzo Arce',
            'email' => 'larceg03@educantabria.es',
            'password' => bcrypt('lorenzo2025.'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
// los entrenadores son
//miguel herrero
        Usuario::create([
            'nombre_completo' => 'Agustin Rodriguez',
            'email' => 'agustin@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);

        Usuario::create([
            'nombre_completo' => 'Bibiana Rey',
            'email' => 'bibiana@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);

        Usuario::create([
            'nombre_completo' => 'Jose Fernando Fernández González',
            'email' => 'JoseFernando@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2, // !IMPORTANTE es el tipo de usuario para que sea entrenador = 2
        ]);
//zapaton
        Usuario::create([
            'nombre_completo' => 'Miguel Ángel Romano Bedia',
            'email' => 'MiguelAngel@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);

        Usuario::create([
            'nombre_completo' => 'Cristina Gutiérrez Castañeda',
            'email' => 'CristinaGuti@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
        Usuario::create([
            'nombre_completo' => 'Alejandro Ulises Arce Monteserín',
            'email' => 'AlejandroUlises@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
        //besaya
        Usuario::create([
            'nombre_completo' => 'Ramón Castillo Noriega',
            'email' => 'besaya1@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
        Usuario::create([
            'nombre_completo' => 'Rubén Martín Ojeda',
            'email' => 'besaya2@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
        Usuario::create([
            'nombre_completo' => 'Xabier Rodriguez Navas',
            'email' => 'besaya3@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
        //olimpico
        Usuario::create([
            'nombre_completo' => 'Jose Manuel Rodríguez Goñi',
            'email' => 'besaya4@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
    }
}
