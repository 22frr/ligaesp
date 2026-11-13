export const statuses = [
  "Programado",
  "En juego",
  "Finalizado",
  "Suspendido",
  "Postergado",
] as const;
export type Status = (typeof statuses)[number];
export type Match = {
  homeClubId?: string;
  awayClubId?: string;
  id: number;
  round: number;
  category: string;
  home: string;
  away: string;
  homeGoals: number | null;
  awayGoals: number | null;
  status: Status;
  time: string;
  updated: string;
};
const initialTime = "2026-11-08T17:10:00-03:00";
export const initialMatches: Match[] = [
  {
    id: 1,
    round: 1,
    category: "Primera",
    home: "Atlético del Molino",
    away: "Deportivo Los Aromos",
    homeGoals: 2,
    awayGoals: 1,
    status: "En juego",
    time: "16:00",
    updated: initialTime,
  },
  {
    id: 2,
    round: 1,
    category: "Primera",
    home: "Unión del Parque",
    away: "Sportivo La Ribera",
    homeGoals: 0,
    awayGoals: 0,
    status: "Finalizado",
    time: "14:00",
    updated: initialTime,
  },
  {
    id: 3,
    round: 1,
    category: "Primera",
    home: "Club Horizonte",
    away: "Juventud del Monte",
    homeGoals: null,
    awayGoals: null,
    status: "Programado",
    time: "18:00",
    updated: initialTime,
  },
  {
    id: 4,
    round: 1,
    category: "Primera",
    home: "Defensores del Trigal",
    away: "Estrella del Sur",
    homeGoals: 1,
    awayGoals: 0,
    status: "Suspendido",
    time: "16:00",
    updated: initialTime,
  },
  {
    id: 5,
    round: 1,
    category: "Reserva",
    home: "Atlético del Molino",
    away: "Deportivo Los Aromos",
    homeGoals: 1,
    awayGoals: 3,
    status: "Finalizado",
    time: "14:00",
    updated: initialTime,
  },
  {
    id: 6,
    round: 1,
    category: "Reserva",
    home: "Unión del Parque",
    away: "Sportivo La Ribera",
    homeGoals: null,
    awayGoals: null,
    status: "Postergado",
    time: "14:00",
    updated: initialTime,
  },
  {
    id: 7,
    round: 2,
    category: "Primera",
    home: "Sportivo La Ribera",
    away: "Atlético del Molino",
    homeGoals: null,
    awayGoals: null,
    status: "Programado",
    time: "16:00",
    updated: initialTime,
  },
  {
    id: 8,
    round: 2,
    category: "Reserva",
    home: "Deportivo Los Aromos",
    away: "Unión del Parque",
    homeGoals: null,
    awayGoals: null,
    status: "Programado",
    time: "14:00",
    updated: initialTime,
  },
];
export const formatTime = (value: string) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(value));
export function validateScore(
  home: string,
  away: string,
  status: Status,
): string | null {
  if ((home === "") !== (away === ""))
    return "Completá ambos marcadores o dejá ambos vacíos.";
  if (
    [home, away].some(
      (v) =>
        v !== "" &&
        (!/^\d+$/.test(v) ||
          !Number.isSafeInteger(Number(v)) ||
          Number(v) > 99),
    )
  )
    return "Los goles deben ser números enteros entre 0 y 99.";
  if ((status === "En juego" || status === "Finalizado") && home === "")
    return "Un partido en juego o finalizado necesita ambos marcadores.";
  if ((status === "Programado" || status === "Postergado") && home !== "")
    return "Un partido programado o postergado debe tener los marcadores vacíos.";
  return null;
}
