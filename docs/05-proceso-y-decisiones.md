# Proceso de trabajo y decisiones

## Forma de trabajo

1. Acordar recorridos de consulta y carga, usando escenarios y reglas ficticios.
2. Diseñar experiencia móvil, panel protegido, modelo de datos, arquitectura y riesgos.
3. Implementar recorridos pequeños con pruebas, revisión y documentación, cuando se solicite iniciar desarrollo.
4. Validar la demostración completa con datos ficticios, seguridad, accesibilidad y recuperación.
5. Preparar contenido real solo al resolver las [condiciones de publicación](02-alcance-mvp.md#condiciones-para-publicar-contenido-real).

El repositorio incluye documentación y un prototipo visual estático para iterar la identidad. La aplicación PERN sigue pendiente. El diseño y desarrollo posteriores no dependen de una colaboración con Copa Fácil. La entrevista puede realizarse en paralelo si surge esa posibilidad.

## Disciplina del repositorio

- Mantener tareas con problema, alcance y criterios de aceptación explícitos.
- Usar cambios pequeños y revisables; explicar propósito, validación y limitaciones en cada solicitud de cambios.
- Separar correcciones, funcionalidades y cambios de infraestructura cuando facilite su revisión.
- Mantener secretos fuera de Git y usar ejemplos sin valores sensibles.
- Registrar decisiones relevantes con contexto, opciones, decisión y consecuencias.
- Actualizar documentación cuando cambien alcance, operación o contratos de datos.
- Usar el checkout existente en las tareas de nube; cada tarea ya tiene un entorno aislado. No crear worktrees salvo pedido explícito.

## Criterio de finalización de futuras entregas

Un cambio estará terminado cuando cumpla sus criterios de aceptación, tenga revisión y pruebas proporcionales al riesgo, gestione errores, contemple seguridad y accesibilidad aplicables y actualice la documentación necesaria. Las reglas de puntuación, carga y corrección requerirán pruebas representativas, incluidas correcciones y excepciones. Los controles concretos de CI se elegirán al iniciar la implementación.

## Decisiones y pendientes

| ID | Tema | Estado | Definición o siguiente paso |
| --- | --- | --- | --- |
| D-001 | Stack | Confirmado por el promotor | PostgreSQL, Express, React, Node.js y TypeScript; versiones pendientes |
| D-002 | Identidad | Confirmado por el promotor | Web no oficial; reflejarlo en la interfaz y documentación |
| D-003 | Recursos | Confirmado por el promotor | Bajo presupuesto y finalidad de portfolio; falta fijar límite monetario |
| D-004 | Etapa actual | Confirmado por el promotor | Documentación y prototipo visual estático con datos ficticios; aplicación PERN pendiente |
| D-005 | Colaboración con Copa Fácil | Opcional y pendiente | No condiciona el desarrollo; integración fuera del MVP |
| D-006 | Cobertura real | Pendiente para publicación real | Desarrollar mientras tanto con una competición ficticia acotada |
| D-007 | Posiciones | Propuesta | Reglas ficticias documentadas en demostración; reglamento validado para posiciones reales |
| D-008 | Panel propio | Confirmado por el promotor | Incluido en MVP para facilitar carga y correcciones con acceso protegido |
| D-009 | Hosting y arquitectura | Pendiente | Comparar costos, mantenimiento, respaldo y límites de uso |

## Próximo paso

Definir los recorridos de consulta y panel con una jornada ficticia y sus excepciones. Si se concreta una conversación con el administrador actual, usar el [cuestionario opcional](03-descubrimiento-copa-facil.md) para mejorar el diseño y explorar colaboración.

## Organización documental

El alcance funcional y las condiciones para publicar contenido real tienen su referencia principal en el documento de MVP. Visión explica el propósito; el cuestionario reúne preguntas; seguridad describe controles; este documento registra proceso y decisiones. Las referencias cruzadas evitan mantener listas normativas duplicadas.

## Validación de esta entrega

Revisión del contenido del repositorio, enlaces relativos y cambios de documentación. Para el prototipo visual se comprobó la sintaxis de JavaScript. La revisión visual en navegador quedó pendiente por un fallo de la infraestructura de vista previa; aún no hay pruebas del MVP. No se verificaron servicios externos de Copa Fácil ni se realizaron contactos con terceros.
