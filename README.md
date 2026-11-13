# ligaesp

Web **no oficial** de la Liga Esperancina de Fútbol. Proyecto de bajo presupuesto, desarrollado como portfolio profesional con PERN (PostgreSQL, Express, React y Node.js) y TypeScript.

Plataforma propia con consulta pública y un panel protegido previsto para facilitar la carga de resultados. El panel actual es una demostración sin autenticación. La posible colaboración con el administrador de Copa Fácil está pendiente y no condiciona el diseño ni el desarrollo con datos ficticios.

## Estado

Prototipo navegable con React, TypeScript y Vite. Incluye consulta por fecha y categoría, carga y corrección de resultados. Express y PostgreSQL se incorporarán en una etapa posterior.

La interfaz usa una paleta azul y un menú lateral con las nueve divisiones de referencia (en celulares, un menú desplegable). Las divisiones sin datos muestran un estado vacío; los partidos demo de Primera y Reserva se conservan sin reasignarlos.

## Documentación

- [Visión y necesidades](docs/01-vision-y-necesidades.md)
- [Alcance propuesto del MVP](docs/02-alcance-mvp.md)
- [Preguntas para el administrador de Copa Fácil](docs/03-descubrimiento-copa-facil.md)
- [Seguridad, datos y operación](docs/04-seguridad-y-operacion.md)
- [Proceso de trabajo y decisiones](docs/05-proceso-y-decisiones.md)

Los documentos distinguen requisitos confirmados, propuestas y preguntas abiertas. Describir una capacidad no implica que esté implementada o que su fuente de datos esté autorizada.

## Estructura

- `frontend/`: aplicación React + TypeScript + Vite, con su `package.json`, lockfile, `index.html` y configuración TypeScript. El código está en `frontend/src/`.
- `docs/`: alcance, necesidades y decisiones del proyecto.
- `AGENTS.md`: instrucciones de trabajo.

El frontend se ejecuta y compila desde `frontend/`; la raíz conserva la documentación compartida. El backend todavía no está creado y no tiene dependencias instaladas.

## Ejecutar el prototipo

Requiere Node.js 22.12 o superior (validado con Node.js 24) y npm.

Desde la raíz del repositorio en la terminal de VS Code (Windows / PowerShell):

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev -- --port 5173
```

`npm.cmd ci` solo es necesario al preparar las dependencias o actualizar la instalación según el lockfile. En Linux o macOS, usar `npm` en lugar de `npm.cmd`.

En una máquina local, abrir `http://localhost:5173`. En un entorno remoto, abrir el puerto 5173 mediante la vista previa o el reenvío de puertos disponible en el editor. El servidor escucha en todas las interfaces para permitir ese acceso; no equivale a un despliegue público. No exponerlo a Internet.

- `#partidos` (inicio): todos los encuentros de la fecha, agrupados por división, sin filtros de categoría ni estado. Cambiar de fecha con el selector o las flechas.
- Barra lateral: abrir una división para consultar sus partidos, tabla, goleadores y equipos. Se conserva la fecha al navegar durante la sesión; al recargar vuelve a Fecha 1. En celulares, abrir el botón Divisiones.
- `#carga`: seleccionar un partido, editar goles y estado, indicar motivo y guardar. Volver a Partidos para comprobar el cambio.
- Para corregir un error, abrir el mismo partido y guardar nuevamente con el motivo correspondiente. Cancelar descarta el formulario.

El directorio `#clubes` incluye los 30 clubes de https://ligaesperancina.com/clubes/, con búsqueda por nombre o localidad y contactos publicados. Copia estática consultada el 13/11/2026, sin sincronización automática ni asignación a divisiones. Los datos ausentes se indican como no publicados.

Los equipos de los partidos y sus resultados son ficticios. **Los cambios y el historial existen solo en memoria y se pierden al recargar**; no se usa localStorage ni API. La hora se presenta en Argentina. El panel está abierto, sin autenticación, exclusivamente para esta demostración: no debe usarse con datos reales ni credenciales. Las condiciones del MVP para producción siguen pendientes.

Desde `frontend/`:

```powershell
npm.cmd run build
npm.cmd run preview -- --port 4173
```

La compilación ejecuta TypeScript y genera `frontend/dist/`. `preview` permite revisar esa compilación en `http://localhost:4173`, sin publicar la web. Cada división tiene enlaces propios con Partidos, Tabla, Goleadores y Equipos (por ejemplo, `#division/Primera/tabla`). La tabla demo se calcula a partir de los partidos finalizados de todas las fechas y se actualiza al corregirlos en la sesión; no aplica un reglamento oficial. Goleadores muestra un estado sin datos porque no se registran autores de goles. Se usan acentos violetas sobre la base azul. No se implementan administración de competiciones ni controles de acceso de producción.

## Torneo de ejemplo

`#division/Primera/partidos` abre el **torneo de ejemplo de Primera**: 30 clubes, 29 fechas y 435 encuentros, todos contra todos a una rueda. Cada club tiene 14 o 15 localías. Las primeras dos fechas incluyen resultados inventados y el resto está programado. El calendario ficticio va del 08/11/2026 al 23/05/2027. El enlace anterior `#division/TorneoDemo/partidos` sigue funcionando.

Las posiciones se agrupan en Norte y Sur (13 clubes cada una), según las imágenes del usuario. Los cuatro clubes restantes figuran sin zona asignada. Es una agrupación visual: el fixture conserva cruces entre zonas y todos los resultados finalizados cuentan para los puntos. Los puntajes de las imágenes no se copiaron.

Corregir resultados actualiza la tabla y las fichas durante la sesión. Al recargar se restablece la muestra: no hay persistencia ni backend. La antigua muestra de Primera fue reemplazada por este torneo; Reserva se conserva por separado.

Para verificar fixture, zonas y posiciones: `cd frontend` y `node verify-tournament.cjs`.
