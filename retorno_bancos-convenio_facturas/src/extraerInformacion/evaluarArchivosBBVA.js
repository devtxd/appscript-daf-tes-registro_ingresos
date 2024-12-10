function evaluarArchivosBBVA(folderInBBVA,folderExcel) { 

  let carpeta_central = DriveApp.getFolderById(folderInBBVA); 
  let archivos_unidades = carpeta_central.getFiles();

  while(archivos_unidades.hasNext()){

    let unidad = archivos_unidades.next();
    let fileName = unidad.getName();
    let fileId = unidad.getId();

    let extension=getExtension(fileName)
    console.log(fileName)
    if(extension=="xlsx"){
      convertirExcelAGoogleSheets(fileId,folderInBBVA,folderExcel)
    }
   

  }

   
}