function readBBVA(folderInBBVA) {
 
  let carpeta_central = DriveApp.getFolderById(folderInBBVA); 
  let archivos_unidades = carpeta_central.getFiles();

  let ss= SpreadsheetApp.getActiveSpreadsheet();
  let sheet_bbva= ss.getSheetByName("BBVA");

  let lRowBBVA=sheet_bbva.getLastRow();
  let lColBBVA=sheet_bbva.getLastColumn();
  
  if(lRowBBVA>1){
    sheet_bbva.getRange(2,1,lRowBBVA-1,lColBBVA).clear()
  }

  let arr=[]
  
  while(archivos_unidades.hasNext()){

    let unidad = archivos_unidades.next();
    let fileName = unidad.getName();
    let fileId = unidad.getId();

    arr=arr.concat(readTable(fileId))
    
    console.log("Nombre archivo: "+fileName)
    
  }

  sheet_bbva.getRange(2,1,arr.length,arr[0].length).setValues(arr)

}
