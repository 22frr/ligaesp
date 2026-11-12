# ligaesp

Web **no oficial** de la Liga Esperancina de Fútbol. Proyecto de bajo presupuesto, desarrollado como portfolio profesional con PERN (PostgreSQL, Express, React y Node.js) y TypeScript.

Plataforma propia con consulta pública y panel protegido para facilitar la carga de resultados. La posible colaboración con el administrador de Copa Fácil está pendiente y no condiciona el diseño ni el desarrollo con datos ficticios.

## Estado

Etapa de descubrimiento y diseño visual. Se incluye un prototipo estático e interactivo con datos ficticios; todavía no hay backend, panel de carga ni aplicación PERN. La selección de versiones, proveedores y arquitectura detallada queda pendiente.

## Documentación

- [Visión y necesidades](docs/01-vision-y-necesidades.md)
- [Alcance propuesto del MVP](docs/02-alcance-mvp.md)
- [Preguntas para el administrador de Copa Fácil](docs/03-descubrimiento-copa-facil.md)
- [Seguridad, datos y operación](docs/04-seguridad-y-operacion.md)
- [Proceso de trabajo y decisiones](docs/05-proceso-y-decisiones.md)

Los documentos distinguen requisitos confirmados, propuestas y preguntas abiertas. Describir una capacidad no implica que esté implementada o que su fuente de datos esté autorizada.

## Prototipo visual

La propuesta de **100% LEF** está en [`prototype/`](prototype/index.html), con HTML, CSS y JavaScript sin dependencias. Para verla localmente desde la raíz del repositorio:

```sh
python3 -m http.server 8000 --directory prototype
```

Abrir `http://localhost:8000`. También se puede abrir `prototype/index.html` directamente.

Incluye navegación por las nueve categorías, filtros, cambio de fecha y vistas ilustrativas de posiciones y goleadores. No consulta servicios externos ni guarda cambios. Los marcadores, horarios, tablas, jugadores y escudos son ficticios; cambiar el torneo o la categoría no carga datos reales. Noticias es un espacio visual pendiente de contenido.

La identidad usa azul noche como base y un color por categoría, compartido entre navegación, encabezados, pestañas y tablas. Ver [identidad visual](docs/06-identidad-visual.md).

Este prototipo sirve para iterar el diseño y no reemplaza la implementación prevista con PERN y TypeScript. No incluye credenciales, configuración privada de hosting ni archivos temporales de publicación.
