async function secuenciaBBVA() {
  
  await evaluarArchivosBBVA(FOLDER_IN_BBVA,FOLDER_EXCEL)
  await readBBVA(FOLDER_IN_BBVA)
  await comision()
  await archivarFiles(FOLDER_IN_BBVA,FOLDER_OUT_BBVA);

}
