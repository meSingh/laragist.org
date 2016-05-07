var config = {
  env: 'development',
  api: {
    base_url: 'http://internal-api.laragist.org/v1',
    defaultRequest: {
      headers: {
        'X-Requested-With': 'rest.js',
        'Content-Type': 'application/json'
      }
    }
  },
  social: {
    facebook: '',
    twitter: '',
    github: 'khurafat'
  },
  debug: true
}

module.exports = config
