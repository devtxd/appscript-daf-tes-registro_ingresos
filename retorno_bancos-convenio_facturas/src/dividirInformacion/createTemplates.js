function createTemplates() {

  let ss= SpreadsheetApp.getActiveSpreadsheet();
  let sheetConsolidado= ss.getSheetByName("CONSOLIDADO");

  let sheetBase= ss.getSheetByName("BASE TRATAMIENTO");

  let sheetComprobantesRPA= ss.getSheetByName("COMPROBANTES REGISTRADOS (RPA)");
  let sheetComprobantes= ss.getSheetByName("COMPROBANTES RESTRINGIDOS");


  let lRowConsolidado=sheetConsolidado.getLastRow();
  let lColConsolidado=sheetConsolidado.getLastColumn();

  let lRowComprobantes=sheetComprobantes.getLastRow();
  let lColComprobantes=sheetComprobantes.getLastColumn();

  if(lRowComprobantes>1)
    sheetComprobantes.getRange(2,1,lRowComprobantes-1,lColComprobantes).clear();

  let lRowComprobantesRPA=sheetComprobantesRPA.getLastRow();
  let lColComprobantesRPA=sheetComprobantesRPA.getLastColumn();

  if(lRowComprobantesRPA>1)
    sheetComprobantesRPA.getRange(2,1,lRowComprobantesRPA-1,lColComprobantesRPA).clear();

  let lRowBase=sheetBase.getLastRow();
  let lColBase=sheetBase.getLastColumn();

  let consolidado=sheetConsolidado.getRange(2,1,lRowConsolidado-1,lColConsolidado).getValues();
    
  let regExp=/^[FB]\d{3}[\s-]\d+$/

  let newArrayConsolidado = consolidado.map((row) => [
  "'" + (regExp.test(row[0]) ? row[0].replace("-", " ").trim() : (row[4] == "DAFSEG-ASSIST CARD" ? "902" + row[0] : row[0])),
  typeof row[1] === 'object' && row[1] instanceof Date
  ? "'" + Utilities.formatDate(row[1],"GMT-5","dd/MM/yyyy").toString()
  : "'" + row[1],
  "'"+row[2],
  "'"+row[3],
  row[4],
  row[5],
  "'"+row[6],
  row[7]
  ]);

  let conceptos=sheetConsolidado.getRange(2,5,lRowConsolidado-1,1).getValues();
  let base=sheetBase.getRange(2,1,lRowBase-1,lColBase).getValues();


  let comprobantesRestringidos=[]
  let comprobantesRegistrados=[]

  let conceptosRegistrados = []
  let conceptosRestringidos = []

  let otros = []
 
  for(let i in newArrayConsolidado){

    let concepto=conceptos[i].toString().trim();
    let row=newArrayConsolidado[i];

    let subproceso=null
    let procesamiento=null
    let exist=false
  

    for(let j in base){

      let conceptoBase=base[j][1]
      
      if(concepto==conceptoBase){
        exist=true
        subproceso=base[j][2]
        procesamiento=base[j][3]

      }else if(regExp.test(concepto) && concepto.split(" ")[0]==conceptoBase){
        exist=true
        subproceso=base[j][2]
        procesamiento=base[j][3]

      }
      
    }

    if(exist){

      if(subproceso=="CONCEPTOS"&& procesamiento=="RPA"){
        conceptosRegistrados.push(row)
        sheetConsolidado.getRange(parseInt(i)+2,9).setValue("RPA CONCEPTO")
      }else if(subproceso=="CONCEPTOS"&& procesamiento=="CORREO"){
        conceptosRestringidos.push(row)
        sheetConsolidado.getRange(parseInt(i)+2,9).setValue("CORREO CONCEPTO")
      }else if(subproceso=="COMPROBANTES"&& procesamiento=="CORREO"){
        comprobantesRestringidos.push(row)
        sheetConsolidado.getRange(parseInt(i)+2,9).setValue("CORREO COMPROBANTE")
      }else if(subproceso=="UNIDAD" && procesamiento=="CORREO"){
        conceptosUnidadActividad.push(row)
        sheetConsolidado.getRange(parseInt(i)+2,9).setValue("CORREO UNIDAD/ACTIVIDAD")
      }

      
    }else if(regExp.test(concepto)){
      comprobantesRegistrados.push(row)
      sheetConsolidado.getRange(parseInt(i)+2,9).setValue("RPA COMPROBANTE")
    }else{
      otros.push(row)
      sheetConsolidado.getRange(parseInt(i)+2,9).setValue("SIN UBICACION")
    }
    
  }

  var newComprobantesRegistrados = comprobantesRegistrados.map(function(row) {
  row[4] = row[4].replace("-", " ");
  return row;
  });
  
  if(comprobantesRestringidos.length>0)
    sheetComprobantes.getRange(2,1,comprobantesRestringidos.length,comprobantesRestringidos[0].length).setValues(comprobantesRestringidos)
  if(comprobantesRegistrados.length>0)
    sheetComprobantesRPA.getRange(2,1,comprobantesRegistrados.length,comprobantesRegistrados[0].length).setValues(newComprobantesRegistrados)

}