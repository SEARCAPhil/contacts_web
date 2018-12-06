const URL = {
  scheme: 'http',
  host: 'localhost',
  path: 'contacts_api/public/api',
}

URL.fullPath = `${URL.scheme}://${URL.host}/${URL.path}/`

export { URL }  