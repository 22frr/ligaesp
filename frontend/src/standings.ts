import type { Match } from "./data";
export function buildStandings(matches: Match[]) {
  const rows = new Map<string, { team: string; points: number; played: number; won: number; drawn: number; lost: number; gf: number; ga: number }>();
  for (const match of matches) {
    for (const team of [match.home, match.away]) {
      if (!rows.has(team)) rows.set(team, { team, points: 0, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0 });
    }
    if (match.status !== "Finalizado" || match.homeGoals === null || match.awayGoals === null) continue;
    for (const [team, goals, against] of [[match.home, match.homeGoals, match.awayGoals], [match.away, match.awayGoals, match.homeGoals]] as const) {
      const row = rows.get(team)!;
      row.played++;
      row.gf += goals;
      row.ga += against;
      if (goals > against) { row.won++; row.points += 3; }
      else if (goals === against) { row.drawn++; row.points++; }
      else row.lost++;
    }
  }
  return [...rows.values()].sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf || a.team.localeCompare(b.team, "es"));
}
