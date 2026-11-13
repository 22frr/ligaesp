import { useState } from "react";
import { clubs, clubsSource, type Club } from "./clubs";
import { stadiums } from "./clubDetails";
import type { Match } from "./data";
import { demoTournament, roundDate } from "./demoTournament";

const clubUrl = (club: Club, section = "principal") => `#clubes/${club.id}/${section}`;
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

export function Crest({ club }: { club: Club }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="crest-fallback" role="img" aria-label={`Escudo de ${club.name} no disponible`}>LEF</span>
    : <img className="club-crest" src={club.logo} alt={`Escudo de ${club.name}`} width="64" height="64" onError={() => setFailed(true)} />;
}

function FixtureTable({ club, fixtures, results }: { club: Club; fixtures: Match[]; results?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const ordered = [...fixtures].sort((a, b) => results ? b.round - a.round : a.round - b.round);
  return <section className="club-block">
    <div className="fixture-top"><h2>{results ? "Resultados" : "Próximos partidos"}</h2></div>
    {fixtures.length ? <><div className="table-scroll"><table className="club-fixture-table">
      <caption>{results ? "Resultados ficticios" : "Fixture ficticio"} · Sin torneo oficial asignado</caption>
      <thead><tr><th scope="col">Día</th><th scope="col">L/V</th><th scope="col">Rival</th><th scope="col">{results ? "Res." : "Hora"}</th></tr></thead>
      <tbody>{(expanded ? ordered : ordered.slice(0, 5)).map((match) => {
        const date = roundDate(match.round);
        const home = match.homeClubId === club.id;
        const opponent = clubs.find((candidate) => candidate.id === (home ? match.awayClubId : match.homeClubId))!;
        const goals = home ? match.homeGoals : match.awayGoals;
        const against = home ? match.awayGoals : match.homeGoals;
        const result = goals === against ? "draw" : goals! > against! ? "win" : "loss";
        return <tr key={match.id}><td><time dateTime={date}>{date.slice(8)}/{date.slice(5, 7)}</time></td><td><abbr title={home ? "Local" : "Visitante"}>{home ? "L" : "V"}</abbr></td>
          <th scope="row"><a className="opponent-link" href={clubUrl(opponent)}><Crest club={opponent}/><span>{opponent.name}<small>{opponent.locality}</small></span></a></th>
          <td>{results ? <strong className={`result-${result}`} aria-label={`${goals} a ${against}, ${result === "draw" ? "empate" : result === "win" ? "victoria" : "derrota"}`}>{goals}–{against}</strong> : match.time}</td></tr>;
      })}</tbody>
    </table></div>{ordered.length > 5 && <button className="club-more" onClick={() => setExpanded(!expanded)}>{expanded ? "Ver menos −" : "Ver todos +"}</button>}</> : <p className="empty">Sin partidos en esta muestra.</p>}
  </section>;
}

function ClubProfile({ club, section, matches }: { club: Club; section: string; matches: Match[] }) {
  const [showDemo, setShowDemo] = useState(true);
  const stadium = stadiums[club.id];
  const fixtures = matches.filter((match) => match.category === demoTournament.id && ( match.homeClubId === club.id || match.awayClubId === club.id));
  return <>
    <div className="club-breadcrumb"><a href="#clubes">Clubes afiliados</a><span aria-hidden="true">›</span><span>{club.name} · {club.locality}</span></div>
    <div className="club-profile-heading"><Crest club={club}/><div><span className="eyebrow">LIGA ESPERANCINA DE FÚTBOL</span><h2>{club.name}</h2><p>{club.locality}, Santa Fe</p></div></div>
    <nav className="division-tabs club-profile-tabs" aria-label="Secciones del club">
      <a href={clubUrl(club)} aria-current={section === "principal" ? "page" : undefined}>Principal</a>
      <a href={clubUrl(club, "estadio")} aria-current={section === "estadio" ? "page" : undefined}>Estadio</a>
    </nav>
    {section === "estadio" ? <section className="club-block stadium-panel" aria-labelledby="stadium-title">
      <div className="fixture-top"><h2 id="stadium-title">Estadio {stadium ? `· ${stadium.name}` : "del club"}</h2></div>
      <div className="stadium-content"><div className="stadium-placeholder"><span aria-hidden="true">▤</span><strong>{stadium?.name ?? "Estadio por confirmar"}</strong><p>Fotografía pendiente de incorporar</p></div>
        <div><dl className="club-facts"><div><dt>Nombre</dt><dd>{stadium?.name ?? "Pendiente de verificación"}</dd></div><div><dt>Localidad del club</dt><dd>{club.locality}</dd></div><div><dt>Dirección de la cancha</dt><dd>{stadium?.address ?? "Pendiente de verificación"}</dd></div><div><dt>Capacidad</dt><dd>{stadium?.capacity ?? "Pendiente de verificación"}</dd></div></dl>
        {stadium?.address && <a className="stadium-map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Estadio ${stadium.name}, ${stadium.address}, Santa Fe, Argentina`)}`} target="_blank" rel="noreferrer">Ver ubicación en Google Maps ↗</a>}
        {stadium ? <p className="panel-description">Referencia: <a href={stadium.source} target="_blank" rel="noreferrer">{stadium.sourceLabel} ↗</a>. Consultada el 13/11/2026.</p> : <p className="panel-description">Todavía no contamos con datos verificados de esta cancha.</p>}
        <p className="panel-description">El domicilio de la sede social no se utiliza como ubicación del estadio.</p></div></div>
    </section> : <div className="club-profile-layout">
      <div className="club-matches-column">
        <div className="club-fixture-mode"><span className="eyebrow">FIXTURE Y RESULTADOS</span><p>{showDemo ? "Estás viendo partidos y marcadores inventados para probar la ficha." : "Todavía no hay partidos oficiales incorporados para este club."}</p><a href="#division/Primera/partidos">Abrir Torneo de ejemplo ?</a><br/><button onClick={() => setShowDemo(!showDemo)} aria-pressed={showDemo}>{showDemo ? "Ocultar ejemplo ficticio" : "Ver ejemplo ficticio"}</button></div>
        {showDemo ? <><FixtureTable club={club} fixtures={fixtures.filter((match) => match.status !== "Finalizado")}/><FixtureTable club={club} fixtures={fixtures.filter((match) => match.status === "Finalizado")} results/></> : <>{["Próximos partidos", "Resultados"].map((title) => <section className="club-block" key={title}><div className="fixture-top"><h2>{title}</h2></div><p className="empty">{title === "Resultados" ? "Sin resultados oficiales cargados." : "Sin fixture oficial cargado."}</p></section>)}</>}
      </div>
      <aside className="club-info-column" aria-label="Información del club">
        <section className="club-block"><div className="fixture-top"><h2>Información del club</h2></div><dl className="club-facts">
          <div><dt>Club de</dt><dd>{club.locality}, Santa Fe</dd></div><div><dt>Sede social</dt><dd>{club.address || "No publicada"}</dd></div><div><dt>Teléfono</dt><dd>{club.phone ? <a href={`tel:+54${club.phone.replace(/\s/g, "")}`}>{club.phone}</a> : "No publicado"}</dd></div>
          <div><dt>Estadio</dt><dd>{stadium ? <a href={clubUrl(club, "estadio")}>{stadium.name} →</a> : <a href={clubUrl(club, "estadio")}>Pendiente de verificación →</a>}</dd></div>
        </dl><p className="panel-description">Directorio: <a href={clubsSource} target="_blank" rel="noreferrer">Liga Esperancina ↗</a> · Consulta: 13/11/2026.</p></section>
        <a className="club-stadium-card" href={clubUrl(club, "estadio")}><span className="eyebrow">SU CANCHA</span><strong>{stadium?.name ?? "Estadio del club"}</strong><span>Ver información del estadio <span aria-hidden="true">→</span></span></a>
      </aside>
    </div>}
  </>;
}

export function ClubPages({ clubId, section, matches }: { clubId?: string; section: string; matches: Match[] }) {
  const [search, setSearch] = useState("");
  const club = clubs.find((candidate) => candidate.id === clubId);
  const visible = clubs.filter((candidate) => normalize(`${candidate.name} ${candidate.locality}`).includes(normalize(search.trim())));
  if (club) return <ClubProfile club={club} section={section} matches={matches}/>;
  if (clubId) return <section className="club-block"><p className="empty">No se encontró ese club. <a href="#clubes">Volver a todos los clubes</a></p></section>;
  return <section className="data-panel" aria-labelledby="clubs-title">
    <div className="clubs-directory-heading"><h2 id="clubs-title">Equipos</h2><p>Pulsá en un equipo para ver su información detallada</p></div>
    <label className="club-search">Buscar por club o localidad<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ej.: Argentino, Esperanza…"/></label>
    <p className="panel-description" role="status">{visible.length} de {clubs.length} clubes</p>
    <ul className="clubs-grid">{visible.map((candidate) => <li key={candidate.id}><a href={clubUrl(candidate)}><Crest club={candidate}/><strong>{candidate.name}</strong><small>{candidate.locality}</small></a></li>)}</ul>
    {!visible.length && <p className="empty">No se encontraron clubes. Probá con otro nombre o localidad.</p>}
    <p className="clubs-source">Escudos y directorio: <a href={clubsSource} target="_blank" rel="noreferrer">Liga Esperancina de Fútbol ↗</a> · Consulta: 13/11/2026.</p>
  </section>;
}
