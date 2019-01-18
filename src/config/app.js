const URL = {
  scheme: 'http',
  host: 'localhost',
  path: 'contacts_web/www'
}

URL.fullPath = `${URL.scheme}://${URL.host}/${URL.path}/`

export { URL }
