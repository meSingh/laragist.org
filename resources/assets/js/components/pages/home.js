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
            sortby: "&sortby=md",
            
            pagination: {
                total: 120, 
                per_page: 12,
                current_page: 1,
                total_pages: 10
            }

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
      		client({path: '/?q='+this.q+this.addtional+this.sortby+'&page='+this.pagination.current_page}).then(function (response) {

      			if(response.entity.meta.pagination.total >0)
      				that.gists = response.entity.data;
            
                that.pagination = {
                    total: response.entity.meta.pagination.total, 
                    per_page: response.entity.meta.pagination.per_page,
                    current_page: response.entity.meta.pagination.current_page,
                    total_pages: response.entity.meta.pagination.total_pages
                }

                console.log(that.pagination)

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
            
            this.pagination.current_page = 1;

            var categories = [];
            category.clicked = category.clicked ? 0 : 1;

            this.categories.forEach(function(item){
                if(item.clicked == 1)
                    categories.push(item.id)
            })

            if(categories.length)
              this.addtional = '&cid='+ JSON.stringify(categories);
            else
              this.addtional = '';

            this.fetchGists();
        },

        sort: function(type,current){
            this.pagination.current_page = 1;
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

Vue.transition('slideIn', {
  enterClass: 'slideInUp',
  leaveClass: 'slideOutDown'
});
