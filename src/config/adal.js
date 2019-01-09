export default {
  instance: 'https://login.microsoftonline.com/', 
  tenant: 'common', //COMMON OR YOUR TENANT ID
  clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', //This is your client ID
  redirectUri: `http://localhost/contacts_web/www/`, //This is your redirect URI
  cacheLocation: 'localStorage',
  popUp: true,
  endpoints : {"https://graph.microsoft.com": "https://graph.microsoft.com"},
}