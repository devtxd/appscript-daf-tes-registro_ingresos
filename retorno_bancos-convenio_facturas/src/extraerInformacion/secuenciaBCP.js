async function secuenciaBCP() {
  
  await readBCP(FOLDER_IN_BCP);
  await archivarFiles(FOLDER_IN_BCP,FOLDER_OUT_BCP);
  
}
