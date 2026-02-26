/**
 * Este archivo se ejecuta como proceso hijo desde app.js con fork().
 * process.send(...) enviar un mansaje al proceso padre.
 */

process.send("Hola desde el Proceso Hijo!");