import type { Match } from "./data";
import { clubs } from "./clubs";
import { clubZones } from "./zones";
import { clubTeamName } from "./demoTournament";

type Zone = "north" | "south";
// Participaciones demo por competición y división, no una propiedad fija del club.
// La temporada de esta muestra es 2026; no hay persistencia ni asignación oficial.
export const demoZoneEntries: Record<string, Record<string, Zone>> = Object.fromEntries(
  ["TorneoDemo", "Quinta"].map((division) => [division, Object.fromEntries(
    clubZones.slice(0, 2).flatMap((zone, index) => zone.clubIds.map((id) => [id, index === 0 ? "north" : "south"])),
  )]),
);

export function groupFixtureByZone(matches: Match[], division: string) {
  const entries = demoZoneEntries[division] ?? {};
  const groups = [
    { id: "north", label: "Zona Norte", matches: [] as Match[] },
    { id: "south", label: "Zona Sur", matches: [] as Match[] },
    { id: "interzonal", label: "Interzonales", matches: [] as Match[] },
    { id: "unassigned", label: "Sin zona asignada", matches: [] as Match[] },
  ];
  for (const match of matches) {
    const home = entries[match.homeClubId ?? ""];
    const away = entries[match.awayClubId ?? ""];
    const id = !home || !away ? "unassigned" : home === away ? home : "interzonal";
    groups.find((group) => group.id === id)!.matches.push(match);
  }
  return groups.filter((group) => group.id === "north" || group.id === "south" || group.matches.length > 0);
}

// Una fecha ficticia de Quinta para revisar las tres secciones sin alterar el torneo existente.
export const quintaDemoMatches: Match[] = [[0, 1], [15, 16], [2, 17]].map(([homeIndex, awayIndex], index) => {
  const home = clubs[homeIndex];
  const away = clubs[awayIndex];
  return {
    id: 2000 + index, category: "Quinta", round: 1,
    homeClubId: home.id, awayClubId: away.id, home: clubTeamName(home), away: clubTeamName(away),
    homeGoals: null, awayGoals: null, status: "Programado", time: "16:00", updated: "2026-11-13T12:00:00-03:00",
  };
});
