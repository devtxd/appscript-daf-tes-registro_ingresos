# Manejo del proyecto

Se emplearan dos proyectos independientes uno para desarrollo y otro para producción.

Ambos proyectos serán manejados a partir de un solo proyecto local. El control de versiones se realizara a traves de git y el versionamiento de clasp, siendo el versionamiento principal el controlado por git.

![sdd-framework-appscript.drawio.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/43f78099-e161-4bce-94ad-333d4c74f8e4/3f0ff8aa-47b5-43ac-90c5-ef7d7a250825/sdd-framework-appscript.drawio.png)

Comenzaremos creando el proyecto de desarrollo.

```bash
clasp create --title <project_name>-dev
```

Al crear el proyecto se tendrá la opción de seleccionar si el proyecto esta asociado a otro recurso como un GSheet, si es así ambos recursos toman el mismo nombre del proyecto empleado en el comando anterior.

Una vez terminado el desarrollo se creara el proyecto de producción.

La creación se tendrá que realizar en una carpeta diferente a la del proyecto.

```bash
clasp create --title <project_name>-prod
```

 Los proyectos appscript utilizan un archivo de configuración `.clasp.json`. El archivo de configuración se renombrara como `.clasp.prod.json` y se copiara a la carpeta principal modificando el `rootDir` por el valor manejado en el archivo de configuración de desarrollo.

El archivo `.clasp.json` generado al crear el proyecto de desarrollo se duplicara y se renombrara como `.clasp.dev.json` .

- Ejemplo `.clasp.json`

```json
{"scriptId":"1rhwbuxfWQi09QE6D00x_hzjFdQzeBtDT7g_lZS_d9zkKJdWRG1bioZCb","rootDir":"C:\\Users\\ferna\\Documents\\txd\\prod\\appscript\\appscript-daf-tes-registro_ingresos\\retorno_bancos-convenio_facturas","parentId":["1ZrSU5jv5H3ceoyxSBEF5MQpcD6Ex9fi_CHvv1xNyFCA"]}
```

## **Cambio entre proyecto de desarrollo y producción**

Como se menciono anteriormente en el proyecto se manejaran tres archivos de configuración:

- `.clasp.json`
- `.clasp.dev.json`
- `.clasp.prod.json`

El archivo que emplea clasp es el `.clasp.json` por lo que se utilizaran scripts definidos en el `package.json` para copiar las configuraciones de cada ambiente al archivo de configuración principal.

- Cambiar al proyecto de desarrollo

```bash
npm run change:dev
```

- Cambiar al proyecto de producción

```bash
npm run change:prod
```

## Desarrollo y pruebas

Se empleara como editor un IDE de forma local. Terminados los cambios en el código estos serán subidos al proyecto correspondiente.

```bash
clasp push
```

La ejecución del código se realizara directamente desde appscript.

## Ejecución local

Es posible probar el código localmente pero las configuraciones para realizarlo complican las experiencia de desarrollo por lo que se recomienda proceder como se menciono anteriormente.

Para mas detalle revisar:

https://github.com/google/clasp/blob/master/docs/run.md

### Tip

Revisar que se tengan los permisos requeridos para utilizar otros servicios en la consola de google y añadir los scopes en el archivo `appscript.json`

- Ejemplo `appscript.json`

```json
{
  "timeZone": "America/Lima",
  "dependencies":{},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "executionApi": {
    "access": "ANYONE"
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.send_mail"
  ]

}
```

## **Manejo de propiedades en Appscript**

Para el manejos de las variables de entorno se empleara dos archivos: 

- `.env.dev`
- `.env.prod`

Además del script `.generateEnvGs.js` que leerá el correspondiente archivo .env dependiendo del argumento proporcionado. 

- Ejecutar la secuencia `.generateEnv.js`

```bash
node .generateEnvGs.js "dev"/"prod"
```

- Se generara un archivo `env.<environment>.js`
- Subir los cambios al proyecto

```
clasp push
```

- Ejecutar la secuencia `env.<environment>.js` desde appscript, esto creara las propiedades automáticamente.
- Eliminar el archivo `env.<environment>.js` del entorno local

```bash
rm env.<environment>.js
```

- Subir los cambios al proyecto para eliminar las variables de entorno del código

```bash
clasp push
```

## Archivos ignore

Ejemplo `.claspignore`

```bash
# Ignorar todos los archivos que comienzan con un punto y terminan en .js
.generateEnvGs.js
# Ignorar la carpeta node_modules
**/node_modules/**
node_modules/
# Ignorar .env*
.env*
```

Ejemplo `.gitignore`

```bash
# Ignorar archivos .env y cualquier archivo que comience con .env
**.env*
# Ignorar archivos env.dev.js y env.prod.js temporales
env*.js
```

## Repositorio de ejemplo