function equivalences() {

  let ss=SpreadsheetApp.getActiveSpreadsheet();
  let sheetComprobantesRestringidos=ss.getSheetByName("COMPROBANTES RESTRINGIDOS");
  let sheetBase=ss.getSheetByName("BASE TRATAMIENTO")

  let base=sheetBase.getRange(2,1,sheetBase.getLastRow()-1,sheetBase.getLastColumn()).getValues()

  if(sheetComprobantesRestringidos.getLastRow()>1){
    let comprobantesRestringidos=sheetComprobantesRestringidos.getRange(2,1,sheetComprobantesRestringidos.getLastRow()-1,sheetComprobantesRestringidos.getLastColumn()).getValues()
    let arrComprobantesRestringidos=[]
    for(let i in comprobantesRestringidos){
      let concepto=comprobantesRestringidos[i][4].split(" ")[0]
      let unidadBase=null
      let correo=null
      let exist=false
      for(let j in base){
        let conceptoBase=base[j][1]
        if(concepto==conceptoBase){
          unidadBase=base[j][0]
          correo=base[j][6]
          exist=true
        }
      }

      if(exist){
        arrComprobantesRestringidos.push([unidadBase,correo])
      }

    }
    sheetComprobantesRestringidos.getRange(2,9,arrComprobantesRestringidos.length,arrComprobantesRestringidos[0].length).setValues(arrComprobantesRestringidos)
  }

}
