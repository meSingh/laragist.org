/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists       : [],
    		q           : '',
            notFound    : false,
            selectedGist: {

                name        : '',
                first_name  : '',
                email       : '',
                category_id : 0    
            },
            error       : ""
    	};
    },

    methods: {
    	search: function(){
        this.notFound = false;

    		if(this.q.length < 3)
    			return;
    		// GET request
        
          
      		this.$http({url: 'https://packagist.org/search.json?q='+this.q, method: 'GET'}).then(function (response) {

      			if(response.data.total >0)
      				this.gists = response.data.results;
            else
              {
                this.notFound = true;
                this.gists = [];
              }


    			console.log(response)

      		}, function (response) {
          		// error callback
      		}).bind(this);

    	},

        selectGist: function(gist){
            this.selectedGist.name = gist.name
            this.error = ""
        },

        submitPackage: function(){
            this.error = ""
            var that = this
            client({path: '/submit' ,entity:this.selectedGist}).then(
                function(response){
                    
                // success
                
                },
                function(response){
                    console.log(response)
                    if(response.status.code >= 500)
                        this.error = "Some unknown error occurred. Please try again later"
                    else
                        {
                            for(var error in response.entity.errors){
                            that.error += response.entity.errors[error][0]
                        }
                    }
                }
            )
        }

    }

}