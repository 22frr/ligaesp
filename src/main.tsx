import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initialMatches, statuses, formatTime, validateScore, type Match, type Status, } from "./data";
import "./style.css";
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
function App() {
    const [view, setView] = useState(location.hash === "#carga" ? "carga" : "partidos");
    const [matches, setMatches] = useState(initialMatches);
    const [round, setRound] = useState(1);
    const [category, setCategory] = useState("Primera");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [selected, setSelected] = useState<number | null>(null);
    const [notice, setNotice] = useState("");
    const [history, setHistory] = useState<Entry[]>([]);
    useEffect(() => {
        const handle = () => {
            setView(location.hash === "#carga" ? "carga" : "partidos");
            setSelected(null);
            setNotice("");
        };
        window.addEventListener("hashchange", handle);
        return () => window.removeEventListener("hashchange", handle);
    }, []);
    const filtered = matches.filter((m) => m.round === round && m.category === category);
    const visible = filtered.filter((m) => statusFilter === "Todos" || m.status === statusFilter);
    const editing = matches.find((m) => m.id === selected);
    const last = filtered.reduce((a, m) => (m.updated > a ? m.updated : a), filtered[0]?.updated ?? "");
    return (<>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-nav">
        <a className="brand" href="#partidos" aria-label="100% LEF, inicio">
          <span>100<em>%</em>LEF</span>
          <small>EL FÚTBOL DE NUESTRA LIGA</small>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#partidos" aria-current={view === "partidos" ? "page" : undefined}>▦ Partidos</a>
          <a href="#carga" aria-current={view === "carga" ? "page" : undefined}>Carga de resultados ↗</a>
        </nav>
      </header>
      <div className="shell">
      <div className="demo">
        <strong>DEMO</strong>
        <span>
          Todos los equipos y resultados son ficticios. Los cambios se guardan
          solo en memoria y se pierden al recargar.
        </span>
      </div>
      <main id="contenido">
        <div className="page-heading">
          <h1>{view === "partidos" ? "Partidos y resultados" : "Carga de resultados"}</h1>
          <span>Temporada 2026</span>
        </div>
        {view === "carga" && (<aside className="panel-note">
            <strong>Panel de demostración abierto</strong>
            <p>
              Sin autenticación. No ingreses datos reales. Esta pantalla permite
              probar cargas y correcciones; no es un panel seguro de producción.
            </p>
          </aside>)}
        <div className="layout">
          <div>
            <section className={`fixture ${category === "Reserva" ? "reserve" : ""}`} aria-labelledby="fixture-title">
              <div className="fixture-top">
                <h2 id="fixture-title">
                  {view === "partidos"
            ? `${category === "Primera" ? "1ª · Primera División" : "R · Reserva"}`
            : "Seleccioná un partido"}
                </h2>
                <span className="count">{filtered.length} partidos</span>
              </div>
              <div className="filters">
                <label>
                  Fecha
                  <select aria-label="Fecha" value={round} onChange={(e) => {
            setRound(Number(e.target.value));
            setSelected(null);
        }}>
                    <option value={1}>Fecha 1 · 08 nov</option>
                    <option value={2}>Fecha 2 · 15 nov</option>
                  </select>
                </label>
                <label>
                  Categoría
                  <select aria-label="Categoría" value={category} onChange={(e) => {
            setCategory(e.target.value);
            setSelected(null);
        }}>
                    <option>Primera</option>
                    <option>Reserva</option>
                  </select>
                </label>
              </div>
              <div className="status-filters" aria-label="Filtrar por estado">
                {["Todos", "En juego", "Finalizado"].map((state) => <button key={state} aria-pressed={statusFilter === state} onClick={() => setStatusFilter(state)}>{state} <span className="count">{filtered.filter((m) => state === "Todos" || m.status === state).length}</span></button>)}
              </div>
              <div className="match-heading">
                <span>DOMINGO {round === 1 ? "08" : "15"} DE NOVIEMBRE</span>
                <span>HORA ARGENTINA</span>
              </div>
              <ul className="matches">
                {visible.map((m) => (<li className="match" key={m.id}>
                    <div className="match-meta">
                      <span className={m.status === "En juego" ? "badge live" : "badge"}>
                        {m.status === "En juego" && (<span aria-hidden="true">● </span>)}
                        {m.status}
                      </span>
                      <span>{m.time}</span>
                    </div>
                    <div className="teams">
                      <div className="team home">
                        <span>{m.home}</span>
                        <span className="club-icon" aria-hidden="true">{m.home.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                      </div>
                      <strong className={m.status === "En juego" ? "score live" : "score"} aria-label={`Marcador: ${m.homeGoals ?? "sin resultado"} a ${m.awayGoals ?? "sin resultado"}`}>
                        {m.homeGoals ?? "–"} - {m.awayGoals ?? "–"}
                      </strong>
                      <div className="team away">
                        <span className="club-icon away" aria-hidden="true">{m.away.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                        <span>{m.away}</span>
                      </div>
                    </div>
                    {view === "carga" && (<div className="match-bottom">
                      <small>Actualizado: {formatTime(m.updated)}</small>
                      <button className="text-button" onClick={() => {
                    setSelected(m.id);
                    setNotice("");
                }} aria-label={`Editar ${m.home} contra ${m.away}`}>
                          Cargar / corregir →
                        </button>
                    </div>)}
                  </li>))}
              </ul>
              {visible.length === 0 && <p className="empty">No hay partidos con este filtro.</p>}
              <div className="fixture-footer">
                {last
            ? `Última actualización de esta selección: ${formatTime(last)} (Argentina)`
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
        <span>No oficial · Datos ficticios · Sin conexión a Copa Fácil</span>
      </footer>
      </div>
    </>);
}
createRoot(document.getElementById("root")!).render(<StrictMode>
    <App />
  </StrictMode>);
