
type Stadium = { name: string; address?: string; capacity?: string; source: string; sourceLabel: string };
// Fuentes independientes del domicilio de la sede: no se presume que sede y cancha coincidan.
export const stadiums: Record<string, Stadium> = {
  "san-lorenzo-f-b-c-esperanza": {
    name: "Delfo Yori", capacity: "5.000 espectadores (según el sitio del club)",
    source: "https://clubsanlorenzoesperanza.wordpress.com/estadio/", sourceLabel: "Sitio oficial de San Lorenzo F.B.C.",
  },
  "a-d-juventud-esperanza": {
    name: "Waldino Maradona", address: "Colón y Saavedra, Esperanza", capacity: "1.200 personas (referencia de 2018)",
    source: "https://www.estadiosdeargentina.com.ar/cancha-juventud-de-esperanza/", sourceLabel: "Estadios de Argentina · 2018",
  },
  "atl-juventud-unida-de-humboldt-humboldt": {
    name: "Batistín Salvetti", source: "https://lsf.ar/2026/02/16/guadalupe-y-ciclon-racing-perdieron-en-la-ida/", sourceLabel: "Liga Santafesina · 2026",
  },
  "sportivo-del-norte-f-b-c-esperanza": {
    name: "Ermelindo Oclides Dutruel", source: "https://esperanzadiaxdia.com.ar/deportes/sarmiento-de-humboldt-derroto-a-sportivo-por-2-a-0.htm/uid-81288", sourceLabel: "Esperanza día x día · 2013",
  },
  "central-san-carlos-san-carlos": {
    name: "Rogelio Fedele", source: "https://www.miradorprovincial.com/2025/06/06/central-san-carlos-dio-vuelta-la-serie-y-se-instalo-en-la-tercera-fase/", sourceLabel: "Mirador Provincial · 2025",
  },
};
