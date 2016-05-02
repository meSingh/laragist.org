/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists       : [],
    		q           : '',
            notFound    : false,
            submitted   : false,
            selectedGist: {

                name        : '',
                first_name  : '',
                email       : '',
                category_id : 0    
            },
            error       : "",
            errors      : {
                first_name: "",
                email: "",
                category_id: ""
            },
            categories: []
    	};
    },

    created: function(){
        this.getCategories()
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
            this.errors = {
                first_name: "",
                email: "",
                category_id: ""
            }
            this.submitted = false
        },

        getCategories: function(){
            var that = this
            client({path:'/categories'}).then(function(response){
                response.entity.data.forEach(function(category){
                    that.categories.push(category)
                })
            })
        },

        submitPackage: function(){
            this.error = ""
            this.errors     = {
                first_name: "",
                email: "",
                category_id: ""
            }
            var that = this
            client({path: '/submit' ,entity:this.selectedGist}).then(
                function(response){
                    that.submitted = true;
 
                },
                function(response){
                    console.log(response)
                    if(response.status.code == 400)
                        that.error = response.entity.message;
                    else if(response.status.code >= 500)
                        that.error = "Some unknown error occurred. Please try again later"
                    else if(response.status.code = 422)
                        {
                            that.errors.first_name = response.entity.errors.first_name;
                            that.errors.email = response.entity.errors.email;
                            that.errors.category_id = response.entity.errors.category_id;
                            console.log(that.errors);
                        }
                    }

            )
        }

    }

}