async function sequenceKissflow() {

  try{
    let payload = await generateBodyTable("COMPROBANTES REGISTRADOS (RPA)")
    let result = await createDraft(payload)
    console.log(result)
    await submitDraft(result)
    await clearSheets(["BBVA","BCP","CONSOLIDADO","COMPROBANTES REGISTRADOS (RPA)"]);
    SpreadsheetApp.getUi().alert("Las operaciones se crearon exitosamente en Kissflow 😁");
    await sequenceInstanceVerification(PROCESS_ID,result.instanceId,CHILD_TABLE_ID,payload)
  }catch(err){
    SpreadsheetApp.getUi().alert(err);
  }

}