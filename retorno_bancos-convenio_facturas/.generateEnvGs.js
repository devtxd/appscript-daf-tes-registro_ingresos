const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar el archivo .env

// Obtener el argumento desde la línea de comandos
let environment= process.argv[2];  // El primer argumento después de "node script.js"

// Ruta del archivo .gs que se generará
const outputFilePath = path.join(__dirname, `prop.js`);

// Leer el archivo .env directamente para obtener solo las variables definidas allí
const envFilePath = path.join(__dirname, `.env.${environment}`);
const envContent = fs.readFileSync(envFilePath, 'utf8');

// Parsear el archivo .env manualmente
const envVariables = {};
envContent.split('\n').forEach(line => {
  // Ignorar líneas vacías o comentarios
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVariables[key.trim()] = value.trim();
    }
  }
});

// Verifica si se encontraron variables en el archivo .env
if (Object.keys(envVariables).length === 0) {
  console.error("No se encontraron variables en el archivo .env.");
  process.exit(1);
}

// Generar contenido para el archivo .gs
let gsContent = `
/**
 * Este archivo genera las variables de entorno para Google Apps Script desde un archivo .env
 */

function setEnvVariables() {
`;

for (const [key, value] of Object.entries(envVariables)) {
  gsContent += `  PropertiesService.getScriptProperties().setProperty('${key}', '${value}');\n`;
}

gsContent += `
  Logger.log("Variables de entorno configuradas.");
}
`;

// Escribir el contenido en el archivo .gs
fs.writeFileSync(outputFilePath, gsContent);

console.log(`Archivo .gs generado exitosamente en: ${outputFilePath}`);
