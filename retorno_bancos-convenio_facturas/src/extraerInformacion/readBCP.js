function readBCP(folderInBCP) {
  let carpeta_central = DriveApp.getFolderById(folderInBCP); 
  let archivos_unidades = carpeta_central.getFiles();
  
  let ss= SpreadsheetApp.getActiveSpreadsheet();
  let sheet_retorno= ss.getSheetByName("BCP");

  let lRow=sheet_retorno.getLastRow();
  let lCol=sheet_retorno.getLastColumn();


  if(lRow>1){
    sheet_retorno.getRange(2,1,lRow-1,lCol).clear()
  }

    while(archivos_unidades.hasNext()){

        let unidad = archivos_unidades.next();
        let fileName = unidad.getName();

        let rowBCP=sheet_retorno.getLastRow();
  
        let files = DriveApp.getFilesByName(fileName);
  
        let txtFile = null;

        if(files.hasNext())
          txtFile = files.next();
        else
          return null;
        let blob = txtFile.getBlob();

        let datos=blob.getDataAsString();

        let filas=datos.split("\n");

        let codigo;
        let fecha;
        let importe;
        let operacion;
        let concepto;
        let moneda;
        let cuentaCompleta;
      

        let cuenta=filas[0].substring(2,13)

        if(cuenta=="19109973413"){
          cuentaCompleta="1919973413043";
          moneda="PEN"
      
        }else if(cuenta=="19119979566"){
          cuentaCompleta="1919979566104"
          moneda="USD"
         
        }


        for(i=0;i<filas.length;i++){
          
          let temp=filas[i+1];
   

          if(!temp==""){
          codigo=temp.substring(13,27);
         
          let strCodigo=codigo.toString().trim().replace(/^0+/, '')
          let lenCodigo=strCodigo.length
          if(lenCodigo<8){
            strCodigo="0".repeat(8-lenCodigo)+strCodigo
          }
        
          sheet_retorno.getRange(i+1+rowBCP,1).setValue("'"+strCodigo)
          concepto=temp.substring(27,57);
         
          sheet_retorno.getRange(i+1+rowBCP,5).setValue(concepto.trim())
          
          importe=temp.substring(73,88);

          let importe_int=importe.substring(0,13);
         
          let importe_dec=importe.substring(13,15)
          
          let importe_str=importe_int+"."+importe_dec;
          

          let trimImporte=Number(importe_str).toFixed(2)
          sheet_retorno.getRange(i+1+rowBCP,3).setValue("'"+trimImporte)

          fecha=temp.substring(57,65)
         
          fecha_anio=fecha.substring(0,4)
     
          fecha_mes=fecha.substring(4,6)
          fecha_dia=fecha.substring(6,8)
          fecha_str=fecha_dia+"/"+fecha_mes+"/"+fecha_anio;
         
          sheet_retorno.getRange(i+1+rowBCP,2).setValue("'"+fecha_str)
          operacion=temp.substring(200,208)
      
          sheet_retorno.getRange(i+1+rowBCP,4).setValue("'"+operacion)
          sheet_retorno.getRange(i+1+rowBCP,6).setValue(moneda)
          sheet_retorno.getRange(i+1+rowBCP,7).setValue("'"+cuentaCompleta)
          
          }
          
        }
    }
}
