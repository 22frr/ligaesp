# ligaesp

Web **no oficial** de la Liga Esperancina de Fútbol. Proyecto de bajo presupuesto, desarrollado como portfolio profesional con PERN (PostgreSQL, Express, React y Node.js) y TypeScript.

Plataforma propia con consulta pública y panel protegido para facilitar la carga de resultados. La posible colaboración con el administrador de Copa Fácil está pendiente y no condiciona el diseño ni el desarrollo con datos ficticios.

## Estado

Prototipo navegable con React, TypeScript y Vite. Incluye consulta por fecha y categoría, carga y corrección de resultados. Express y PostgreSQL se incorporarán en una etapa posterior.

## Documentación

- [Visión y necesidades](docs/01-vision-y-necesidades.md)
- [Alcance propuesto del MVP](docs/02-alcance-mvp.md)
- [Preguntas para el administrador de Copa Fácil](docs/03-descubrimiento-copa-facil.md)
- [Seguridad, datos y operación](docs/04-seguridad-y-operacion.md)
- [Proceso de trabajo y decisiones](docs/05-proceso-y-decisiones.md)

Los documentos distinguen requisitos confirmados, propuestas y preguntas abiertas. Describir una capacidad no implica que esté implementada o que su fuente de datos esté autorizada.

## Ejecutar el prototipo

Requiere Node.js 22.12 o superior (validado con Node.js 24) y npm.

```bash
cd /workspace/ligaesp
npm ci --cache /tmp/ligaesp-npm-cache
npm run dev -- --port 5173
```

En una máquina local, abrir `http://localhost:5173`. En un entorno remoto, abrir el puerto 5173 mediante la vista previa o el reenvío de puertos disponible en el editor. El servidor escucha en todas las interfaces para permitir ese acceso; no equivale a un despliegue público. No exponerlo a Internet.

- `#partidos`: consulta pública; filtrar fecha y categoría.
- `#carga`: seleccionar un partido, editar goles y estado, indicar motivo y guardar. Volver a Partidos para comprobar el cambio.
- Para corregir un error, abrir el mismo partido y guardar nuevamente con el motivo correspondiente. Cancelar descarta el formulario.

Todos los equipos y resultados son ficticios. **Los cambios y el historial existen solo en memoria y se pierden al recargar**; no se usa localStorage ni API. La hora se presenta en Argentina. El panel está abierto, sin autenticación, exclusivamente para esta demostración: no debe usarse con datos reales ni credenciales. Las condiciones del MVP para producción siguen pendientes.

```bash
npm run build
npm run preview -- --port 4173
```

La compilación ejecuta TypeScript y genera `dist/`. `preview` permite revisar esa compilación en el puerto 4173, sin publicar la web. Este prototipo no implementa posiciones, administración de competiciones ni controles de acceso de producción.
