function authentication() {

  let properties = PropertiesService.getScriptProperties();
  let username = properties.getProperty("USERNAME");
  let password = properties.getProperty("PASSWORD");
  let clientId = properties.getProperty("CLIENT_ID");
  let autenticationURL = properties.getProperty("AUTHENTICATION_URL")

  let payload = {
    "AuthFlow":"USER_PASSWORD_AUTH",
    "ClientId":clientId,
    "AuthParameters":{"USERNAME":username,"PASSWORD":password},
    "ClientMetadata":{}
  }

  let headers = {
    "Accept":"*/*",
    "Content-Type":"application/x-amz-json-1.1",
    "X-Amz-Target":"AWSCognitoIdentityProviderService.InitiateAuth"
  }

  let options = {
    'method' : 'post',
    'headers': headers,
    'payload': JSON.stringify(payload)
  };

  response=UrlFetchApp.fetch(autenticationURL,options)

  let data = JSON.parse(response.getContentText());

  idToken=data.AuthenticationResult.IdToken

  return idToken
}
