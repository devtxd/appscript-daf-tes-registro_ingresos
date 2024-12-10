function sequenceInstanceVerification(PROCESS_ID,instanceId,childTableId,payload) {

  try{
    let idToken = authentication();
    response=instanceVerification(PROCESS_ID,instanceId,childTableId,idToken,payload)

    Logger.log(response)
    const statusCode = response.getResponseCode();
    const data = JSON.parse(response.getContentText())
    // Procesa el código de estado

    if (statusCode === 200) {
      console.log(data.message)
      if( data.message == "Las listas son iguales."){
        msg="\nRespuesta de la comparación: "+data.message+" 😊"
        SpreadsheetApp.getUi().alert(msg)
      }else{
        msg="\nRespuesta de la comparación: "+data.message+" 😞"
        SpreadsheetApp.getUi().alert(msg)
      }

    }else{
      msg="Error en la solicitud.\nRespuesta de la comparación: "+data.message+"😞"
      SpreadsheetApp.getUi().alert(msg)
    }
  
  }catch(err){
    SpreadsheetApp.getUi().alert(`Ocurrio el siguiente error ${err}`)
  }
  
}