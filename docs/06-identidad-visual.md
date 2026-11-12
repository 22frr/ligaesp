# Identidad visual · Propuesta 02

Propuesta aceptada provisionalmente para continuar iterando. Nombre de trabajo: **100% LEF**. Portal independiente, no oficial.

## Dirección

Estructura compacta de consulta inspirada en la referencia de Promiedos: navegación lateral, selector de fecha, filtros y partidos agrupados por categoría. La cobertura y la diferenciación cromática parten de la captura de Copa Fácil facilitada por el usuario. No se copiaron logos, fotografías ni escudos de terceros.

Azul noche como base de marca, cabecera con tipografía deportiva y franjas diagonales. Cada categoría comparte su color entre menú, accesos, encabezados, pestañas y tablas; los nombres y códigos también permiten identificarlas sin depender solo del color.

| Categoría | Color |
| --- | --- |
| Regional Amateur · Litoral Sur | `#99621B` |
| Primera División | `#168244` |
| Tercera División | `#2357B5` |
| Quinta División | `#007EAC` |
| Sexta División | `#2C65B6` |
| Séptima División | `#8337B5` |
| Octava División | `#5937A2` |
| Preoctava | `#303846` |
| División Senior | `#C51F53` |

Las tablas usan fondos suaves del color de la categoría. En vivo lleva texto/minuto y rojo; los partidos finalizados o programados se distinguen mediante etiquetas. Se usan fuentes del sistema, sin solicitudes a proveedores externos.

## Límites

El prototipo es una herramienta de revisión visual. No incluye persistencia, autenticación, actualización en vivo ni cálculo reglamentario de posiciones. Los datos son ilustrativos y se reutilizan entre categorías y torneos. Los escudos son formas geométricas con iniciales. La adaptación móvil está implementada en CSS; la revisión visual y de accesibilidad completa sigue pendiente.

## Adaptación a React local

La identidad se integra en la aplicación existente de `frontend/src/`, sin crear otro prototipo. Se conservan los filtros por fecha y categoría, los marcadores, los cinco estados y el circuito de carga, corrección e historial en memoria. Se suman accesos de categoría y filtros Todos / En juego / Finalizado con contadores y estado vacío.

La navegación lateral pasa a una cabecera compacta en celulares. Primera usa el verde de la referencia; Reserva conserva su nombre y usa azul `#2357B5` como adaptación visual, sin asumir que equivale a Tercera. Solo se muestran las categorías disponibles en los datos actuales. Los paneles laterales muestran el resumen de la selección y el carácter independiente del proyecto.

No se incorporan tablas, goleadores ni noticias ilustrativas de la referencia. Los equipos y resultados siguen siendo ficticios, los cambios se pierden al recargar y el panel continúa identificado como demostración sin autenticación. Se mantienen fuentes del sistema y escudos geométricos con iniciales.

Verificación: `npm.cmd run build` (TypeScript y Vite). La verificación visual en navegador y las pruebas completas de accesibilidad siguen pendientes.

## Ajuste visual posterior: consulta compacta

La referencia posterior del usuario prioriza verde oscuro, bloques compactos y marcador centrado entre equipos. Esta dirección reemplaza la cabecera deportiva y la navegación lateral anteriores. Se eliminan los paneles secundarios, las franjas decorativas y los accesos de categoría duplicados; se mantienen los selectores de fecha/categoría y los filtros por estado.

Cada fila presenta estado, horario, equipos con iniciales y marcador. En celulares los nombres pueden ocupar varias líneas. La actualización de la selección aparece al pie; el detalle por partido y la acción de corregir aparecen en la vista de carga. Los avisos de datos ficticios y sitio no oficial siguen visibles.

## Ajuste actual: azul y divisiones

La nueva referencia reemplaza la paleta verde por azul noche, con acentos celestes. Se recupera el menú lateral con Regional Amateur · Litoral Sur, Primera, Tercera, Quinta, Sexta, Séptima, Octava, Preoctava y Senior; en celulares se presenta como una grilla. Los torneos se rotulan según la captura: Regional 2026 y Clausura 2026 para las divisiones restantes.

Seleccionar una división filtra los partidos y sincroniza el selector de categoría. Las divisiones sin datos muestran un estado vacío; no se duplican partidos ni se asume que Reserva equivale a Tercera. Reserva se conserva en un bloque separado de datos demo. Se mantiene el circuito existente de carga e historial en memoria.

## Secciones por división y acentos violetas

Se incorporan tonos violetas en el fondo, la selección lateral, pestañas y encabezados de tablas, conservando la base azul. Cada división tiene una URL con hash y accesos a Partidos, Tabla, Goleadores y Equipos. Los enlaces permiten abrir una sección directamente y usar el historial del navegador.

La tabla demo usa partidos finalizados de todas las fechas (victoria 3 puntos, empate 1; orden por puntos, diferencia de gol, goles a favor y nombre). Se recalcula con las correcciones en memoria, sin aplicar reglamentos oficiales. Los equipos se obtienen del fixture de cada división. Goleadores queda sin datos porque no hay autores de goles registrados; no se inventan nombres ni se duplican resultados entre divisiones.

## Inicio con jornada completa

La entrada pública muestra todos los partidos de la fecha agrupados por división, sin filtros de categoría ni estado. Cada grupo enlaza a la división y a su tabla. Solo se muestran grupos con datos, sin duplicar encuentros para completar divisiones vacías. La fecha se conserva al navegar durante la sesión.

Se refuerza la marca tipográfica 100% LEF y su identidad local, con filas compactas, encabezados rectos, separadores finos e iniciales simples en lugar de escudos ficticios. Se mantienen azul y violeta, con fondos planos y acentos en la selección. En celular las divisiones quedan en un menú desplegable que se cierra al elegir un enlace.
