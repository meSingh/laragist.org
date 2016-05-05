// Import requirements using browserify
window.Vue = require('vue')
Vue.use(require('vue-resource'))
window.VueRouter = require('vue-router')


// Insert vue-router and vue-resource into Vue

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter({
	history: true
})

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
window.config = require('./config')
Vue.config.debug = true
Vue.http.options.root = config.api.base_url;

// Configure our HTTP client
var rest = require('rest')
var pathPrefix = require('rest/interceptor/pathPrefix')
var mime = require('rest/interceptor/mime')
var defaultRequest = require('rest/interceptor/defaultRequest')
var errorCode = require('rest/interceptor/errorCode')
var interceptor = require('rest/interceptor')
var jwtAuth = require('./interceptors/jwtAuth')

var showdown  = require('showdown');
window.converter = new showdown.Converter();

window.client = rest.wrap(pathPrefix, { prefix: config.api.base_url })
                    .wrap(mime)
                    .wrap(defaultRequest, config.api.defaultRequest)
                    .wrap(errorCode, { code: 400 })
                    .wrap(jwtAuth);

// Bootstrap the app
Vue.component('nav-component', require('./compiled/nav.vue'))
Vue.component('footer-component', require('./compiled/footer.vue'))
Vue.component('pagination', require('vue-bootstrap-pagination'))

const App = Vue.extend(require('./compiled/app.vue'))
router.start(App, '#app')
window.router = router


String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'...' : this;
};
