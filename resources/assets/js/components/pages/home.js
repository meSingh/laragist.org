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
            sortedAs: "Most Downloaded",
            sortby: "&sortby=md"
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

                
                response.entity.data.forEach(function(item){
                    var temp = {
                        name:item.name,
                        clicked: 0,
                        id: item.id
                    };
                    that.categories.push(temp);
                })

              }, function (response) {
                  // error callback
               });

        },

        selectCategory: function(category){
            var current = ''
            this.categories.forEach(function(item){
                if(item.clicked == 1)
                    current = item
                
                item.clicked = 0
            })

            if(current.id !== category.id)
                category.clicked= 1

            this.addtional = '&cid='+category.id;
            this.fetchGists();
        },

        sort: function(type,current){
            this.sortby = "&sortby="+type;
            this.sortedAs = current;
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
