/**
 * Ejemplo minimo para entender process.argv.
 * 
 * Esto es un Arra con 
 * [0] Ruta ejecutable de node
 * [1] Ruta al archivo actual
 * [2 ..] Argumentos que escribe el usuario
 * 
 * Ejemplo: node argumentos.js hola 123 
 */

console.log(process.argv);

// Si solo quiero ver los argumentos del usuario
console.log(process.argv.slice(2));