# Seguridad, datos y operación

Estado: criterios de diseño propuestos; controles aún no implementados ni verificados.

## Activos y límites de confianza

Proteger la integridad de resultados y tablas, las credenciales, la base de datos y la capacidad de operar con un presupuesto limitado. El navegador, las entradas de usuarios y los datos importados se consideran no confiables. La carga manual puede contener errores; cualquier fuente externa futura también requerirá validación.

## Riesgos y controles previstos

| Riesgo | Criterio de diseño y validación |
| --- | --- |
| Escritura no autorizada | Público de solo lectura; autenticación y autorización en servidor para toda operación privilegiada; probar acceso denegado |
| Inyección y contenido malicioso | Consultas parametrizadas, esquemas de validación y salida segura; probar entradas inválidas y contenido importado |
| Exposición de secretos | Secretos en configuración segura del servidor, nunca en Git, cliente, capturas o logs; revisar cambios antes de publicar |
| Abuso y costos inesperados | Límites de solicitudes y tamaños, paginación, caché cuando corresponda y alertas de consumo; comprobar respuesta ante exceso |
| Datos duplicados o incorrectos | Identificadores estables, validación y detección de conflictos entre ediciones; importaciones idempotentes si se incorporan en el futuro; conservar origen y fecha y contrastar correcciones |
| Pérdida de información | Copias protegidas y restauración probada; acordar pérdida y tiempo de recuperación tolerables antes de producción |
| Dependencias vulnerables | Versiones soportadas, lockfile, revisión de dependencias y actualizaciones planificadas; evaluar hallazgos por impacto |
| Fallo de guardado o servicio | Conservar último resultado confirmado, informar el error sin simular éxito y permitir reintentar sin duplicar cambios; probar indisponibilidad |

## Seguridad del panel propio

Preferir una solución de autenticación mantenida y evitar cuentas compartidas. Aplicar mínimo privilegio, revocación de acceso, protección contra fuerza bruta y MFA cuando sea viable. Si se usan cookies de sesión, definir atributos seguros y protección CSRF. CORS debe ser explícito y nunca sustituye la autorización.

Registrar quién cambió un resultado, cuándo, el valor anterior y el nuevo y, cuando corresponda, el motivo. Proteger el registro y definir su retención; no registrar secretos ni datos personales innecesarios.

## Datos ficticios y publicación real

El desarrollo usa datos e identidades inventados y señalizados como demostración. No necesita integración externa. La cobertura, reglamento y permisos previos a publicar contenido real se centralizan en el [alcance del MVP](02-alcance-mvp.md).

## Datos, permisos y privacidad

- Recopilar solo los datos necesarios para la consulta deportiva del MVP.
- Excluir inicialmente fichas personales y datos de menores.
- Documentar fuente, autorización, atribución y restricciones antes de reutilizar datos o recursos visuales.
- No asumir que un dato visible públicamente autoriza cualquier forma de extracción o reutilización.
- Evitar analítica invasiva; decidir si hace falta medir visitas antes de incorporar terceros.
- Definir aviso de privacidad según los datos y servicios realmente utilizados; revisar las obligaciones aplicables antes de publicar.

## Operación mínima

La opción inicial a evaluar es una aplicación sencilla con una base PostgreSQL, sin microservicios ni infraestructura compleja. La distribución de frontend y API, el alojamiento y los proveedores se decidirán después de estimar costos y requisitos.

Antes del lanzamiento se deben definir:

- Responsable técnico, responsable de datos y suplencias.
- Presupuesto mensual máximo, alertas y respuesta a excedentes; incluir dominio, copias, tráfico y restricciones de planes gratuitos.
- Entornos de desarrollo y producción separados; pruebas con datos sintéticos o autorizados, sin copiar credenciales de producción.
- Migraciones, despliegue y procedimiento de reversión compatible con cambios de base de datos.
- Monitoreo de errores, disponibilidad y antigüedad de datos, sin información sensible en logs.
- Frecuencia y retención de copias, acceso a ellas y ensayo de restauración.
- Canal para reportar errores de datos y vulnerabilidades, y responsables de respuesta.

## Respuesta básica a incidentes

Evaluar impacto y contener el problema: suspender importaciones o escrituras si afectan la integridad, revocar credenciales comprometidas, preservar evidencia sin exponer secretos y comunicar el estado. Recuperar desde una fuente o copia validada, verificar resultados y registrar causa y acciones preventivas. No prometer tiempos de respuesta hasta contar con responsables disponibles.
