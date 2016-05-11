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

            if(this.q.length < 3)
            { 
                this.getUnderReviews()
                return;
            }


            // Clearing out gists under reviews 
            this.gistsUnderReview = [];
            
            // Packagist Api Call
      		this.$http({url: 'https://packagist.org/search.json?q='+this.q, method: 'GET'}).then(function (response) {

      			if(response.data.total >0)
                    this.gists = response.data.results;
                else
                {
                    this.notFound = true;
                    this.gists = [];
                }

      		}, function (response) {
                    
                this.notFound = true;

      		}).bind(this);

    	},

        /**
         * Called when "Submit" button pressed on searched packages
         * @param  {Object} gist  Gist object 
         * @return {Void}    
         */
        selectGist: function(gist){
            
            var that  =this
            
            this.selectedGist.name = gist.name
            this.error = ""
            
            this.errors = {
                first_name: "",
                email: "",
                category_id: ""
            }
            
            //stating that package is not submitted yet
            this.submitted = false
            
            // //Clearing out any selected categories before    
            // this.categories.forEach(function(c){
            //         c.selected = 0
            // })   


            // var $select = $('#category_id').selectize()

            // var selectize = $select[0].selectize;
            
            // //Destroying previous selectize to remove selected categories
            // selectize.destroy();

            // $select = $('#category_id').selectize({
            //     persist: false,
            //         maxItems: null,
            //         valueField: 'value',
            //         labelField: 'label',
            //         searchField: ['label'],
            //         options: this.categories
            //     })
            //  selectize = $select[0].selectize;

            // // Selectize events for items selected and deselected
            // selectize.on('item_add', function(value, $item){
            //     that.categories.forEach(function(c){
            //         if( $item[0].dataset.value == c.value )
            //             c.selected = 1

            //     })
            // })


            // selectize.on('item_remove', function(value, $item){
            //     that.categories.forEach(function(c){
            //         if( $item[0].dataset.value == c.value )
            //             c.selected = 0

            //     })
            // })

        },

        /**
         * Fetch categories list from server
         * @return {Void} 
         */
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

        /**
         * Submit Package to server when submit pressed on modal of selected gist
         * @return {Void} 
         */
        submitPackage: function(){
            var that = this
            
            this.error = ""
            this.errors     = {
                first_name: "",
                email: "",
                category_id: ""
            }
            
            
            //  Filter selected Categories to send with form
            var categories = [];
            this.categories.forEach(function(category){
                if(category.selected == 1)
                    categories.push(category.value)
            })
            this.selectedGist.category_id = categories;

            client({path: '/submit' ,entity:this.selectedGist}).then(
                function(response){
                    // If submitted successfully
                    that.submitted = true;
                },
                function(response){

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

        /**
         * Fetch last submitted gists from server
         * @return {Void} 
         */
        getUnderReviews: function(){
            var that =this
            this.gists = [];
            client({path: '/under-review'}).then(function(response){
                that.gistsUnderReview = response.entity.data
            })
        }

    }

}
