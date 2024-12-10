async function extraerInformacion() {
  
  try{
    await clearSheets(["BBVA","BCP","CONSOLIDADO","COMPROBANTES RESTRINGIDOS","COMPROBANTES REGISTRADOS (RPA)"])
    let existsFilesBCP = await existsFiles(FOLDER_IN_BCP)
    if(existsFilesBCP.exists){
      await secuenciaBCP();
    }else{
      SpreadsheetApp.getUi().alert('⚠️ No se encontro archivos en la carpeta BCP')
    }
    let existsFilesBBVA = await existsFiles(FOLDER_IN_BBVA)
    if(existsFilesBBVA.exists){
      await secuenciaBBVA();
    }else{
      SpreadsheetApp.getUi().alert('⚠️ No se encontro archivos en la carpeta BBVA')
    }

    await joinBanks();
    await  getDatasetConceptosComprobantes();
    let mensaje = "";

    switch (true) {
      case existsFilesBCP.exists && existsFilesBBVA.exists:
        mensaje = `🆗 (1) Se extrajo la información exitosamente ${existsFilesBCP.numeroDeArchivos} archivo(s) del BCP y ${existsFilesBBVA.numeroDeArchivos} archivo(s) del BBVA`;
        break;
      case existsFilesBCP.exists:
        mensaje = `🆗 (1) Se extrajo la información exitosamente ${existsFilesBCP.numeroDeArchivos} archivo(s) del BCP`;
        break;
      case existsFilesBBVA.exists:
        mensaje = `🆗 (1) Se extrajo la información exitosamente ${existsFilesBBVA.numeroDeArchivos} archivo(s) del BBVA`;
        break;
      default:
        mensaje = "❌ No se extrajo información de BCP ni BBVA";
    }
    SpreadsheetApp.getUi().alert(mensaje)
  
  }catch(error){
    SpreadsheetApp.getUi().alert(`❌ Se encontro el siguiente error ${error}`)
  }

}
