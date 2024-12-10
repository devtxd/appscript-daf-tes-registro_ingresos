function mailSequence() {

  try{
    sendEmailComprobantes();
    SpreadsheetApp.getUi().alert("(4) Se enviaron los correos")
  }catch(error){
    SpreadsheetApp.getUi().alert(`Ocurrio el siguiente error ${error}`)
  }

}
