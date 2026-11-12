# Instrucciones de trabajo para ligaesp

## Entorno y alcance

- Trabajar en la carpeta local abierta en VS Code. Antes de editar, revisar la rama actual, el estado de Git y las instrucciones del repositorio. Conservar cualquier trabajo existente.
- Implementar lo solicitado y resolver los detalles técnicos necesarios. Consultar al usuario antes de ampliar el alcance o hacer cambios importantes de arquitectura.
- Mantener PERN (PostgreSQL, Express, React y Node.js) y TypeScript como stack del proyecto. Identificar los datos ficticios y no presentar funcionalidades pendientes como implementadas.

## Revisión y Git

- El usuario debe poder revisar los cambios en el código y en el navegador antes de guardarlos en Git.
- No hacer commit, push, merge, publicación ni cambios de rama sin una solicitud explícita del usuario.
- Usar `main` como versión estable y ramas por tarea. No crear ramas por ajustes pequeños de una misma tarea. La creación de una rama debe estar autorizada por el usuario.

## Verificación y entrega

- Verificar cada cambio con compilación y pruebas proporcionales. Para cambios solo de documentación, revisar el contenido y el diff; no hace falta compilar la aplicación.
- En este entorno Windows, usar `npm.cmd` para ejecutar los comandos de npm.
- Al terminar, resumir qué cambió, qué se verificó y cómo verlo localmente. Indicar las verificaciones pendientes, incluida la revisión en navegador cuando no se haya realizado.
- Mantener documentación breve y útil para el portfolio: README actualizado, alcance y decisiones técnicas relevantes. No generar documentos ni registros por cada ajuste menor.

## Trabajo desde la nube

- Si el usuario trabaja desde el celular en la nube, aclarar que los cambios quedan en otro entorno.
- Para traer esos cambios a la computadora habrá que transferirlos mediante GitHub. Hacer commit y push únicamente cuando el usuario lo autorice explícitamente.
