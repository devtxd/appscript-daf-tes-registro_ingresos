function clearSheets(sheetName) {
  console.log(sheetName)
  for(i=0;i<sheetName.length;i++){
    console.log(sheetName[i])
    ss=SpreadsheetApp.getActiveSpreadsheet();
    sheet=ss.getSheetByName(sheetName[i])

    lRow=sheet.getLastRow()
    lCol=sheet.getLastColumn()
    if(lRow>1)
      sheet.getRange(2,1,lRow-1,lCol).clear()
  }

}
