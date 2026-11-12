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

La identidad se integra en la aplicación existente de `src/`, sin crear otro prototipo. Se conservan los filtros por fecha y categoría, los marcadores, los cinco estados y el circuito de carga, corrección e historial en memoria. Se suman accesos de categoría y filtros Todos / En juego / Finalizado con contadores y estado vacío.

La navegación lateral pasa a una cabecera compacta en celulares. Primera usa el verde de la referencia; Reserva conserva su nombre y usa azul `#2357B5` como adaptación visual, sin asumir que equivale a Tercera. Solo se muestran las categorías disponibles en los datos actuales. Los paneles laterales muestran el resumen de la selección y el carácter independiente del proyecto.

No se incorporan tablas, goleadores ni noticias ilustrativas de la referencia. Los equipos y resultados siguen siendo ficticios, los cambios se pierden al recargar y el panel continúa identificado como demostración sin autenticación. Se mantienen fuentes del sistema y escudos geométricos con iniciales.

Verificación: `npm.cmd run build` (TypeScript y Vite). La verificación visual en navegador y las pruebas completas de accesibilidad siguen pendientes.

## Ajuste visual posterior: consulta compacta

La referencia posterior del usuario prioriza verde oscuro, bloques compactos y marcador centrado entre equipos. Esta dirección reemplaza la cabecera deportiva y la navegación lateral anteriores. Se eliminan los paneles secundarios, las franjas decorativas y los accesos de categoría duplicados; se mantienen los selectores de fecha/categoría y los filtros por estado.

Cada fila presenta estado, horario, equipos con iniciales y marcador. En celulares los nombres pueden ocupar varias líneas. La actualización de la selección aparece al pie; el detalle por partido y la acción de corregir aparecen en la vista de carga. Los avisos de datos ficticios y sitio no oficial siguen visibles.
