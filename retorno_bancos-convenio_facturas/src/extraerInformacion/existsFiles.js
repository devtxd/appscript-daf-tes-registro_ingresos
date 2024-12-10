function existsFiles(folderIn) {

  let carpeta_central = DriveApp.getFolderById(folderIn); 
  let archivos_unidades = carpeta_central.getFiles();

  let numeroDeArchivos = 0;
  let exists=false;

  while(archivos_unidades.hasNext()){
    numeroDeArchivos++;
    archivos_unidades.next();
  }

  if(numeroDeArchivos>0){
    exists=true;
  }

  return { numeroDeArchivos: numeroDeArchivos, exists: exists };

}
