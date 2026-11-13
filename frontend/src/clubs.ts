export const clubsSource = "https://ligaesperancina.com/clubes/";

export type Club = { name: string; locality: string; address: string; phone: string; id: string; logo: string };

// Directorio oficial consultado el 13/11/2026. No indica participación por división.
const directory = [
  { name: "A.D. Juventud", locality: "Esperanza", address: "Moreno 3009", phone: "3496 514311" },
  { name: "SyD Alumni", locality: "Laguna Paiva", address: "Moreno 1227", phone: "342 4220674" },
  { name: "Atl. Juventud Unida de Humboldt", locality: "Humboldt", address: "B. Salvetti 2164", phone: "3496 480205" },
  { name: "Sportivo del Norte F.B.C.", locality: "Esperanza", address: "Rivadavia 3590", phone: "3496 418369" },
  { name: "Atl. Boca", locality: "Nelson", address: "J. M. Aragón 165", phone: "342 5212139" },
  { name: "A. y S. San Martín", locality: "Progreso", address: "San Martín 117", phone: "3496 549374" },
  { name: "Atl. Sarmiento", locality: "Humboldt", address: "25 de Mayo 1585", phone: "3496 480215" },
  { name: "San Lorenzo F.B.C.", locality: "Esperanza", address: "Av. Colonizadores 650", phone: "3496 548729" },
  { name: "Tiro Federal Argentino", locality: "Felicia", address: "Zona sub urbana Este", phone: "3496 461230" },
  { name: "D.F. Sarmiento", locality: "Sarmiento", address: "Córdoba 1098", phone: "3492 312122" },
  { name: "Atl. Juventud", locality: "Laguna Paiva", address: "Rep. de Italia 2402", phone: "342 6128964" },
  { name: "C.R. y D. Elisa", locality: "Elisa", address: "Bv. San Francisco 202", phone: "3498 458830" },
  { name: "F.B.C. Libertad", locality: "Nelson", address: "25 de Mayo 663", phone: "" },
  { name: "C.C.R. y D. Unión", locality: "Santo Domingo", address: "25 de Mayo 351", phone: "3497 498104" },
  { name: "Esperanza F.C.", locality: "Esperanza", address: "Balcarce 2820", phone: "3496 651975" },
  { name: "Atl. Pilar", locality: "Pilar", address: "Moreno 1583", phone: "3404 470048" },
  { name: "Dep. Unión Progresista", locality: "San Carlos Sud", address: "9 de julio 519", phone: "3404 524602" },
  { name: "Atl. Defensores", locality: "Esperanza", address: "Hohenfels 1781", phone: "3496 465189" },
  { name: "Central San Carlos", locality: "San Carlos", address: "25 de mayo 376", phone: "3404 420172" },
  { name: "Atl. Argentino", locality: "López", address: "Entre Ríos 1624", phone: "3404 630409" },
  { name: "Atl. Franck", locality: "Franck", address: "Gob. Galvez 2268", phone: "342 5699412" },
  { name: "Santa Clara F.B.C.", locality: "Sta. Clara Buena Vista", address: "C. Domínguez 984", phone: "3404 493109" },
  { name: "Atl. Independiente", locality: "San Agustín", address: "B. López 1198", phone: "342 5474047" },
  { name: "Atl. Libertad", locality: "San Jerónimo Norte", address: "Moreno 1150", phone: "3404 460190" },
  { name: "Atl. Belgrano", locality: "Sa Pereira", address: "San Lorenzo 198", phone: "3404 494003" },
  { name: "Atl. Argentino", locality: "San Carlos Centro", address: "Belgrano 466", phone: "3404 421156" },
  { name: "SyD Argentino", locality: "Franck", address: "Moreno 2300", phone: "342 4930002" },
  { name: "Atl. Unión", locality: "Esperanza", address: "A. Janssen 1585", phone: "3496 567252" },
  { name: "Bme. Mitre", locality: "Esperanza", address: "Moreno y Soler", phone: "3496 563270" },
  { name: "Crecer F.C.", locality: "Santo Tomé", address: "", phone: "" },
];

const logoFiles = ["club-01.png", "club-02.png", "club-03.png", "club-04.png", "club-05.png", "club-06.png", "club-07.png", "club-08.webp", "club-09.png", "club-10.png", "club-11.png", "club-12.png", "club-13.png", "club-14.png", "club-15.png", "club-16.png", "club-17.webp", "club-18.png", "club-19.png", "club-20.png", "club-21.png", "club-22.webp", "club-23.png", "club-24.png", "club-25.png", "club-26.png", "club-27.png", "club-28.png", "club-29.webp", "club-30.webp"] as const;
export const clubs: Club[] = directory.map((club, index) => ({
  ...club,
  id: `${club.name}-${club.locality}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
  logo: `/clubs/${logoFiles[index]}`,
}));
