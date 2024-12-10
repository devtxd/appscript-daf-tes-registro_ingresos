function consolidar() {
  ss=SpreadsheetApp.getActiveSpreadsheet();
  sheet=ss.getSheetByName("CONSOLIDADO")

  ssConsolidado=SpreadsheetApp.openById(ID_CONSOLIDADO);
  sheetConsolidado=ssConsolidado.getSheetByName("CONSOLIDADO")

  let lRow=sheet.getLastRow();
  let lCol=sheet.getLastColumn();

  let lRowConsolidado=sheetConsolidado.getLastRow();

  if(lRow>1){
    let datos=sheet.getRange(2,1,lRow-1,lCol).getValues();

    let fecha = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy HH:mm");

    let newArrayDatos = datos.map((row) => [
  
    "'"+row[0],
    row[1],
    "'"+row[2],
    "'"+row[3],
    row[4],
    row[5],
    "'"+row[6],
    row[7],
    row[8],
    fecha
    ]);

    sheetConsolidado.getRange(lRowConsolidado+1,1,newArrayDatos.length,newArrayDatos[0].length).setValues(newArrayDatos);
  }

}
