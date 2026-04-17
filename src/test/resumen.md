# Resumen de prueba de carga con Artillery

## Contexto de la ejecución

- Archivo ejecutado: `src/test/test.yml`
- Comando usado: `artillery run src/test/test.yml`
- Fecha/hora de finalización reportada: `16/04/2026 21:02:59 (-0300)`
- Objetivo configurado: `http://localhost:8000`
- Duración de la fase: `60s`
- Tasa de llegada configurada: `10 usuarios virtuales/segundo`

## Resumen general de resultados

- Requests totales: `600`
- Responses totales: `600`
- Usuarios virtuales creados: `600`
- Usuarios virtuales completados: `600`
- Usuarios virtuales fallidos: `0`
- Código HTTP observado: `200` en `600/600` respuestas (`100%`)
- Throughput promedio: `10 req/s`
- Bytes descargados: `1.200`

## Métricas de tiempo de respuesta

- Mínimo: `0 ms`
- Máximo: `3 ms`
- Mediana: `1 ms`
- Percentil 95: `1 ms`
- Percentil 99: `1 ms`

## Métricas de duración de sesión

- Mínima: `1.8 s`
- Máxima: `20.4 s`
- Mediana: `2.4 s`
- Percentil 95: `3.8 s`
- Percentil 99: `18.4 s`

## Observaciones relevantes

1. La prueba completó correctamente sin errores funcionales ni usuarios virtuales fallidos.
2. El `100%` de las respuestas devolvió `200 OK`, por lo que el escenario probado respondió correctamente durante toda la ejecución.
3. La latencia observada fue muy baja y estable:
   - mediana de `1 ms`
   - p95 de `1 ms`
   - p99 de `1 ms`
4. No se observan señales de degradación bajo la carga configurada de `10 req/s` durante `60` segundos.
5. El volumen de datos descargados fue bajo (`1.200 bytes` en total), lo que sugiere que el endpoint probado devuelve una respuesta mínima.

## Conclusión

La prueba de carga fue exitosa para la configuración utilizada. El sistema respondió de forma estable, sin errores y con tiempos de respuesta muy bajos durante toda la ventana de ejecución. Para este nivel de carga, el endpoint evaluado se comportó correctamente.

## Comparación con la corrida anterior

- En la corrida anterior, el `100%` de las respuestas devolvía `404`.
- En esta corrida, el `100%` de las respuestas devolvió `200`.
- Esto confirma que el problema previo no era de rendimiento sino de configuración de la ruta probada.

## Próximos pasos sugeridos

1. Si querés una evaluación más exigente, aumentar `arrivalRate` y/o agregar más fases.
2. Probar endpoints con lógica real de negocio, no sólo uno de respuesta liviana.
3. Medir también escenarios con autenticación, creación de recursos o consultas a base de datos para obtener una referencia más representativa.
