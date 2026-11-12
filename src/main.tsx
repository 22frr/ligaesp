import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  initialMatches,
  statuses,
  formatTime,
  validateScore,
  type Match,
  type Status,
} from "./data";
import "./style.css";

type Entry = { id: number; text: string; time: string };
function Editor({
  match,
  onSave,
  onCancel,
}: {
  match: Match;
  onSave: (
    home: number | null,
    away: number | null,
    status: Status,
    reason: string,
  ) => void;
  onCancel: () => void;
}) {
  const [home, setHome] = useState(match.homeGoals?.toString() ?? "");
  const [away, setAway] = useState(match.awayGoals?.toString() ?? "");
  const [status, setStatus] = useState<Status>(match.status);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  return (
    <section className="editor" aria-labelledby="editor-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EDICIÓN DE PARTIDO</span>
          <h2 id="editor-title">Cargar o corregir resultado</h2>
        </div>
        <button className="text-button" onClick={onCancel}>
          Cerrar
        </button>
      </div>
      <form
        onSubmit={(e) => {
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
          onSave(
            home === "" ? null : Number(home),
            away === "" ? null : Number(away),
            status,
            reason.trim(),
          );
        }}
      >
        <div className="score-inputs">
          <label>
            {match.home}
            <input
              aria-label={`Goles de ${match.home}`}
              type="number"
              min="0"
              max="99"
              step="1"
              inputMode="numeric"
              value={home}
              onChange={(e) => setHome(e.target.value)}
            />
          </label>
          <span aria-hidden="true">–</span>
          <label>
            {match.away}
            <input
              aria-label={`Goles de ${match.away}`}
              type="number"
              min="0"
              max="99"
              step="1"
              inputMode="numeric"
              value={away}
              onChange={(e) => setAway(e.target.value)}
            />
          </label>
        </div>
        <p className="muted">
          Vacío significa sin resultado. Un 0–0 es un marcador cargado.
        </p>
        <label className="field">
          Estado del partido
          <select
            aria-label="Estado del partido"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Motivo de la carga o corrección
          <textarea
            maxLength={240}
            rows={2}
            placeholder="Ej.: corrección del marcador local"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <div className="actions">
          <button className="primary" type="submit">
            Guardar en esta sesión
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
function App() {
  const [view, setView] = useState(
    location.hash === "#carga" ? "carga" : "partidos",
  );
  const [matches, setMatches] = useState(initialMatches);
  const [round, setRound] = useState(1);
  const [category, setCategory] = useState("Primera");
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
  const filtered = matches.filter(
    (m) => m.round === round && m.category === category,
  );
  const editing = matches.find((m) => m.id === selected);
  const last = filtered.reduce(
    (a, m) => (m.updated > a ? m.updated : a),
    filtered[0]?.updated ?? "",
  );
  const live = filtered.filter((m) => m.status === "En juego").length;
  return (
    <>
      <header>
        <div className="header-inner">
          <a className="brand" href="#partidos" aria-label="ligaesp, inicio">
            <span className="brand-icon" aria-hidden="true">
              l.
            </span>
            <span>
              liga<span className="brand-light">esp</span>
              <small>FÚTBOL DE NUESTRA REGIÓN</small>
            </span>
          </a>
          <span className="unofficial">Sitio no oficial</span>
        </div>
        <nav aria-label="Navegación principal">
          <a
            href="#partidos"
            aria-current={view === "partidos" ? "page" : undefined}
          >
            Partidos
          </a>
          <a href="#carga" aria-current={view === "carga" ? "page" : undefined}>
            Carga de resultados <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <div className="demo">
        <strong>DEMO</strong>
        <span>
          Todos los equipos y resultados son ficticios. Los cambios se guardan
          solo en memoria y se pierden al recargar.
        </span>
      </div>
      <main>
        <div className="page-heading">
          <div>
            <span className="eyebrow">TORNEO DEMOSTRACIÓN · 2026</span>
            <h1>
              {view === "partidos"
                ? "El fútbol, fecha a fecha."
                : "Carga de resultados"}
            </h1>
            <p>
              {view === "partidos"
                ? "Partidos y resultados en un solo lugar."
                : "Una carga simple. Un resultado claro para todos."}
            </p>
          </div>
          <span className="edition">PROTOTIPO / 01</span>
        </div>
        {view === "carga" && (
          <aside className="panel-note">
            <strong>Panel de demostración abierto</strong>
            <p>
              Sin autenticación. No ingreses datos reales. Esta pantalla permite
              probar cargas y correcciones; no es un panel seguro de producción.
            </p>
          </aside>
        )}
        <div className="layout">
          <div>
            <section className="fixture" aria-labelledby="fixture-title">
              <div className="fixture-top">
                <h2 id="fixture-title">
                  {view === "partidos"
                    ? "Centro de partidos"
                    : "Seleccioná un partido"}
                </h2>
                <span className="count">{filtered.length} partidos</span>
              </div>
              <div className="filters">
                <label>
                  Fecha
                  <select
                    aria-label="Fecha"
                    value={round}
                    onChange={(e) => {
                      setRound(Number(e.target.value));
                      setSelected(null);
                    }}
                  >
                    <option value={1}>Fecha 1 · 08 nov</option>
                    <option value={2}>Fecha 2 · 15 nov</option>
                  </select>
                </label>
                <label>
                  Categoría
                  <select
                    aria-label="Categoría"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSelected(null);
                    }}
                  >
                    <option>Primera</option>
                    <option>Reserva</option>
                  </select>
                </label>
              </div>
              <div className="match-heading">
                <span>DOMINGO {round === 1 ? "08" : "15"} DE NOVIEMBRE</span>
                <span>HORA ARGENTINA</span>
              </div>
              <ul className="matches">
                {filtered.map((m) => (
                  <li className="match" key={m.id}>
                    <div className="match-meta">
                      <span
                        className={
                          m.status === "En juego" ? "badge live" : "badge"
                        }
                      >
                        {m.status === "En juego" && (
                          <span aria-hidden="true">● </span>
                        )}
                        {m.status}
                      </span>
                      <span>{m.time}</span>
                    </div>
                    <div className="teams">
                      <div>
                        <span className="club-icon" aria-hidden="true">
                          {m.home
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span>{m.home}</span>
                        <strong>{m.homeGoals ?? "–"}</strong>
                      </div>
                      <div>
                        <span className="club-icon away" aria-hidden="true">
                          {m.away
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span>{m.away}</span>
                        <strong>{m.awayGoals ?? "–"}</strong>
                      </div>
                    </div>
                    <div className="match-bottom">
                      <small>Actualizado: {formatTime(m.updated)}</small>
                      {view === "carga" && (
                        <button
                          className="text-button"
                          onClick={() => {
                            setSelected(m.id);
                            setNotice("");
                          }}
                          aria-label={`Editar ${m.home} contra ${m.away}`}
                        >
                          Cargar / corregir →
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="fixture-footer">
                {last
                  ? `Última actualización de esta selección: ${formatTime(last)} (Argentina)`
                  : "Sin partidos para esta selección."}
              </div>
            </section>
            <div role="status" className={notice ? "success" : ""}>
              {notice}
            </div>
            {view === "carga" && editing && (
              <Editor
                key={editing.id}
                match={editing}
                onCancel={() => setSelected(null)}
                onSave={(home, away, status, reason) => {
                  const now = new Date().toISOString();
                  setMatches((ms) =>
                    ms.map((m) =>
                      m.id === editing.id
                        ? {
                            ...m,
                            homeGoals: home,
                            awayGoals: away,
                            status,
                            updated: now,
                          }
                        : m,
                    ),
                  );
                  setHistory((h) => [
                    {
                      id: Date.now(),
                      time: now,
                      text: `${editing.home} / ${editing.away}: ${editing.homeGoals ?? "–"}–${editing.awayGoals ?? "–"} (${editing.status}) → ${home ?? "–"}–${away ?? "–"} (${status}). Motivo: ${reason}. Operador: colaborador demo.`,
                    },
                    ...h,
                  ]);
                  setSelected(null);
                  setNotice(
                    "Cambio guardado en memoria. Ya se refleja en Partidos; se perderá al recargar.",
                  );
                }}
              />
            )}
            {view === "carga" && history.length > 0 && (
              <section className="history">
                <h2>Cambios de esta sesión</h2>
                <ul>
                  {history.map((h) => (
                    <li key={h.id}>
                      <small>{formatTime(h.time)}</small>
                      <p>{h.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <aside className="sidebar">
            <section className="summary">
              <span className="eyebrow">LA JORNADA</span>
              <h2>Todo a mano.</h2>
              <p>
                Fecha {round} · {category}
              </p>
              <div className="stat">
                <strong>{live}</strong>
                <span>
                  en juego
                  <br />
                  en esta selección
                </span>
              </div>
              <p className="muted">
                Estados de ejemplo. No hay conexión con partidos reales.
              </p>
            </section>
            <section className="about">
              <span className="eyebrow">UN PROYECTO INDEPENDIENTE</span>
              <h2>Cerca de la cancha.</h2>
              <p>
                Una plataforma pensada para consultar y cargar resultados de
                forma sencilla.
              </p>
              <p>
                Esta demostración no representa información oficial de la Liga
                Esperancina.
              </p>
              <a href={view === "partidos" ? "#carga" : "#partidos"}>
                {view === "partidos"
                  ? "Probar la carga de resultados"
                  : "Volver a los partidos"}{" "}
                →
              </a>
            </section>
          </aside>
        </div>
      </main>
      <footer>
        <span className="footer-brand">ligaesp</span>
        <span>No oficial · Datos ficticios · Sin conexión a Copa Fácil</span>
        <span>Hecho para estar cerca.</span>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
