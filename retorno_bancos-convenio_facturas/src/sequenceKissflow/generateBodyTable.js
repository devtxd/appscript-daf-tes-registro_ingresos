function generateBodyTable(sheetName) {

  ss=SpreadsheetApp.getActiveSpreadsheet();

  receiptSheet=ss.getSheetByName(sheetName);
  let lRowReceiptRPA=receiptSheet.getLastRow();
  let lColReceiptRPA=receiptSheet.getLastColumn();  
  
  let objetoFinal = {
    "Seleccione_el_Ambiente_de_Ejecucion": "Producción",
    "Origen":"GSHEET",
    "Table::CANCELACIONESFACTURAS_1": []
  };

  if(lRowReceiptRPA>1){
    let receiptData=receiptSheet.getRange(2,1,lRowReceiptRPA-1,lColReceiptRPA).getValues();
    
    for(let j in receiptData){

      let fecha=receiptData[j][1];
      let importe=receiptData[j][2];
      let operacion=receiptData[j][3];
      let numFactura=receiptData[j][4].toString().split(" ")[1];
      let serie=receiptData[j][4].toString().split(" ")[0];
      let cuenta=equivalentAccount(receiptData[j][6]);
      let banco=(receiptData[j][7]=="BBVA")?"11":(receiptData[j][7]=="BCP")?"02":"";
      let idDepositario=receiptData[j][0]

      let item;

      if(serie != "F053"){

        item = {
          "Banco": banco,
          "Cuenta_Bancaria": cuenta,
          "Fecha_1": fecha,
          "Importe": Number(importe).toLocaleString('es-MX', {minimumFractionDigits: 2}).toString(),
          "N_OP": operacion,
          "Serie": serie,
          "Numero": numFactura

        };

        

      }else{
          
        item = {
          "Banco": banco,
          "Cuenta_Bancaria": cuenta,
          "Fecha_1": fecha,
          "Importe": Number(importe).toLocaleString('es-MX', {minimumFractionDigits: 2}).toString(),
          "N_OP": operacion,
          "Concepto": "CUENTA PUENTE AR",
          "RUC":idDepositario,
          "Serie": serie,
          "Numero": numFactura,
          "Observacion": `${serie} ${numFactura}`,
          "Centuria_1": `${serie} ${numFactura}`
        };

      }

      objetoFinal["Table::CANCELACIONESFACTURAS_1"].push(item);
      
    }


  }

  return objetoFinal;
}
