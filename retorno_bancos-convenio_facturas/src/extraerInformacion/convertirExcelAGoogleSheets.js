function convertirExcelAGoogleSheets(fileId,folderDestino,folderExcel) {
  // Obtener el archivo de Excel y el blob correspondiente
  var archivoExcel = DriveApp.getFileById(fileId);
  var blobExcel = archivoExcel.getBlob();

  console.log(archivoExcel)

  let config = {
    name: archivoExcel.getName(),
    parents: [{id: archivoExcel.getParents().next().getId()}],
    mimeType: MimeType.GOOGLE_SHEETS
  };

  // Convertir el archivo de Excel a una hoja de cálculo de Google Sheets
  var archivoSheets = Drive.Files.create(config, blobExcel);
  var idArchivoSheets = archivoSheets.id;
  
  // Mover el archivo de Google Sheets a la carpeta de destino
  var carpetaDestino = DriveApp.getFolderById(folderDestino);
  var carpetaArchivado = DriveApp.getFolderById(folderExcel);
  DriveApp.getFileById(idArchivoSheets).moveTo(carpetaDestino)
  DriveApp.getFileById(fileId).moveTo(carpetaArchivado)
  //DriveApp.getFileById(idArchivoSheets).getParents().next().removeFile(DriveApp.getFileById(idArchivoSheets));
  
  // Eliminar el archivo de Excel
  //archivoExcel.setTrashed(true);

  // Devolver el ID del archivo de Google Sheets
  return idArchivoSheets;
}
