import type { Match } from "./data";
import { Crest } from "./ClubPages";
import { projectKnockout } from "./knockoutProjection";

const stages = ["Octavos de final", "Cuartos de final", "Semifinales", "Final"];

export function Knockout({ matches, category }: { matches: Match[]; category?: string }) {
  const projection = projectKnockout(matches, category);
  return <section className="knockout-panel" aria-label="Cuadro de eliminatorias">
    <p className="knockout-description">Octavos interzonales: 1.º Norte contra 8.º Sur, 2.º contra 7.º y así sucesivamente. Desde cuartos, los cruces se definen entre los equipos que avanzan, sin llave fija.</p>
    {!projection.complete && <p className="knockout-status">Clasificación provisional</p>}
    <div className="knockout-grid">{stages.map((stage, index) => <section className="knockout-stage" key={stage} aria-label={stage}>
      <h3>{stage}</h3>
      {Array.from({ length: 8 / 2 ** index }, (_, pair) => <div className="knockout-tie" key={pair}>
        {(index === 0 ? projection.pairs[pair] ?? [null, null] : [null, null]).map((team, slot) => <div className="bracket-team" key={slot}>
          {team ? <a href={`#clubes/${team.club.id}/principal`}><Crest club={team.club}/><span>{team.club.name}<small>{team.club.locality}</small></span></a> : <span className="muted">A definir</span>}
        </div>)}
      </div>)}
    </section>)}</div>
  </section>;
}
