module.exports = {
	data: function(){
		return {
			subscriber : {
			    email: "",
			},
			error :{
				is : 0,
				text: ""
			},
			submitted: 0
		}
	},

	methods: {
		sendEmail : function(){
			var that = this

			client({path: '/subscribers', entity: this.subscriber}).then(function(response){
				that.error.is = 0
				that.submitted = 1;
			}, function(errorResponse){
				that.error.is = 1
				that.error.text = errorResponse.entity.message;
			})
		}
	}

}
