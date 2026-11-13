import { clubs } from "./clubs";
import { clubZones } from "./zones";
import { buildStandings } from "./standings";
import { demoTournament, clubTeamName } from "./demoTournament";
import type { Match } from "./data";

export function projectKnockout(matches: Match[], category = demoTournament.id) {
  const games = matches.filter((match) => match.category === category);
  const table = buildStandings(games);
  const zones = clubZones.slice(0, 2).map((zone) => {
    const names = new Set(clubs.filter((club) => zone.clubIds.includes(club.id)).map(clubTeamName));
    return table.filter((row) => names.has(row.team)).map((row, index) => ({
      ...row, club: clubs.find((club) => clubTeamName(club) === row.team)!, rank: index + 1, zone: zone.label,
    }));
  });
  const pairs = zones[0].slice(0, 8).map((team, index) => [team, zones[1][7 - index]] as const).filter((pair) => pair[1]);
  const lastRound = Math.max(0, ...games.map((match) => match.round));
  const completedRounds = Array.from({ length: lastRound }, (_, index) => games.filter((match) => match.round === index + 1))
    .filter((round) => round.length > 0 && round.every((match) => match.status === "Finalizado")).length;
  return { zones, pairs, lastRound, completedRounds, complete: games.length > 0 && games.every((match) => match.status === "Finalizado") };
}

export function validPairings(slots: string[], entrants: string[]) {
  return slots.length === entrants.length && new Set(slots).size === entrants.length && slots.every((id) => entrants.includes(id));
}
