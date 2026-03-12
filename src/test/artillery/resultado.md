# Resultado del Test

## 🔍 ¿Qué obtenés con este test?

Este test está simulando:

* **60 segundos** de tráfico continuo.
* Con una **llegada de 10 usuarios por segundo**.
* Que hacen una solicitud `GET` a `http://localhost:5000/test`.

Entonces:

* En total se generan alrededor de **600 requests** (`10 x 60`).
* Podés ver cómo responde tu servidor bajo carga sostenida.

---

## 🧠 ¿Para qué te sirve esta información?

1. **Evaluar performance básica**:

   * ¿Tu servidor puede manejar 10 solicitudes por segundo sin errores?
   * ¿Cuál es el tiempo de respuesta promedio?
   * ¿Hay fallos cuando se alcanza cierto nivel de carga?

2. **Detectar cuellos de botella**:

   * Si la memoria sube, CPU se dispara o los tiempos de respuesta crecen, tenés un problema de escalabilidad.
   * Artillery ayuda a ver cómo se comporta tu app en condiciones realistas.

3. **Medir antes y después de cambios**:

   * Por ejemplo: ¿Qué pasa si usás compresión GZIP? ¿O si agregás caching?
   * Podés medir y comparar resultados reales.

4. **Documentar y automatizar pruebas de estrés**:

   * Podés agregarlo a pipelines para monitorear regresiones de performance.

---

## 📈 Resultado típico de Artillery

Al finalizar, te muestra un resumen:

```cmd
Summary report @ 17:34:56(+0000) 2025-05-24
  Scenarios launched: 600
  Scenarios completed: 600
  Requests completed: 600
  RPS sent: 10.02
  Response time (msec):
    min: 2
    max: 25
    median: 5
    p95: 10
    p99: 20
```

Esto te da:

* **RPS (requests per second)**: rendimiento sostenido.
* **P95, P99**: cuántos milisegundos tardó el 95% y 99% de los requests (muy útil).
* **Errores**: si hubo errores HTTP, timeouts, etc.
