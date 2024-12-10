# Manejo de propiedades en Appscript
- Se ejecutara la secuencia .generateEnv.js
```
node .generateEnvGs.js "dev"/"prod"
```
- Se generara un archivo env.{environment}.js que permitira crear las propiedades automaticamente.
- Se subira los cambios
```
clasp push
```
- Se ejecura la secuencia env.{environment}.js desde appscript, esto creara las propiedades automaticamente.
- Se eliminara el archivo env.{environment}.js del entorno local
```
env.{environment}.js
```
- Se actualizara el proyecto nuevamente
```
clasp push
```
# Cambio entre proyectos de desarrollo y producción
Se maneja dos archivos .clasp.{environment}.json para la configuración de los proyectos de appscript. En el package.json se manejan scripts para automatizar el manejo de ambientes.
- Para cambiar a desarrollo
```
npm run change:dev
```
- Para cambiar a producción
```
npm run change:prod
```