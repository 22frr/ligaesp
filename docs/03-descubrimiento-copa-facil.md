# Descubrimiento con el administrador de Copa Fácil

Estado: colaboración opcional pendiente; cuestionario preparado, sin entrevista realizada.

## Objetivo y preparación

Conocer el trabajo actual, detectar necesidades que mejoren el panel propio y explorar una posible colaboración. Esta entrevista no es un requisito para diseñar o desarrollar con datos ficticios. Pedir una demostración de una jornada normal y una corrección, usando datos públicos o anonimizados. No pedir contraseñas, tokens ni acceso a cuentas personales durante la entrevista.

Las preguntas sobre acceso técnico solo se tratarán si existe interés mutuo en una integración futura. No se presume API, exportación ni acuerdo. Los requisitos de publicación real se centralizan en el [alcance del MVP](02-alcance-mvp.md).

## Preguntas prioritarias

| Tema | Preguntas | Decisión que habilita |
| --- | --- | --- |
| Responsabilidad y permisos | ¿Cuál es tu función? ¿Quién puede autorizar la reutilización y publicación de los datos? ¿Se necesita consultar a la Liga, los clubes o Copa Fácil? | Responsable de autorización y límites de uso |
| Flujo actual | ¿Quién informa cada resultado, por qué canal y quién lo verifica? ¿Qué pasos seguís para cargarlo? ¿Cuánto trabajo demanda una jornada? | Evitar duplicación y conocer controles |
| Cobertura inicial | ¿Qué torneos, categorías, fases y temporada conviene cubrir primero? ¿Cuál sería una primera versión realmente útil? | Límite del MVP |
| Acceso técnico opcional, fuera del MVP | ¿Hay API, exportaciones, webhooks o documentación oficial? ¿En qué plan y con qué costo, permisos y límites? ¿Quién puede confirmarlo? | Viabilidad y método de actualización |
| Datos de muestra | ¿Podés compartir una exportación autorizada o ejemplos públicos que incluyan identificadores, horarios, estados y correcciones? | Contrato de datos y pruebas |
| Vivo y frescura | ¿Qué significa “en vivo” hoy? ¿Se cargan goles, parciales, minutos o solo resultados? ¿Qué demoras son habituales y cuáles son aceptables? | Expectativa de actualización honesta |
| Confirmación y corrección | ¿Cuándo un resultado se considera final? ¿Quién puede corregirlo? ¿Cómo se comunican cambios posteriores y cómo queda registro? | Estados, auditoría y reconciliación |
| Reglas deportivas | ¿Dónde está el reglamento vigente? ¿Cómo funcionan puntos, desempates, fases, arrastre, descuentos y fallos del tribunal? | Cálculo o publicación de posiciones |
| Continuidad | ¿Quién carga si no estás? ¿Qué pasa sin conexión o si Copa Fácil falla? ¿Es viable mantener dos sistemas? | Operación sostenible y contingencia |
| Costos y contacto | ¿Hay costos por exportar o integrar? ¿Quién mantiene el contacto técnico y atiende errores durante una fecha? | Presupuesto y soporte |

## Casos a recorrer en la demostración

- Partido programado sin horario confirmado y cambio posterior de sede o fecha.
- Empate 0–0 frente a partido sin resultado cargado.
- Resultado parcial, final y corregido después del cierre.
- Suspensión, postergación, abandono y resultado administrativo.
- Equipos con nombres similares y participación en distintas categorías.
- Cambio de fase y empate en puntos con criterio de desempate.
- Eliminatoria con penales o resultado global, si aplica a la cobertura.

## Derechos, identidad y datos personales

- ¿Qué condiciones rigen la publicación de fixtures, resultados y tablas? ¿Cómo debe citarse la fuente?
- ¿Se permite utilizar nombres, escudos, fotografías o marcas? ¿Quién puede autorizar cada recurso?
- ¿Los datos incluyen nombres, contactos o información de menores que debamos excluir?
- ¿Cómo se gestionarán pedidos de corrección, retiro de contenido y consultas del público?
- ¿Qué aviso de sitio no oficial evita confusión con la Liga y con Copa Fácil?

## Registro de respuestas

Para cada respuesta registrar: pregunta, respuesta, persona y rol, fecha, evidencia o enlace, restricciones y estado (confirmado / por confirmar). Una opinión del entrevistado no equivale a una autorización de terceros.

| Pendiente | Responsable | Estado |
| --- | --- | --- |
| Identificar autoridad que habilita el uso de datos | Por asignar | Abierto |
| Obtener muestra autorizada y confirmar mecanismo técnico | Por asignar | Abierto |
| Obtener reglamento y ejemplos de excepciones | Por asignar | Abierto |
| Acordar cobertura, frecuencia y carga operativa | Por asignar | Abierto |
| Acordar permisos de identidad visual y atribución | Por asignar | Abierto |

## Resultado esperado

Una síntesis de necesidades del operador, posibles acuerdos y dudas, con evidencia de cualquier autorización obtenida. La ausencia de colaboración o integración no bloquea la plataforma propia ni el desarrollo con datos ficticios.
