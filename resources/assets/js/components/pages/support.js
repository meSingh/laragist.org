module.exports = {
	data: function(){
		return {
			subscriber : {
			    email: "",
			}
		}
	},

	methods: {
		sendEmail : function(){

			client({path: '/subscribers', entity: this.subscriber}).then(function(response){
                	console.log('success');
			})
		}
	}

}
