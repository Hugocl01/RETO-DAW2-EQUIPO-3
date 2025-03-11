<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RetoSeeder extends Seeder
{
    public function run()
    {
        // La forma en la que pongas el texto aquí se mostrará en la pantalla principal
        // Es recomendable poner el texto en una línea
        $retos = [
            [
                'titulo' => 'Entrenador automatizado',
                'texto' => 'Se diseñará un sistema de entrenamiento automatizado, en el que diferentes tipos de transductores enviarán una señal, para que el jugador pueda pasar al siguiente ejercicio. Cuando el jugador finalice el entrenamiento, se activará una baliza y se indicarán en el visualizador los valores conseguidos. Para poder realizarlo, el control de los datos dados por los sensores se realizará mediante un autómata.',
                'estudio_id' => 1 //ID del estudio relacionado con el reto
            ],
            [
                'titulo' => 'Marcador deportivo 4.0',
                'texto' => 'Desarrollo técnico de un marcador deportivo con dispositivos e instrumentación de la tecnología Industria 4.0.',
                'estudio_id' => 2
            ],
            [
                'titulo' => 'Monitorización cardiaca y aviso a emergencias',
                'texto' => 'El sistema mide el ritmo cardíaco de un juççgador y, si entraña riesgo para su salud, envía un WhatsApp al árbitro, al móvil o, en su defecto, a un smartwatch, y a urgencias para que pare el juego y se actúe en consecuencia. Si en las gradas un espectador sufre un paro cardíaco, disponemos de un pulsador que también activa todo este protocolo de emergencia, cumpliendo con la nueva normativa en los estadios.',
                'estudio_id' => 3
            ],
            [
                'titulo' => 'Masaje deportivo',
                'texto' => 'El alumnado tiene que preparar una rutina de masajes deportivos. Este alumnado lo implementará después de los entrenamientos y de los partidos para prevenir lesiones en los deportistas.',
                'estudio_id' => 4
            ],
            [
                'titulo' => 'Jabones solidarios',
                'texto' => 'El proyecto consiste en elaborar diferentes tipos de jabones en el laboratorio de cosmetología para poder venderlos y contribuir a la recaudación de fondos.',
                'estudio_id' => 5
            ],
            [
                'titulo' => 'Tratamientos hidrotermales en el deporte',
                'texto' => 'En este reto se trabajará el RA6, y por tanto el alumnado aplicará técnicas hidroestéticas y cosméticos termales, siguiendo un protocolo de ejecución previamente diseñado y basado en las indicaciones de dichos tratamientos en deportistas. Los componentes de los equipos del IES Zapatón, en grupos de 6, podrán acudir a realizarse dichos tratamientos al aula de hidrotermales.',
                'estudio_id' => 6
            ],
            [
                'titulo' => 'Retransmisión televisiva del evento',
                'texto' => 'Los alumnos de 1º de VideoDJ darán cobertura televisiva del evento. Se realizará con 3 cámaras y se hará una retransmisión en directo por YouTube. Será una colaboración con los alumnos del ciclo de SAE, que se encargarán de la sonorización.',
                'estudio_id' => 7
            ],
            [
                'titulo' => 'Sonorización del evento',
                'texto' => 'Los alumnos de 1º de SAE darán cobertura en materia de sonorización en el evento. Se sonorizará el pabellón donde tengan lugar los partidos y, además, se dará cobertura a los alumnos del ciclo de VideoDJ, que estarán haciendo una retransmisión en vídeo del evento que, a su vez, se difundirá en directo a través del canal de YouTube.',
                'estudio_id' => 8
            ],
            [
                'titulo' => 'Despliegue de red para un evento deportivo',
                'texto' => 'En el pabellón de La Habana Vieja se desplegará una red local MESH para la conexión de los dispositivos del evento. Esta red podrá ser utilizada por los aficionados, los participantes en los retos e incluso para retransmitir los partidos en streaming. La red tendrá una salida dual, pudiendo conectarse a Internet a través de 5G o de la red del propio pabellón. Se configurará, además, un equipo para la administración de dicha red.',
                'estudio_id' => 9
            ],
            [
                'titulo' => 'Diseño y desarrollo web sede Torrelavega',
                'texto' => 'El alumnado de segundo curso del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web del IES Miguel Herrero ha llevado a cabo el desarrollo de la página web oficial de la Liga Solidaria de FP. Este proyecto ha supuesto un reto real en el que los estudiantes han aplicado sus conocimientos en diseño y desarrollo web para crear una plataforma funcional y atractiva que servirá como punto central de información y gestión del torneo. Este desafío no solo ha permitido a los alumnos consolidar los conocimientos adquiridos, dividiendo sus tareas entre servidor y cliente. En la parte del servidor, se ha desarrollado la lógica de negocio y el acceso a datos. Y, en la parte cliente, se han centrado en el diseño y desarrollo de la interfaz de usuario, creando una experiencia visual atractiva e intuitiva mediante tecnologías web reactivas, junto con el uso de herramientas demandadas por el entorno profesional. Todo lo anterior ha tenido en cuenta los conocimientos demandados por el entorno profesional de la región. La web final es el resultado de la combinación de las mejores propuestas presentadas por los equipos de trabajo, asegurando un producto de calidad y alineado con los objetivos de la Liga Solidaria de FP. Con esta iniciativa, el IES Miguel Herrero refuerza su apuesta por el aprendizaje basado en proyectos y la formación práctica de su alumnado, preparando a los futuros profesionales del desarrollo web para los retos del mundo laboral.',
                'estudio_id' => 10
            ],
            [
                'titulo' => 'Despliegue de un servidor de virtualización para el alojamiento de las páginas web de la sede del torneo',
                'texto' => 'Se desplegará el hardware y software necesario para alojar los servicios web que se implanten en los diferentes retos de la sede de Torrelavega. Se adquirirá y configurará para ello un equipo con suficiente capacidad de cómputo y de almacenamiento para realizar las funciones de servidor. Este equipamiento informático, cuya ubicación está por determinar, podrá ser utilizado por los participantes de los retos de los tres centros.',
                'estudio_id' => 11
            ],
            [
                'titulo' => 'Exhibición de un vehículo inercial para descensos',
                'texto' => 'Se llevará a cabo la construcción y diseño de un vehículo inercial, optimizado específicamente para participar en competencias de descenso, destacándose por su rendimiento, innovación y seguridad. Este vehículo, resultado de un proceso creativo y técnico, será exhibido y presentado como pieza central durante la celebración del torneo, donde se destacará tanto su diseño como su desempeño en condiciones reales de competencia.',
                'estudio_id' => 12
            ],
            [
                'titulo' => 'Gestión de una empresa de eventos deportivos',
                'texto' => 'El reto que se llevará a cabo en gestión de empresa incluirá diversos aspectos clave relacionados con la administración y promoción del torneo. Por un lado, se realizará la gestión contable de la sociedad deportiva encargada de organizar el torneo de fútbol solidario, lo que implica llevar a cabo tareas como el registro de ingresos y gastos, análisis financiero, elaboración de presupuestos y generación de reportes que reflejen la viabilidad económica del evento. Por otro lado, se simularán las funciones propias de un Community Manager, enfocándose en la creación de estrategias para la difusión del torneo en redes sociales, la gestión de contenido atractivo y dinámico, la interacción con la comunidad digital y el fortalecimiento de la imagen del evento en plataformas en línea. Este reto busca integrar conocimientos administrativos y de marketing digital para ofrecer una experiencia práctica y completa.',
                'estudio_id' => 13
            ],
            [
                'titulo' => 'Merchandising de la liga',
                'texto' => 'Desde la familia profesional de Textil, Confección y Piel, el IES Besaya, a través de su ciclo Profesional Básico en Tapicería y Cortinaje, ha diseñado el reto de Merchandising. Este reto tiene la finalidad de diseñar y confeccionar productos de merchandising, como chapas, llaveros y gorras con los logos de la Liga, centros participantes y diseños exclusivos para la venta y recaudación de fondos destinados a nuestra ONG. La venta se realizará en el propio recinto del evento durante los días 12 y 13 de marzo. Para ello, se instalará un expositor-tienda dentro del propio recinto.',
                'estudio_id' => 14
            ],
            [
                'titulo' => 'Food truck',
                'texto' => 'Desde la familia profesional de Hostelería y Turismo, el IES Besaya, a través de sus ciclos Profesionales Básico en Cocina y Restauración y Grado Medio en Servicios de Restauración, han diseñado el reto de Food Truck. Este reto tiene la finalidad de diseñar y producir bebidas isotónicas y barritas energéticas para la venta y recaudación de fondos destinados a nuestra ONG. La venta se realizará en el propio recinto del evento durante los días 12 y 13 de marzo. Para ello, se instalará una food truck en los aledaños del recinto.',
                'estudio_id' => 15
            ],
            [
                'titulo' => 'Diseño de logos, etiquetas y packaging',
                'texto' => 'Desde la familia profesional de Comercio y Marketing, el IES Besaya, a través de sus ciclos Grado Medio en Comercialización de Productos Alimentarios y Grado Superior en Transporte y Logística, han diseñado el reto de Logos, Etiquetas y Packaging. Este reto tiene la finalidad de diseñar el logo de la Liga para la sede de Torrelavega y las etiquetas, así como el packaging para los productos que se venderán a través del reto Food Truck.',
                'estudio_id' => 16
            ],
            [
                'titulo' => 'Expo “Barriografía de la inclusión”',
                'texto' => 'Desde la familia profesional de Servicios Socioculturales y a la Comunidad, el IES Besaya, a través de su ciclo Grado Superior en Integración Social, ha diseñado la exposición "Barriografía de la Inclusión". Esta exposición muestra cómo las cosas que vemos cambian dependiendo de los ojos que usemos para verlas, del tiempo que tomemos para observarlas y del lado de la calle donde nos situemos para hacerlo. Por lo tanto, es una experiencia de intervención socioeducativa basada en una exposición de fotografías realizadas por el alumnado de primer curso de Integración Social durante una salida por los barrios de Torrelavega.',
                'estudio_id' => 17
            ],
        ];

        foreach ($retos as $reto) {
            DB::table('retos')->insert([
                'titulo' => $reto['titulo'],
                'texto' => $reto['texto'],
                'estudio_id' => $reto['estudio_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
