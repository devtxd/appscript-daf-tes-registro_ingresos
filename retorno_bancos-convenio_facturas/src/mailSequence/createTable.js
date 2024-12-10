function createTable(array) {
  let table="";
  let top="<table border='1'><tr><th>ID del depositante</th><th>Fecha</th><th>Importe</th><th>N° de Operación</th><th>Concepto</th><th>Moneda</th><th>Cuenta</th><th>Banco</th></tr>";
  //let array=[['2.0184279E7', 'Tue Jul 12 23:00:00 GMT-05:00 2022','9843.74', '4516.0', 'OCE-DEUDA CICLO CERRADO', 'PEN', '1106610100081612', 'DAF - OFICINA DE TESORERIA', 'jmespinozae@pucp.pe,gzambrano@pucp.edu.pe,kcruz@pucp.edu.pe'], ['2.0184279E7', 'Wed Jul 13 23:00:00 GMT-05:00 2022', '9843.74', '4516.0', 'OCE-DEUDA CICLO CERRADO', 'PEN', '1106610100081613', 'DAF - OFICINA DE TESORERIA', 'jmespinozae@pucp.pe,gzambrano@pucp.edu.pe,kcruz@pucp.edu.pe'], ['2.0184279E7', 'Thu Jul 14 23:00:00 GMT-05:00 2022', '9843.74', '4516.0', 'OCE-DEUDA CICLO CERRADO', 'PEN', '1106610100081614', 'DAF - OFICINA DE TESORERIA', 'jmespinozae@pucp.pe,gzambrano@pucp.edu.pe,kcruz@pucp.edu.pe']]
  let bottom="</table>"
  let row="";
  let opciones = { 
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
  };

  for(i in array){
    let temp=array[i]
    let str="";

    for(j=0;j<temp.length-2;j++){
      //Logger.log(temp[j])
      //Logger.log(typeof(temp[j]))
      if(j==1){
        /*var month = temp[j].getMonth() + 1
        var day = temp[j].getDay();
        var year = temp[j].getFullYear();
        let fecha = day + "/" + month + "/" + year;*/
        console.log(typeof(temp[j]))
        
        /*if(typeof(temp[j]==Object)){

          fecha = Utilities.formatDate(new Date(temp[j]), "GMT-5", "dd/MM/YYYY");

        }else{

          let partesFecha = fechaTexto.replace("'","").split("/");

          let dia = partesFecha[0];
          let mes = partesFecha[1] - 1;
          let anio = partesFecha[2];

          fecha = new Date(anio, mes, dia);
          
          console.log("Esta es la fecha"+fecha)

          fecha = Utilities.formatDate(fecha, "GMT-5", "dd/MM/YYYY");
          
        }*/
        
        let partesFecha = temp[j].replace("'","").split("/");

        let dia = partesFecha[0];
        let mes = partesFecha[1] - 1;
        let anio = partesFecha[2];

        let tempFecha = new Date(anio, mes, dia);
          
        let fecha = Utilities.formatDate(tempFecha, "GMT-5", "dd/MM/yyyy");
        str=str+"<th>"+fecha+"</th>"
        
      }else if(j==2){
        let importe=temp[j];
        Logger.log(importe)
        str=str+"<th><span style='font-weight: bold;'>"+importe.toLocaleString('es-PE',opciones)+"</span></th>"
      }else{
      str=str+"<th>"+temp[j]+"</th>"
      }

    }
    let mid="<tr>"+str+" </tr>"
    row=row+mid;
  }
  
  table=top+row+bottom;
  //Logger.log(table)
  return table
}
