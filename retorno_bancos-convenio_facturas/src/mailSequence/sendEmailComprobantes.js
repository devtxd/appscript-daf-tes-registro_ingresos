function sendEmailComprobantes() {

  let ss=SpreadsheetApp.getActiveSpreadsheet();
  let sheetCorreos=ss.getSheetByName("COMPROBANTES RESTRINGIDOS");
  let now     = new Date();
  let year    = now.getFullYear();
  let month   = now.getMonth()+1;
  let day= now.getUTCDate();
  let fecha=day+"/"+month+"/"+year

  let inicio="<!DOCTYPE html> <html> <head> <base target='_top'> </head> <body>Estimadas y estimados,<br><br>Enviamos los ingresos del día "+fecha+" para su registro.  <br><br>"

  let fin="<br><FONT FACE='Sans serif'SIZE=3 COLOR='#042354'>Atentamente,<br><br><b>Tesorería General</b><br>Dirección de Administración y Finanzas</FONT><br><img src='https://www.grupolarabida.org/wp-content/uploads/2020/11/Copia-de-Imagotipo-PUCP-alta_resolucion-1.png'width='250' height='120'></b><br><br></body> </html>"
  
  let lRowCorreos=sheetCorreos.getLastRow();
  let lColCorreos=sheetCorreos.getLastColumn();

  if(lRowCorreos>1){

    let datos=sheetCorreos.getRange(2,1,lRowCorreos-1,lColCorreos).getValues();

    let unidades=sheetCorreos.getRange(2,9,lRowCorreos-1,1).getValues();
  
    let unidadesUnicas=unicos(unidades)

    for(let i in unidadesUnicas){

      let tempUnidad1=unidadesUnicas[i]
      let dataUnidad=[]
      let correoUnidad=[]

      for(let j in datos){
        
        let tempUnidad2=datos[j][8]
        let row=datos[j]
        let tempCorreos=datos[j][9]
        //Logger.log(row)
        
        if(tempUnidad1==tempUnidad2){
          dataUnidad.push(row)
          correoUnidad.push(tempCorreos)
        } 

      }

      let tablas=createTable(dataUnidad);
      let body=inicio+tablas+fin;

      MailApp.sendEmail({

      to: correoUnidad[0],
      name: 'registroIngresosRPA@pucp.edu.pe',
      subject: 'DAF-REGISTRO DE INGRESOS - Producción',
      htmlBody: body,
      replyTo:'kagarcia@pucp.edu.pe'
      
      });

      
    }
  }

}