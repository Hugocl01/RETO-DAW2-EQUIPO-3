<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RetoSeeder extends Seeder
{
    public function run()
    {
        $retos = [
            [
                'titulo' => 'ENTRENADOR AUTOMATIZADO',
                'texto' => 'SE DISEÑARÁ UN SISTEMA DE ENTRENAMIENTO AUTOMATIZADO, EN EL QUE
                DIFERENTES TIPOS DE TRANSDUCTORES ENVIARÁN UNA SEÑAL, PARA QUE EL
                JUGADOR PUEDA PASAR AL SIGUIENTE EJERCICIO., CUANDO EL JUGADOR FINALICE
                EL ENTRENAMIENTO SE ACTIVARÁ UNA BALIZA Y SE INDICARÁN EN EL
                VISUALIZADOR LOS VALORES CONSEGUIDOS. PARA PODER REALIZARLO EL CONTROL
                DE LOS DATOS DADOS POR LOS SENSORES SE REALIZARÁ MEDIANTE UN AUTOMATA.',
                'estudio_id' => 1
            ],
            [
                'titulo' => 'MARCADOR DEPORTIVO 4.0',
                'texto' => 'Desarrollo técnico de un marcador deportivo con dispositivos e instrumentación de la
                tecnología Industria 4.0',
                'estudio_id' => 2
            ],
            [
                'titulo' => 'Monitorización cardiaca y aviso a emergencias',
                'texto' => 'El sistema mide el ritmo cardiaco de un jugador y si entraña riesgo para su salud envía un wasap
                al árbritro, al móvil o en su defecto a un Smartwatch, y a urgencias para que pare el juego y se
                actue en consecuencia, si en las gradas un espectador sufre un paro cardiaco, disponemos de un
                pulsador que también activa todo este protocolo de emergencia, cumpliendo con la nueva
                normativa en los estadios.',
                'estudio_id' => 3
            ],
            [
                'titulo' => 'Masaje deportivo',
                'texto' => 'El alumnado tiene que preparar una rutina de masajes deportivos, este alumnado lo
                implementará después de los entrenamientos y de los partidos para prevenir lesiones en los deportistas.',
                'estudio_id' => 4
            ],
            [
                'titulo' => 'Jabones solidarios',
                'texto' => 'El proyecto consiste en elaborar diferentes tipos de jabones en el laboratorio de cosmetología
                para poder venderlos y contribuir a la recaudación de fondos',
                'estudio_id' => 5
            ],
            [
                'titulo' => 'Tratamientos hidrotermales en el deporte',
                'texto' => 'En este reto se trabajará el RA6, y por tanto el alumnado aplicará técnicas hidroestéticas y
                    cosméticos termales, siguiendo un protocolo de ejecución previamente diseñado y basado en las
                    indicaciones de dichos tratamientos en deportistas.
                    Los componentes de los equipos del IES Zapatón, en grupos de 6 podrán acudir a realizarse
                    dichos tratamientos al aula de hidrotermales.',
                'estudio_id' => 6
            ],
            [
                'titulo' => 'Retransmisión televisiva del evento',
                'texto' => 'Los alumnos de 1º de VideoDJ darán cobertura televisiva del evento. Se realizará con 3
                    cámaras y se hará una retransmisión en directo por Youtube. Será una colaboración con los alumnos
                    del ciclo de SAE que se encargarán de la sonorización',
                'estudio_id' => 7
            ],
            [
                'titulo' => 'Sonorización del evento',
                'texto' => 'Los alumnos de 1º de SAE darán cobertura en materia de sonorización en el evento. Se
                    sonorizará el pabellón donde tengan lugar los partidos, y además se dará cobertura a los
                    alumnos del ciclo de VideoDJ que estarán haciendo una retransmisión en vídeo del evento que a
                    su vez se difundirá en directo a través del canal de Youtube.',
                'estudio_id' => 8
            ],
            [
                'titulo' => 'DESPLIEGUE DE RED PARA UN EVENTO DEPORTIVO',
                'texto' => 'En el pabellón de la Habana Vieja se desplegará una red local MESH para la conexión de los
                    dispositivos del evento. Esta red podrá ser utilizada por los aficionados, los participantes en los
                    retos e incluso para retransmitir los partidos en streaming. La red tendrá una salida dual
                    pudiendo conectarse a Internet a través de 5G o de la red del propio pabellón. Se configurará,
                    además, un equipo para la administración de dicha red.',
                'estudio_id' => 9
            ],[
                'titulo' => 'DISEÑO Y DESARROLLO WEB SEDE TORRELAVEGA',
                'texto' => 'Desarrollo de una página web con información relativa a la liga solidaria FP centrada en la sede
                    de Torrelavega. COMPLETAD VOSOTROS CON MÁS INFORMACIÓN,
                'estudio_id' => 10
            ],
            [
                'titulo' => 'DESPLIEGUE DE UN SERVIDOR DE VIRTUALIZACIÓN PARA EL ALOJAMIENTO DE LAS
                    PÁGINAS WEB DEL LA SEDE DEL TORNEO',
                'texto' => 'Se desplegará el hardware y software necesario para alojar los servicios web que se implanten
                    en los diferentes retos de la sede de Torrelavega. Se adquirirá y configurará para ello un
                    equipo con suficiente capacidad de cómputo y de almacenamiento para realizar las funciones de
                    servidor. Este equipamiento informático, cuya ubicación está por determinar, podrá ser
                    utilizado por los participantes de los retos de los tres centros',
                'estudio_id' => 11
            ],
            [
                'titulo' => 'EXHIBICIÓN DE UN VEHÍCULO INERCIAL PARA DESCENSOS',
                'texto' => 'Se llevará a cabo la construcción y diseño de un vehículo inercial, optimizado específicamente
                    para participar en competencias de descenso, destacándose por su rendimiento, innovación y
                    seguridad. Este vehículo, resultado de un proceso creativo y técnico, será exhibido y
                    presentado como pieza central durante la celebración del torneo, donde se destacará tanto su
                    diseño como su desempeño en condiciones reales de competencia',
                'estudio_id' => 12
            ],
            [
                'titulo' => 'GESTIÓN DE UNA EMPRESA DE EVENTOS DEPORTIVOS',
                'texto' => 'El reto que se llevará a cabo en gestión de empresa incluirá diversos aspectos clave
                    relacionados con la administración y promoción del torneo.
                    Por un lado, se realizará la gestión contable de la sociedad deportiva encargada de organizar el
                    torneo de fútbol solidario, lo que implica llevar a cabo tareas como el registro de ingresos y
                    gastos, análisis financiero, elaboración de presupuestos, y generación de reportes que reflejen
                    la viabilidad económica del evento. Por otro lado, se simularán las funciones propias de un
                    Community Manager, enfocándose en la creación de estrategias para la difusión del torneo en
                    redes sociales, la gestión de contenido atractivo y dinámico, la interacción con la comunidad
                    digital, y el fortalecimiento de la imagen del evento en plataformas en línea. Este reto busca
                    integrar conocimientos administrativos y de marketing digital para ofrecer una experiencia
                    práctica y completa.',
                'estudio_id' => 13
            ],
            [
                'titulo' => 'Reto Merchandising de la Liga',
                'texto' => 'Desde de la familia profesional de Textil, Confección y Piel el IES Besaya a través de su
                    ciclo Profesional Básico en Tapicería y Cortinaje ha diseñado el RETO de Merchadising.
                    Este RETO tiene la finalidad de diseñar y confeccionan productos de merchandising
                    como chapas, llaveros, gorras con los logos de la Liga, centros participantes y diseños
                    exclusivos para la venta y recaudación de fondos destinados a nuestra ONG. La venta se
                    realizará en el propio reciento del evento durante los días 12 y 13 de marzo. Para ello se
                    instalará una expositor tienda dentro del propio recinto.',
                'estudio_id' => 14
            ],
            [
                'titulo' => 'Reto FoodTruck',
                'texto' => 'Desde de la familia profesional de Hostelería y Turismo el IES Besaya a través de sus
                    ciclos Profesionales Básico en Cocina y Restauracion y Grado Medio en Servicios de
                    Restauracion han diseñado el RETO de Food truck. Este RETO tiene la finalidad de diseñar
                    y producir bebidas isotónicas y barritas energéticas para la venta y recaudación de
                    fondos destinados a nuestra ONG. La venta se realizará en el propio reciento del evento
                    durante los días 12 y 13 de marzo. Para ello se instalará una foodtruck en los aledaños
                    del recinto. ',
                'estudio_id' => 15
            ],
            [
                'titulo' => 'Reto Diseño de Logos, etiquetas, packering',
                'texto' => 'Desde de la familia profesional de Comercio y Marketing el IES Besaya a través de sus
                    ciclos Grado Medio en Comercialización de Productos Alimentarios y Grado Superior en
                    Transporte y Logística han diseñado el RETO de Logos, etiquetas, packering. Este RETO
                    tiene la finalidad de diseñar el logo de la Liga para la Sede de Torrelavega y las etiquetas
                    así como el packequing para los productos que se vendarán a través del RETO Foodtruck.',
                'estudio_id' => 16
            ],
            [
                'titulo' => 'Reto EXPO “BARRIOGRAFÍA DE LA INCLUSIÓN”',
                'texto' => 'Desde de la familia profesional de Servicios Socioculturales y a la Comunidad el IES
                    Besaya a través de su ciclo Grado Superior en Integración Social han diseñado la
                    exposición BARRIOGRAFÍA DE LA INCLUSIÓN. Esta exposición muestra como las cosas
                    que vemos cambian dependiendo de los ojos que usemos para verlas, del tiempo que
                    tomemos para observarlas y del lado de la calle donde nos situemos para hacerlo. Por
                    lo tanto, es una experiencia de intervención socioeducativa basada en una exposición
                    de fotografías realizadas por el alumnado de primer curso de integración social durante
                    una salida por los barrios de Torrelavega.',
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
