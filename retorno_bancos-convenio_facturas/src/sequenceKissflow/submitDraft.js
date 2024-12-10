function submitDraft(result) {

  let activityInstanceId=result.activityInstanceId;
  let instanceId=result.instanceId;
  console.log(activityInstanceId)
  console.log(instanceId)
  
  const keyId = PropertiesService.getScriptProperties().getProperty(KEY_ID_PROCESS);  
  const keySecret = PropertiesService.getScriptProperties().getProperty(KEY_SECRET_PROCESS);

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'X-Access-Key-Id': keyId, 'X-Access-Key-Secret': keySecret },
  };

  let response;
  let retryCount = 3;

  for (let i = 0; i < retryCount; i++) {
    response = UrlFetchApp.fetch(`https://pucp.kissflow.com/process/2/AcUgoqK4pdde/${PROCESS_ID}/${instanceId}/${activityInstanceId}/submit`, options);
    if (response.getResponseCode() === 200) {
      break;
    }else{
      Utilities.sleep(1000);
    }
  }

  if (response.getResponseCode() !== 200) {
    throw new Error('No se pudo obtener una respuesta exitosa después de 3 intentos.');
  }

}
