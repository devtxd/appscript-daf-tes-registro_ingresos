function archivarFiles(folderIn,folderOut) {
  let carpetaOrigen = DriveApp.getFolderById(folderIn);
  let carpetaDestino = DriveApp.getFolderById(folderOut);
  
  let archivos = carpetaOrigen.getFiles();
  
  while (archivos.hasNext()) {
    let archivo = archivos.next();
    archivo.moveTo(carpetaDestino);
  }
}
