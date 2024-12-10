function readTable(fileId) {
  console.log(fileId)
  
  ss=SpreadsheetApp.openById(fileId)
  sheet=ss.getSheets()[0]
  lRow=sheet.getLastRow();
  lCol=sheet.getLastColumn();

  const firstRow=12;
  let lastRow=lRow-4-firstRow+1;
  console.log(lastRow)
  let moneda=sheet.getRange("C10").getValue()
  let cuenta=sheet.getRange("D10").getValue().toString().replaceAll(" ","")


  let data=sheet.getRange(firstRow,1,lastRow,lCol).getValues()
  let arr = data.map((row) => [
  ("'" + row[1].toString().padStart(8, "0")).trim(),
  "'"+(row[7].substring(6,8)+"/"+row[7].substring(4,6)+"/"+row[7].substring(0,4)).trim(),
  //("'"+Number(row[4]).toFixed(2)).trim(),
  ("'"+parseFloat(row[4].replaceAll(",","")).toFixed(2)).trim(),
  ("'"+row[6]).trim(),
  row[2].trim(),
  moneda.trim(),
  cuenta.trim(),
  row[10].trim()
  ]);

  return arr
}


