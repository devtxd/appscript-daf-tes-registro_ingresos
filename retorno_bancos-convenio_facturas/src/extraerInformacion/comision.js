function comision(){
    const keyId = PropertiesService.getScriptProperties().getProperty(KEY_ID_DATASET);  
    const keySecret = PropertiesService.getScriptProperties().getProperty(KEY_SECRET_DATASET);
    //En la url el parametro page size seteado a el maximo tamaño que puede tener un dataset 50000
    let url=`https://pucp.kissflow.com/dataset/2/AcUgoqK4pdde/${COMISION_DATASET_ID}/list?page_size=50000&page_number=1`

    const options = {
        'method' : 'get',
        'contentType': 'application/json',
        'headers' : {'X-Access-Key-Id': keyId,'X-Access-Key-Secret': keySecret}
      };
  
    let response = UrlFetchApp.fetch(url, options)

    let jsonObject = JSON.parse(response.getContentText());

    let tabla_comisiones=jsonObject['Data'];

    let ss=SpreadsheetApp.getActiveSpreadsheet()
    let sheet=ss.getSheetByName("BBVA");
    let lRow=sheet.getLastRow();
    let lCol=sheet.getLastColumn();

    let data = sheet.getRange(2,1,lRow-1,lCol).getValues();
  

    // Creamos arrays vacíos para guardar las comisiones y los importes netos
    let comisiones = [];
    let importesNetos = [];

    for (let i = 0; i < lRow - 1; i++) {
        let canal = data[i][7];  // Canal está en la columna 8 (índice 7)
        let cuenta = data[i][6];  // Cuenta está en la columna 7 (índice 6)
        let importe_pagado = data[i][2];  // Importe pagado está en la columna 3 (índice 2)
    
        // Filtrar los objetos que tienen el número de cuenta específico
        let existe = tabla_comisiones.filter(item =>
            item.CUENTA?.trim() === cuenta.trim() && item.CANAL?.trim() === canal.trim()
        );
    
        if (existe.length > 0) {
            let comision = existe[0].COMISION;
            let importe_neto = Number(importe_pagado) - Number(comision);
            // Agregamos un apóstrofe antes del valor para tratarlo como texto
            comisiones.push([comision]);
            importesNetos.push([`'${Utilities.formatString("%.2f",Number(importe_neto))}`]);
        } else {
            // Valores por defecto si no existe
            comisiones.push([0]);
            importesNetos.push([`'${Utilities.formatString("%.2f",Number(importe_pagado))}`]);
        }
    }
    
    // Escribir los resultados en la hoja de cálculo de una sola vez
    sheet.getRange(2, 9, lRow - 1, 1).setValues(comisiones);  // Columna 9 para comisión
    sheet.getRange(2, 10, lRow - 1, 1).setValues(importesNetos);  // Columna 10 para importe neto

}