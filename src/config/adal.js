export default {
  instance: 'https://login.microsoftonline.com/',
  tenant: 'searca.org', // COMMON OR YOUR TENANT ID
  clientId: '', // This is your client ID
  redirectUri: `http://localhost/contacts_web/www/`, // This is your redirect URI
  cacheLocation: 'localStorage',
  popUp: true,
  endpoints: { 'https://graph.microsoft.com': 'https://graph.microsoft.com' }
}
