# Alcance propuesto del MVP

Estado: alcance actualizado como plataforma propia; desarrollo inicial con datos ficticios.

## Entrega de prototipo actual

Consulta y edición navegables con datos ficticios y estado en memoria. El panel de demostración no tiene autenticación; no satisface aún los requisitos de seguridad ni de persistencia del MVP de producción. Incluye filtros, marcadores, estados, actualización e historial temporal de correcciones. No incluye API, PostgreSQL, posiciones ni preparación de competiciones. Ver [ejecución y limitaciones](../README.md#ejecutar-el-prototipo).

## Objetivo

Construir una experiencia completa de consulta pública y carga de resultados mediante un panel propio, con PERN y TypeScript. Se puede diseñar y desarrollar con una competición ficticia acotada, sin depender de Copa Fácil, de una entrevista o de datos reales.

La cobertura real, el reglamento y los permisos siguen pendientes para publicar contenido real. Las reglas de demostración serán explícitas y no se presentarán como reglamento de la Liga.

## Alcance funcional propuesto

| Capacidad | Criterio de aceptación propuesto |
| --- | --- |
| Selección de competición, temporada y jornada | El contexto seleccionado es visible y no mezcla categorías o fases |
| Fixture y resultados | Cada partido muestra equipos, fecha/hora si se conoce y estado; distingue información pendiente de un valor cero |
| Consulta por equipo | Permite identificar sus partidos dentro de la cobertura seleccionada |
| Estado y actualización | Muestra la última actualización conocida y distingue programado, en juego, finalizado, suspendido o postergado, según el estado registrado por el operador |
| Tabla de posiciones | Coincide con casos contrastados, incluidos desempates y sanciones; en la demostración usa reglas ficticias documentadas; para contenido real requiere reglamento y datos validados |
| Transparencia y correcciones | Identifica el sitio como no oficial, explica la procedencia de los datos y ofrece un canal de contacto acordado |
| Experiencia móvil y accesible | La consulta principal funciona con teclado, tiene contraste legible y comunica estados sin depender solo del color |

Los nombres de los estados y la disponibilidad de horarios son propuestas. No se inferirán minutos de juego, resultados finales ni horarios que la fuente no proporcione.

## Panel propio y actualización

| Capacidad | Criterio de aceptación propuesto |
| --- | --- |
| Acceso privado | Solo operadores autenticados y autorizados pueden escribir; no hay registro público de administradores |
| Preparación de la competición | Permite cargar y editar una estructura acotada de competición, equipos, jornadas y partidos; no incluye un generador automático de torneos |
| Carga rápida de resultados | Permite localizar partidos por jornada, registrar marcador y estado desde el celular, sin exigir datos que aún se desconocen |
| Validación y confirmación | Rechaza marcadores inválidos, diferencia vacío de 0–0 y confirma si el guardado se realizó; ante error conserva lo ingresado para reintentar |
| Publicación y correcciones | Un guardado confirmado actualiza la consulta pública; las correcciones registran autor, fecha, valores anteriores y nuevos y motivo |
| Integridad ante edición simultánea | Detecta cambios posteriores a la apertura del formulario y evita sobrescribirlos silenciosamente |

El mecanismo y frecuencia de actualización de la vista pública se definirán durante el diseño. No se prometen minutos de juego ni actualización instantánea. El alcance de autenticación y auditoría se detalla en [seguridad y operación](04-seguridad-y-operacion.md).

La colaboración con el administrador de Copa Fácil es opcional y pendiente. API, importaciones, scraping y sincronización quedan fuera del MVP; se evaluarán por separado si existe una necesidad y autorización. No son requisitos para desarrollar la plataforma propia.

## Desarrollo con datos ficticios

Usar nombres, identidades visuales, torneos y resultados inventados, sin copiar datos personales ni recursos de terceros. Identificar la demostración como tal y mantener sus datos separados de los reales. Validar con ellos el recorrido completo: preparar partidos, cargar un parcial, finalizarlo, corregirlo y comprobar la consulta pública y la auditoría.

## Fuera del MVP

- Cuentas del público, comentarios, chat y contenido generado por usuarios.
- Pagos, apuestas, publicidad gestionada y tienda.
- Aplicaciones móviles nativas y notificaciones push.
- Estadísticas individuales, fichas de jugadores y datos personales de menores.
- Cobertura histórica completa, todas las divisiones o todas las disciplinas.
- Relato minuto a minuto, streaming y sincronización bidireccional con Copa Fácil.
- Sustituir la gestión integral de torneos del sistema actual.

## Requisitos no funcionales

- TypeScript en cliente y servidor; PostgreSQL como persistencia, Express/Node.js como API y React como interfaz.
- Credenciales y escritura restringidas al servidor y a responsables autorizados.
- Validación de entradas, manejo consistente de errores y pruebas de reglas deportivas que se implementen.
- Migraciones versionadas, despliegue reproducible y recuperación documentada.
- Priorizar WCAG 2.2 AA para los recorridos principales y comprobarlos antes del lanzamiento; aún no se declara conformidad.
- Definir objetivos de rendimiento y capacidad a partir del tráfico esperado, especialmente durante las jornadas.

## Decisiones de diseño pendientes, sin bloqueo por datos reales

- Precisar los campos mínimos y recorridos del panel con escenarios ficticios.
- Elegir reglas simples de demostración y documentarlas.
- Definir autenticación, refresco de consulta pública y objetivos de rendimiento.
- Fijar presupuesto y proveedores antes de contratar servicios.

## Condiciones para publicar contenido real

Esta sección centraliza los pendientes de publicación; no condiciona el diseño ni el desarrollo con datos ficticios.

- Acordar competición, temporada, categorías y fases cubiertas.
- Obtener y validar reglamento vigente, puntuación, desempates, sanciones y correcciones antes de publicar posiciones reales.
- Documentar procedencia, permisos y atribución correspondientes a datos, marcas y recursos visuales.
- Identificar responsables de carga, verificación, corrección y suplencia; acordar frecuencia y canal de contacto.
- Contrastar una jornada representativa y sus excepciones con información autorizada.
- Aceptar presupuesto y costos de excedentes.

## Condiciones técnicas para el lanzamiento

Ejecutar pruebas de consulta y panel, acceso denegado, validación, ediciones simultáneas, correcciones y errores de guardado; revisar accesibilidad y seguridad; comprobar copia y restauración; documentar responsables e incidentes. Una demostración publicada debe anunciar sus datos ficticios. Publicar contenido real exige además las condiciones de la sección anterior.
