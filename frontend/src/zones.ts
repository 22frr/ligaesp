import { clubs } from "./clubs";

// Composición transcripta de las dos imágenes aportadas por el usuario.
// Los resultados del torneo de trabajo siguen siendo ficticios e interzonales.
const north = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13];
const south = [15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28];
export const clubZones = [
  { label: "Zona Norte", clubIds: north.map((index) => clubs[index].id) },
  { label: "Zona Sur", clubIds: south.map((index) => clubs[index].id) },
  { label: "Sin zona asignada", clubIds: clubs.filter((_, index) => !north.includes(index) && !south.includes(index)).map((club) => club.id) },
];
