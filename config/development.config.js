var config = {
	env: 'development',
	api: {
		base_url: 'https://localhost:8000/api',
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
		github: ''
	},
	debug: true
}
module.exports = config;
