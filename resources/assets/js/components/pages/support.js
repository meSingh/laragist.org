module.exports = {
	data: function(){
		return {
			subscriber : {
			    email_address: "",
			    status: "subscribed"
			}
		}
	},

	methods: {
		sendEmail : function(){

			var resource = this.$resource('https://us13.api.mailchimp.com/3.0/{/path}');
			Vue.http.headers.common['Authorization'] = 'Basic YXBpa2V5OjY1NGMzOTBiNmVhYWNhZjA4MzY4YWYwYmMxZDRhMTRjLXVzMTM=';
			resource.save({path: "lists/be0bdaaf87/members"}, {item:this.subscriber})
			.then(function(response){

			})
		}
	}

}