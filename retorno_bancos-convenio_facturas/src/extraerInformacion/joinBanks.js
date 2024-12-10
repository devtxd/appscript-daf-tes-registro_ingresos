function joinBanks() {

  let ss= SpreadsheetApp.getActiveSpreadsheet();
  let sheetConsolidado= ss.getSheetByName("CONSOLIDADO");
  let sheetBBVA= ss.getSheetByName("BBVA");
  let sheetBCP= ss.getSheetByName("BCP");

  let lRowBBVA=sheetBBVA.getLastRow();
  let lColBBVA=sheetBBVA.getLastColumn();

  let lRowBCP=sheetBCP.getLastRow();
  let lColBCP=sheetBCP.getLastColumn();

  let lRowConsolidado=sheetConsolidado.getLastRow();
  let lColConsolidado=sheetConsolidado.getLastColumn();
  let datosBBVA=[];
  let datosBCP=[];

  if(lRowConsolidado>1)
    sheetConsolidado.getRange(2,1,lRowConsolidado-1,lColConsolidado).clear();
  
  if(lRowBBVA>1){
    datosBBVA=sheetBBVA.getRange(2,1,lRowBBVA-1,lColBBVA).getValues();
  }
  if(lRowBCP>1){
    datosBCP=sheetBCP.getRange(2,1,lRowBCP-1,lColBCP).getValues();
  }
  let newArrayBBVA = datosBBVA.map((row) => [
  "'"+row[0],
  "'"+row[1],
  "'"+row[9],
  "'"+row[3].trim(),
  row[4],
  row[5],
  "'"+row[6],
  'BBVA'
  ]);

  let newArrayBCP = datosBCP.map((row) => [
  "'"+row[0],
  "'"+row[1],
  "'"+row[2],
  "'"+row[3].trim(),
  row[4],
  row[5],
  "'"+row[6],
  'BCP'
]);

  if(newArrayBBVA.length>0)
    sheetConsolidado.getRange(2,1,newArrayBBVA.length,newArrayBBVA[0].length).setValues(newArrayBBVA);

  if(newArrayBCP.length>0){
    lRowConsolidado=sheetConsolidado.getLastRow();
    sheetConsolidado.getRange(lRowConsolidado+1,1,newArrayBCP.length,newArrayBCP[0].length).setValues(newArrayBCP);
  }
 

}
