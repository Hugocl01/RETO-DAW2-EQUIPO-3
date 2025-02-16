const partidos = {
  fase_grupos: {
    grupo_A: [
      {
        id: "A1_A2", // ID único
        partido: "A1 vs A2",
        goles: [
          { equipo: "A1", goles: 2, minuto: [10, 30] },
          { equipo: "A2", goles: 1, minuto: [25] },
        ],
        tarjetas_amarillas: [
          { equipo: "A1", minuto: [15] },
          { equipo: "A2", minuto: [35, 45] },
        ],
        tarjetas_rojas: [{ equipo: "A1", minuto: [60] }],
      },
      {
        id: "A1_A3", // ID único
        partido: "A1 vs A3",
        goles: [
          { equipo: "A1", goles: 1, minuto: [5] },
          { equipo: "A3", goles: 1, minuto: [50] },
        ],
        tarjetas_amarillas: [
          { equipo: "A1", minuto: [20] },
          { equipo: "A3", minuto: [70] },
        ],
        tarjetas_rojas: [
          { equipo: "A1", minuto: [45] },
          { equipo: "A3", minuto: [85] },
        ],
      },
      {
        id: "A1_A4", // ID único
        partido: "A1 vs A4",
        goles: [
          { equipo: "A1", goles: 3, minuto: [10, 50, 70] },
          { equipo: "A4", goles: 0, minuto: [] },
        ],
        tarjetas_amarillas: [
          { equipo: "A1", minuto: [30] },
          { equipo: "A4", minuto: [25, 55] },
        ],
        tarjetas_rojas: [
          { equipo: "A1", minuto: [] },
          { equipo: "A4", minuto: [80] },
        ],
      },
      {
        id: "A1_A5", // ID único
        partido: "A1 vs A5",
        goles: [
          { equipo: "A1", goles: 0, minuto: [] },
          { equipo: "A5", goles: 0, minuto: [] },
        ],
        tarjetas_amarillas: [
          { equipo: "A1", minuto: [15] },
          { equipo: "A5", minuto: [40] },
        ],
        tarjetas_rojas: [
          { equipo: "A1", minuto: [] },
          { equipo: "A5", minuto: [] },
        ],
      },
      {
        id: "A2_A3", // ID único
        partido: "A2 vs A3",
        goles: [
          { equipo: "A2", goles: 2, minuto: [10, 60] },
          { equipo: "A3", goles: 2, minuto: [30, 85] },
        ],
        tarjetas_amarillas: [
          { equipo: "A2", minuto: [25, 55] },
          { equipo: "A3", minuto: [50] },
        ],
        tarjetas_rojas: [
          { equipo: "A2", minuto: [] },
          { equipo: "A3", minuto: [] },
        ],
      },
    ],
    grupo_B: [
      {
        id: "B1_B2", // ID único
        partido: "B1 vs B2",
        goles: [
          { equipo: "B1", goles: 3, minuto: [15, 40, 70] },
          { equipo: "B2", goles: 1, minuto: [50] },
        ],
        tarjetas_amarillas: [
          { equipo: "B1", minuto: [20] },
          { equipo: "B2", minuto: [45, 60] },
        ],
        tarjetas_rojas: [
          { equipo: "B1", minuto: [] },
          { equipo: "B2", minuto: [75] },
        ],
      },
      {
        id: "B1_B3", // ID único
        partido: "B1 vs B3",
        goles: [
          { equipo: "B1", goles: 2, minuto: [5, 65] },
          { equipo: "B3", goles: 2, minuto: [20, 80] },
        ],
        tarjetas_amarillas: [
          { equipo: "B1", minuto: [10] },
          { equipo: "B3", minuto: [40] },
        ],
        tarjetas_rojas: [
          { equipo: "B1", minuto: [] },
          { equipo: "B3", minuto: [50] },
        ],
      },
      {
        id: "B1_B4", // ID único
        partido: "B1 vs B4",
        goles: [
          { equipo: "B1", goles: 1, minuto: [25] },
          { equipo: "B4", goles: 0, minuto: [] },
        ],
        tarjetas_amarillas: [
          { equipo: "B1", minuto: [5] },
          { equipo: "B4", minuto: [10] },
        ],
        tarjetas_rojas: [
          { equipo: "B1", minuto: [] },
          { equipo: "B4", minuto: [70] },
        ],
      },
      {
        id: "B1_B5", // ID único
        partido: "B1 vs B5",
        goles: [
          { equipo: "B1", goles: 0, minuto: [] },
          { equipo: "B5", goles: 0, minuto: [] },
        ],
        tarjetas_amarillas: [
          { equipo: "B1", minuto: [15] },
          { equipo: "B5", minuto: [30] },
        ],
        tarjetas_rojas: [
          { equipo: "B1", minuto: [] },
          { equipo: "B5", minuto: [] },
        ],
      },
      {
        id: "B2_B3", // ID único
        partido: "B2 vs B3",
        goles: [
          { equipo: "B2", goles: 2, minuto: [20, 80] },
          { equipo: "B3", goles: 3, minuto: [30, 85] },
        ],
        tarjetas_amarillas: [
          { equipo: "B2", minuto: [25] },
          { equipo: "B3", minuto: [45] },
        ],
        tarjetas_rojas: [
          { equipo: "B2", minuto: [] },
          { equipo: "B3", minuto: [] },
        ],
      },
    ],
  },
  eliminatorias: {
    semifinales: [
      {
        id: "semifinal_1", // ID único
        partido: "1er Grupo A vs 2do Grupo B",
        goles: [
          { equipo: "A1", goles: 2, minuto: [15, 60] },
          { equipo: "B2", goles: 1, minuto: [50] },
        ],
        tarjetas_amarillas: [
          { equipo: "A1", minuto: [25] },
          { equipo: "B2", minuto: [35] },
        ],
        tarjetas_rojas: [
          { equipo: "A1", minuto: [] },
          { equipo: "B2", minuto: [70] },
        ],
      },
      {
        id: "semifinal_2", // ID único
        partido: "1er Grupo B vs 2do Grupo A",
        goles: [
          { equipo: "B1", goles: 1, minuto: [10] },
          { equipo: "A2", goles: 1, minuto: [30] },
        ],
        penales: { B1: 4, A2: 3 },
        tarjetas_amarillas: [
          { equipo: "B1", minuto: [25] },
          { equipo: "A2", minuto: [45] },
        ],
        tarjetas_rojas: [
          { equipo: "B1", minuto: [] },
          { equipo: "A2", minuto: [75] },
        ],
      },
    ],
    final: {
      id: "final", // ID único
      partido: "Ganador Semifinal 1 vs Ganador Semifinal 2",
      goles: [
        { equipo: "A1", goles: 3, minuto: [10, 60, 80] },
        { equipo: "B1", goles: 2, minuto: [30, 70] },
      ],
      tarjetas_amarillas: [
        { equipo: "A1", minuto: [20] },
        { equipo: "B1", minuto: [50] },
      ],
      tarjetas_rojas: [
        { equipo: "A1", minuto: [] },
        { equipo: "B1", minuto: [] },
      ],
    },
  },
};

export default partidos;
