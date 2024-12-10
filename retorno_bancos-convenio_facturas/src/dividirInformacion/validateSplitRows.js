function validateSplitRows() {
  
  ss=SpreadsheetApp.getActiveSpreadsheet();

  let sheetConsolidado= ss.getSheetByName("CONSOLIDADO");

  let nombresHojas=["COMPROBANTES REGISTRADOS (RPA)","COMPROBANTES RESTRINGIDOS"];

  let numRowConsolidado=sheetConsolidado.getLastRow()-1;

  let numRowSplit = 0;

  for( i=0; i<nombresHojas.length;i++){
    let sheet = ss.getSheetByName(nombresHojas[i]);
    tempNumRowSplit = sheet.getLastRow()-1;
    numRowSplit += tempNumRowSplit;
  }

  if(numRowConsolidado != numRowSplit){
    SpreadsheetApp.getUi().alert(`❌ El número de filas del consolidado: ${numRowConsolidado} y el número de filas divididas: ${numRowSplit} no coincide`);
  }

}