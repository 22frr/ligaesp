import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initialMatches, statuses, formatTime, validateScore, type Match, type Status, } from "./data";
import "./style.css";
import { clubZones } from "./zones";
import { buildStandings } from "./standings";
import { clubs } from "./clubs";
import { demoTournament, createDemoTournament, roundLabel } from "./demoTournament";
import { ClubPages, Crest } from "./ClubPages";
import { Knockout } from "./Knockout";
const divisions = [
    { id: "Regional", label: "Regional Amateur", detail: "2026 · Litoral Sur", code: "RA" },
    { id: "Primera", label: "1ra División", detail: "Clausura 2026", code: "1ª" },
    { id: "Tercera", label: "3ra División", detail: "Clausura 2026", code: "3ª" },
    { id: "Quinta", label: "5ta División", detail: "Clausura 2026", code: "5ª" },
    { id: "Sexta", label: "6ta División", detail: "Clausura 2026", code: "6ª" },
    { id: "Septima", label: "7ma División", detail: "Clausura 2026", code: "7ª" },
    { id: "Octava", label: "8va División", detail: "Clausura 2026", code: "8ª" },
    { id: "Preoctava", label: "Preoctava", detail: "Clausura 2026", code: "PO" },
    { id: "Senior", label: "División Senior", detail: "Clausura 2026", code: "SR" },
];
const categories = [demoTournament, ...divisions.filter((division) => division.id !== demoTournament.id), { id: "Reserva", label: "Reserva", detail: "Categoría demo existente", code: "R" }];
const sections = [{ id: "partidos", label: "Partidos" }, { id: "tabla", label: "Tabla" }, { id: "eliminatorias", label: "Eliminatorias" }, { id: "goleadores", label: "Goleadores" }, { id: "equipos", label: "Equipos" }];
function readRoute() {
    const [root, requestedId, section] = location.hash.slice(1).split("/");
    const id = requestedId === "TorneoDemo" ? demoTournament.id : requestedId;
    return {
        category: categories.some((d) => d.id === id) ? id : root === "carga" ? "Primera" : "Todos",
        section: sections.some((s) => s.id === section) ? section : "partidos",
        clubId: root === "clubes" ? id : undefined,
        clubSection: root === "clubes" && section === "estadio" ? "estadio" : "principal",
        view: root === "clubes" ? "clubes" : root === "carga" ? "carga" : "partidos",
    };
}
const divisionUrl = (id: string, section = "partidos", view = "partidos") => `#${view === "carga" ? "carga" : "division"}/${id}/${section}`;
type Entry = {
    id: number;
    text: string;
    time: string;
};
function Editor({ match, onSave, onCancel, }: {
    match: Match;
    onSave: (home: number | null, away: number | null, status: Status, reason: string) => void;
    onCancel: () => void;
}) {
    const [home, setHome] = useState(match.homeGoals?.toString() ?? "");
    const [away, setAway] = useState(match.awayGoals?.toString() ?? "");
    const [status, setStatus] = useState<Status>(match.status);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    return (<section className="editor" aria-labelledby="editor-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EDICIÓN DE PARTIDO</span>
          <h2 id="editor-title">Cargar o corregir resultado</h2>
        </div>
        <button className="text-button" onClick={onCancel}>
          Cerrar
        </button>
      </div>
      <form onSubmit={(e) => {
            e.preventDefault();
            const err = validateScore(home, away, status);
            if (err) {
                setError(err);
                return;
            }
            if (!reason.trim()) {
                setError("Indicá el motivo de la carga o corrección.");
                return;
            }
            onSave(home === "" ? null : Number(home), away === "" ? null : Number(away), status, reason.trim());
        }}>
        <div className="score-inputs">
          <label>
            {match.home}
            <input aria-label={`Goles de ${match.home}`} type="number" min="0" max="99" step="1" inputMode="numeric" value={home} onChange={(e) => setHome(e.target.value)}/>
          </label>
          <span aria-hidden="true">–</span>
          <label>
            {match.away}
            <input aria-label={`Goles de ${match.away}`} type="number" min="0" max="99" step="1" inputMode="numeric" value={away} onChange={(e) => setAway(e.target.value)}/>
          </label>
        </div>
        <p className="muted">
          Vacío significa sin resultado. Un 0–0 es un marcador cargado.
        </p>
        <label className="field">
          Estado del partido
          <select aria-label="Estado del partido" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {statuses.map((s) => (<option key={s}>{s}</option>))}
          </select>
        </label>
        <label className="field">
          Motivo de la carga o corrección
          <textarea maxLength={240} rows={2} placeholder="Ej.: corrección del marcador local" value={reason} onChange={(e) => setReason(e.target.value)} required/>
        </label>
        {error && (<p role="alert" className="error">
            {error}
          </p>)}
        <div className="actions">
          <button className="primary" type="submit">
            Guardar en esta sesión
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </section>);
}
function TeamLink({ name }: { name: string }) {
    const club = clubs.find((candidate) => `${candidate.name} (${candidate.locality})` === name);
    return club ? <a className="team-club-link" href={`#clubes/${club.id}/principal`}><Crest club={club}/><span>{club.name}<small>{club.locality}</small></span></a> : <span>{name}</span>;
}
function StandingsTable({ title, rows, qualifying = false }: { title: string; rows: ReturnType<typeof buildStandings>; qualifying?: boolean }) {
    const tone = title === "Zona Norte" ? "north" : title === "Zona Sur" ? "south" : title === "Tabla general" ? "general" : "other";
    return <section className="zone-table" data-zone={tone} aria-label={title}>
      <h3>{title}<span>{rows.length} clubes{qualifying && rows.length > 0 && <span className="qualification-label"> · 8 a octavos</span>}</span></h3>
      {rows.length ? <div className="table-scroll"><table className="standings-table"><caption className="sr-only">Posiciones: {title}</caption>
        <thead><tr>{["#", "Club", "PJ", "PG", "PE", "PP", "GF", "GC", "DG", "PTS"].map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={row.team} className={qualifying && index < 8 ? "in-knockout" : undefined}><td>{index + 1}{qualifying && index < 8 && <span className="sr-only"> · En puestos de octavos, provisional</span>}</td><th scope="row"><TeamLink name={row.team}/></th><td>{row.played}</td><td>{row.won}</td><td>{row.drawn}</td><td>{row.lost}</td><td>{row.gf}</td><td>{row.ga}</td><td>{row.gf - row.ga}</td><td className="points">{row.points}</td></tr>)}</tbody>
      </table></div> : <p className="empty">Sin equipos cargados.</p>}
    </section>;
}
function MatchRows({ matches, onEdit }: { matches: Match[]; onEdit?: (id: number) => void }) {
    return (<ul className="matches">
                {matches.map((m) => (<li className="match" key={m.id}>
                    <div className="match-meta">
                      <span className={m.status === "En juego" ? "badge live" : "badge"}>
                        {m.status === "En juego" && (<span aria-hidden="true">● </span>)}
                        {m.status}
                      </span>
                      <span>{m.time}</span>
                    </div>
                    <div className="teams">
                      <div className="team home">
                        <TeamLink name={m.home}/>
                        {!m.homeClubId && <span className="club-icon" aria-hidden="true">{m.home.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>}
                      </div>
                      <strong className={m.status === "En juego" ? "score live" : "score"} aria-label={`Marcador: ${m.homeGoals ?? "sin resultado"} a ${m.awayGoals ?? "sin resultado"}`}>
                        {m.homeGoals ?? "–"} - {m.awayGoals ?? "–"}
                      </strong>
                      <div className="team away">
                        {!m.awayClubId && <span className="club-icon away" aria-hidden="true">{m.away.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>}
                        <TeamLink name={m.away}/>
                      </div>
                    </div>
                    {onEdit && (<div className="match-bottom">
                      <small>Actualizado: {formatTime(m.updated)}</small>
                      <button className="text-button" onClick={() => onEdit?.(m.id)} aria-label={`Editar ${m.home} contra ${m.away}`}>
                          Cargar / corregir →
                        </button>
                    </div>)}
                  </li>))}
              </ul>);
}
function App() {
    const [route, setRoute] = useState(readRoute);
    const { view, category, section } = route;
    const [matches, setMatches] = useState(() => [...initialMatches.filter((match) => match.category !== "Primera"), ...createDemoTournament()]);
    const [round, setRound] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const isClubs = view === "clubes";
    const isHome = category === "Todos" && !isClubs;
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [selected, setSelected] = useState<number | null>(null);
    const [notice, setNotice] = useState("");
    const [history, setHistory] = useState<Entry[]>([]);
    const [enabledKnockouts, setEnabledKnockouts] = useState<Record<string, boolean>>({});
    const knockoutEnabled = enabledKnockouts[category] ?? false;
    useEffect(() => {
        const handle = () => {
            if (location.hash === "#contenido") return;
            const nextRoute = readRoute();
            setRoute(nextRoute);
            if (nextRoute.category !== demoTournament.id && nextRoute.category !== "Todos") setRound((value) => Math.min(value, 2));
            setStatusFilter("Todos");
            setMenuOpen(false);
            setSelected(null);
            setNotice("");
        };
        window.addEventListener("hashchange", handle);
        return () => window.removeEventListener("hashchange", handle);
    }, []);
    const division = categories.find((d) => d.id === category) ?? { id: "Todos", label: "Todos los partidos", detail: "Temporada 2026", code: "LEF" };
    const selectCategory = (id: string) => {
        location.hash = divisionUrl(id, "partidos", view);
        setSelected(null);
        setNotice("");
        setStatusFilter("Todos");
    };
    const maxRound = category === demoTournament.id || isHome ? clubs.length - 1 : 2;
    const roundMatches = matches.filter((m) => m.round === round);
    const groups = categories.map((d) => ({ ...d, matches: roundMatches.filter((m) => m.category === d.id) })).filter((d) => d.matches.length > 0);
    const divisionMatches = matches.filter((m) => m.category === category);
    const standings = buildStandings(divisionMatches);
    const filtered = matches.filter((m) => m.round === round && m.category === category);
    const visible = filtered.filter((m) => statusFilter === "Todos" || m.status === statusFilter);
    const editing = matches.find((m) => m.id === selected);
    const last = filtered.reduce((a, m) => (m.updated > a ? m.updated : a), filtered[0]?.updated ?? "");
    return (<>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-nav">
        <a className="brand" href="#partidos" aria-label="100% LEF, inicio">
          <span>100<em>%</em>LEF</span>
          <small>LIGA ESPERANCINA DE FÚTBOL<span>PORTAL INDEPENDIENTE</span></small>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#partidos" aria-current={isHome ? "page" : undefined}>La jornada</a>
          <a href="#clubes" aria-current={isClubs ? "page" : undefined}>Clubes</a>
          <a href={divisionUrl(isHome || isClubs ? "Primera" : category, "partidos", "carga")} aria-current={view === "carga" ? "page" : undefined}>Carga de resultados ↗</a>
        </nav>
        <button className="mobile-menu-toggle" aria-label={menuOpen ? "Cerrar menú de divisiones" : "Abrir menú de divisiones"} aria-expanded={menuOpen} aria-controls="division-menu" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={(e) => { if (e.key === "Escape") setMenuOpen(false); }}><svg className="mobile-menu-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{menuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}</svg></button>
      </header>
      <div className="app-layout" data-division={category}>
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Divisiones de la liga">
        <div id="division-menu" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenuOpen(false); }} onKeyDown={(e) => { if (e.key === "Escape") { setMenuOpen(false); document.querySelector<HTMLButtonElement>(".mobile-menu-toggle")?.focus(); } }}>
        <div className="sidebar-heading"><h2>Competiciones</h2></div>
        <nav aria-label="Seleccionar división">
          <a className="division-link" data-division={demoTournament.id} aria-current={category === demoTournament.id ? "page" : undefined} href={divisionUrl(demoTournament.id, "tabla")}><span className="division-marker" aria-hidden="true">C</span><span><strong>Copa de ejemplo</strong></span><span className="division-arrow" aria-hidden="true">›</span></a>
          <a className="division-link all-matches-link" href="#partidos" aria-current={isHome ? "page" : undefined}><span className="division-code" aria-hidden="true">≡</span><span><strong>Todos los partidos</strong></span></a>
          {divisions.map((d) => <a key={d.id} className="division-link" data-division={d.id} aria-current={category === d.id ? "page" : undefined} href={divisionUrl(d.id)}>
            <span className="division-marker" aria-hidden="true">{d.code}</span>
            <span><strong>{d.label}</strong></span>
            <span className="division-arrow" aria-hidden="true">›</span>
          </a>)}
        </nav>
        <div className="sidebar-demo"><span className="eyebrow">MUESTRAS ANTERIORES</span>
          <a className="division-link" data-division="Reserva" aria-current={category === "Reserva" ? "page" : undefined} href={divisionUrl("Reserva")}><span className="division-marker" aria-hidden="true">R</span><span><strong>Reserva</strong></span></a>
        </div>

        </div>
      </aside>
      <div className="shell">
      <div className="demo"><strong>DEMO</strong><span>Resultados ficticios · Los cambios se pierden al recargar.</span></div>
      <main id="contenido" tabIndex={-1}>

        <div className="page-heading" hidden={isClubs && Boolean(route.clubId)}>
          <h1>{isClubs ? (clubs.find((club) => club.id === route.clubId)?.name ?? "Clubes afiliados") : view === "partidos" ? division.label : `Carga de resultados: ${division.label}`}</h1>
          <span>{isClubs ? `${clubs.length} clubes · Liga Esperancina` : division.detail}</span>
        </div>

        {isClubs && <ClubPages key={route.clubId ?? "directory"} clubId={route.clubId} section={route.clubSection} matches={matches} />}
        {!isClubs && (isHome || section === "partidos" || view === "carga") && <div className="date-bar">
          <div className="date-controls">
            <button aria-label="Fecha anterior" disabled={round === 1} onClick={() => { setRound(round - 1); setSelected(null); }}>‹</button>
            <label><span>FECHA</span><select aria-label="Fecha" value={round} onChange={(e) => { setRound(Number(e.target.value)); setSelected(null); }}>{Array.from({ length: maxRound }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} · {roundLabel(index + 1)}</option>)}</select></label>
            <button aria-label="Fecha siguiente" disabled={round >= maxRound} onClick={() => { setRound(round + 1); setSelected(null); }}>›</button>
          </div>
          <span className="date-caption">{isHome ? roundMatches.length : filtered.length} partidos</span>
          {view === "carga" && <label className="load-category">División <select aria-label="Categoría" value={category} onChange={(e) => selectCategory(e.target.value)}>{categories.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}</select></label>}
        </div>}
        {isHome && <div className="day-fixture">
          {groups.map((group) => <section className="fixture" data-division={group.id} key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="fixture-top"><h2 id={`group-${group.id}`}><a href={divisionUrl(group.id)}>{group.label} <span aria-hidden="true">↗</span></a></h2><span className="count">{group.detail}</span></div>
            <MatchRows matches={group.matches} />
            <a className="group-footer" href={divisionUrl(group.id, "tabla")}>Tabla y estadísticas <span aria-hidden="true">→</span></a>
          </section>)}
          {groups.length === 0 && <p className="empty">No hay partidos cargados para esta fecha.</p>}

        </div>}
        {view === "carga" && (<aside className="panel-note">
            <strong>Panel de demostración abierto</strong>
            <p>
              Sin autenticación. No ingreses datos reales. Esta pantalla permite
              probar cargas y correcciones; no es un panel seguro de producción.
            </p>
          </aside>)}
        {view === "carga" && <section className="competition-settings" aria-label="Configuración del torneo demo"><label><input type="checkbox" checked={knockoutEnabled} onChange={(event) => setEnabledKnockouts((previous) => ({ ...previous, [category]: event.target.checked }))}/> Habilitar eliminatorias de {division.label}</label></section>}
        {view === "partidos" && !isHome && <nav className="division-tabs" aria-label="Secciones de la división">
          {sections.map((tab) => tab.id === "eliminatorias" && !knockoutEnabled ? <button key={tab.id} type="button" disabled title="Pendiente de habilitación">{tab.label}</button> : <a key={tab.id} href={divisionUrl(category, tab.id)} aria-current={section === tab.id ? "page" : undefined}>{tab.label}</a>)}
        </nav>}
        {view === "partidos" && section === "tabla" && <section className="data-panel" aria-labelledby="table-title">
          <h2 id="table-title" className="sr-only">Tabla de posiciones</h2>
          <>
            {clubZones.slice(0, 2).map((zone) => {
              const names = new Set(clubs.filter((club) => zone.clubIds.includes(club.id)).map((club) => `${club.name} (${club.locality})`));
              return <StandingsTable key={zone.label} title={zone.label} qualifying rows={standings.filter((row) => names.has(row.team))}/>;
            })}
            <StandingsTable title="Tabla general" rows={standings}/>
            {(() => {
              const zonedNames = new Set(clubs.filter((club) => clubZones.slice(0, 2).some((zone) => zone.clubIds.includes(club.id))).map((club) => `${club.name} (${club.locality})`));
              const remaining = standings.filter((row) => !zonedNames.has(row.team));
              return remaining.length > 0 && <StandingsTable title="Sin zona asignada" rows={remaining}/>;
            })()}
          </>
          <details className="table-rules"><summary>Criterios de la tabla</summary><p>Solo partidos finalizados. Victoria: 3 puntos; empate: 1. Desempate por diferencia de gol, goles a favor y nombre. Reglas de ejemplo.</p><p>Los cuatro clubes sin zona no aparecen en las imágenes proporcionadas.</p></details>
        </section>}
        {view === "partidos" && section === "eliminatorias" && (knockoutEnabled ? <Knockout matches={divisionMatches} category={category}/> : <p className="empty">Las eliminatorias aún no están habilitadas. <a href={divisionUrl(category, "tabla")}>Ver tabla</a></p>)}
        {view === "partidos" && section === "goleadores" && <section className="data-panel" aria-labelledby="scorers-title">
          <div className="fixture-top"><h2 id="scorers-title">Goleadores</h2><span className="demo-tag">SIN DATOS</span></div>
          <p className="empty">Todavía no hay goleadores registrados para {division.label}. Los marcadores actuales no incluyen autores de los goles.</p>
        </section>}
        {view === "partidos" && section === "equipos" && <section className="data-panel" aria-labelledby="teams-title">
          <div className="fixture-top"><h2 id="teams-title">Equipos</h2><span className="count">{standings.length} equipos demo</span></div>
          {standings.length ? <ul className="division-teams">{standings.map((row) => <li key={row.team}><TeamLink name={row.team}/></li>)}</ul> : <p className="empty">Todavía no hay equipos cargados para esta división.</p>}
        </section>}
        <div className="layout" hidden={isClubs || isHome || (view === "partidos" && section !== "partidos")}>
          <div>
            <section className="fixture" aria-labelledby="fixture-title">
              <div className="fixture-top">
                <h2 id="fixture-title">
                  {view === "partidos"
            ? "Partidos de la fecha"
            : "Seleccioná un partido"}
                </h2>
                <span className="count">{filtered.length} partidos</span>
              </div>
              <div className="status-filters" aria-label="Filtrar por estado">
                {["Todos", "En juego", "Finalizado"].map((state) => <button key={state} aria-pressed={statusFilter === state} onClick={() => setStatusFilter(state)}>{state} <span className="count">{filtered.filter((m) => state === "Todos" || m.status === state).length}</span></button>)}
              </div>
              <div className="match-heading">
                <span>{roundLabel(round).toUpperCase()}</span>
              </div>
              <MatchRows matches={visible} onEdit={view === "carga" ? (id) => { setSelected(id); setNotice(""); } : undefined} />
              {visible.length === 0 && <p className="empty">{filtered.length === 0 ? "Todavía no hay partidos cargados para esta división y fecha." : "No hay partidos con este filtro."}</p>}
              <div className="fixture-footer">
                {last
            ? `Actualizado: ${formatTime(last)}`
            : "Sin partidos para esta selección."}
              </div>
            </section>
            <div role="status" className={notice ? "success" : ""}>
              {notice}
            </div>
            {view === "carga" && editing && (<Editor key={editing.id} match={editing} onCancel={() => setSelected(null)} onSave={(home, away, status, reason) => {
                const now = new Date().toISOString();
                setMatches((ms) => ms.map((m) => m.id === editing.id
                    ? {
                        ...m,
                        homeGoals: home,
                        awayGoals: away,
                        status,
                        updated: now,
                    }
                    : m));
                setHistory((h) => [
                    {
                        id: Date.now(),
                        time: now,
                        text: `${editing.home} / ${editing.away}: ${editing.homeGoals ?? "–"}–${editing.awayGoals ?? "–"} (${editing.status}) → ${home ?? "–"}–${away ?? "–"} (${status}). Motivo: ${reason}. Operador: colaborador demo.`,
                    },
                    ...h,
                ]);
                setSelected(null);
                setNotice("Cambio guardado en memoria. Ya se refleja en Partidos; se perderá al recargar.");
            }}/>)}
            {view === "carga" && history.length > 0 && (<section className="history">
                <h2>Cambios de esta sesión</h2>
                <ul>
                  {history.map((h) => (<li key={h.id}>
                      <small>{formatTime(h.time)}</small>
                      <p>{h.text}</p>
                    </li>))}
                </ul>
              </section>)}
          </div>

        </div>
      </main>
      <footer>
        <span className="footer-brand">100% LEF · ligaesp</span>
        <span>No oficial · Partidos ficticios · Clubes de fuente oficial · Sin conexión a Copa Fácil</span>
      </footer>
      </div>
      </div>
    </>);
}
createRoot(document.getElementById("root")!).render(<StrictMode>
    <App />
  </StrictMode>);
