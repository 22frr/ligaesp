import { clubs, type Club } from "./clubs";
import type { Match } from "./data";

export const demoTournament = { id: "TorneoDemo", label: "Copa de ejemplo", detail: "30 clubes · Torneo ficticio", code: "DE" };
export const clubTeamName = (club: Club) => `${club.name} (${club.locality})`;
export const roundDate = (round: number) => {
  const date = new Date("2026-11-08T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + (round - 1) * 7);
  return date.toISOString().slice(0, 10);
};
export const roundLabel = (round: number) => new Intl.DateTimeFormat("es-AR", {
  day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(`${roundDate(round)}T12:00:00Z`));

export function createDemoTournament(): Match[] {
  const rotation = [...clubs];
  const matches: Match[] = [];
  for (let round = 1; round < clubs.length; round++) {
    for (let pair = 0; pair < clubs.length / 2; pair++) {
      const first = rotation[pair];
      const second = rotation[clubs.length - 1 - pair];
      const firstIsHome = pair === 0 ? round % 2 === 1 : pair % 2 === 1;
      const [home, away] = firstIsHome ? [first, second] : [second, first];
      matches.push({
        id: 1000 + matches.length, category: demoTournament.id, round,
        home: clubTeamName(home), away: clubTeamName(away), homeClubId: home.id, awayClubId: away.id,
        homeGoals: round <= 2 ? (pair * 3 + round) % 5 : null,
        awayGoals: round <= 2 ? (pair + round * 2) % 4 : null,
        status: round <= 2 ? "Finalizado" : "Programado", time: "16:00",
        updated: "2026-11-13T12:00:00-03:00",
      });
    }
    rotation.splice(1, 0, rotation.pop()!);
  }
  return matches;
}
