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

			client({path: '/subscribers', entity: this.subscriber}).then(function(response){
                
			})
		}
	}

}