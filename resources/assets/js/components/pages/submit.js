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
            categories: [],
            selectedCategories: [],
            gistsUnderReview : []
    	};
    },

    created: function(){
        this.getCategories()
        this.getUnderReviews()
    },

    methods: {
    	search: function(){
        this.notFound = false;

    		if(this.q.length < 1)
    		{ 
                this.getUnderReviews()
                return;
            }

            if(this.q.length < 3)
            { 
                return;
            }

    		// GET request
            
            this.gistsUnderReview = [];
          
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
            var that  =this
            this.selectedGist.name = gist.name
            this.error = ""
            this.errors = {
                first_name: "",
                email: "",
                category_id: ""
            }
            this.submitted = false
                
            this.categories.forEach(function(c){
                    c.selected = 0
            })   

            var $select = $('#category_id').selectize({
                persist: false,
                    maxItems: null,
                    valueField: 'value',
                    labelField: 'label',
                    searchField: ['label'],
                    options: this.categories
                })

            var selectize = $select[0].selectize;

            selectize.on('item_add', function(value, $item){
                that.categories.forEach(function(c){
                    if( $item[0].dataset.value == c.value )
                        c.selected = 1

                })
            })


            selectize.on('item_remove', function(value, $item){
                that.categories.forEach(function(c){
                    if( $item[0].dataset.value == c.value )
                        c.selected = 0

                })
            })

        },

        getCategories: function(){
            var that = this
            client({path:'/categories'}).then(function(response){
                response.entity.data.forEach(function(category){
                    that.categories.push({
                        value: category.id,
                        label: category.name,
                        selected: 0
                    })
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
            console.log(this.categories);
            
            //  Filter selected Categories to send with form
            var categories = [];
            this.categories.forEach(function(category){
                if(category.selected == 1)
                    categories.push(category.value)
            })
            this.selectedGist.category_id = categories;

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
        },

        getUnderReviews: function(){
            var that =this
            this.gists = [];
            client({path: '/under-review'}).then(function(response){
                that.gistsUnderReview = response.entity.data
            })
        }

    }

}
