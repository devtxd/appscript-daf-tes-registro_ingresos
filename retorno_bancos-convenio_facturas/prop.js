
/**
 * Este archivo genera las variables de entorno para Google Apps Script desde un archivo .env
 */

function setEnvVariables() {
  PropertiesService.getScriptProperties().setProperty('AUTHENTICATION_URL', 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sLNAQGX5O');
  PropertiesService.getScriptProperties().setProperty('CLIENT_ID', 'iuf0qe7ko4hpb27mscr63or6j');
  PropertiesService.getScriptProperties().setProperty('PASSWORD', '7Oa0uSd&jI35@0');
  PropertiesService.getScriptProperties().setProperty('USERNAME', 'admin.rpa@pucp.edu.pe');
  PropertiesService.getScriptProperties().setProperty('VERIFICATION_URL', 'https://sl4hkzlw3m.execute-api.us-east-1.amazonaws.com/prod/kissflow');
  PropertiesService.getScriptProperties().setProperty('KEY_ID_DAFTES', 'Ak6e001fdd-64d5-42cc-91dd-a455f81bd8ac');
  PropertiesService.getScriptProperties().setProperty('KEY_SECRET_DAFTES', 'O3MMP-37SKukV7kaKMTv1n5xpVl3xYae8BngHxA6DMlkBD1XV8h2o-gKikYLzSWpPWMzE16AP4zWc6UwV08tkA');

  Logger.log("Variables de entorno configuradas.");
}
