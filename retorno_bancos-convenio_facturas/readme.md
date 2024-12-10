# Manejo de propiedades en Appscript
Se ejecutara la secuencia .generateEnv.js
```node .generateEnvGs.js "dev"/"prod"```
Se generara un archivo env.<environment>.js que permitira crear las propiedades automaticamente.
Se subira los cambios
```clasp push```
Se ejecura la secuencia env.<environment>.js desde appscript, esto creara las propiedades automaticamente.
Se eliminara el archivo env.<environment>.js del entorno local
```env.<environment>.js```
Se actualizar el proyecto nuevamente
```clasp push```
