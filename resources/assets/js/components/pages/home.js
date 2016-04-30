/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists:      [],
            q:          "",
            categories: [],
            addtional: "",
            sortedAs: "Most Popular",
            sortby: "&sortby=mp"
    	};
    },

    created: function(){
      this.fetchGists()
      this.getCategories()
    },

    methods: {
    	fetchGists: function(){

            if(this.q.length < 3 && this.q.length > 0)
                return

            var that = this
    		// GET request
      		client({path: '/?q='+this.q+this.addtional+this.sortby}).then(function (response) {
            console.log(response)
      			if(response.entity.meta.pagination.total >0)
      				that.gists = response.entity.data;

      		}, function (response) {
          		// error callback
      		});

    	},

        getCategories : function(){
            var that = this
            client({path: '/categories'}).then(function (response) {
                that.categories = response.entity.data;
                
                that.categories.forEach(function(item){
                    item.clicked = 0
                });

                console.log(that.categories);

              }, function (response) {
                  // error callback
               });

        },

        selectCategory: function(category){
            this.categories.forEach(function(item){
                if(category.name == item.name)
                    item.clicked =1;
                else
                    item.clicked = 0;
            })
            this.addtional = '&cslug='+category.slug;
            this.fetchGists();
        },

        sort: function(type,current){
            this.sortby = "&sortby="+type;
            this.sortedAs = current;
            console.log(this.sortedAs);
            this.fetchGists();
        },


      author: function(name){
        return name.split('/')[0];
      },

      package: function(name){
        return name.split('/')[1];
      }
    }

}