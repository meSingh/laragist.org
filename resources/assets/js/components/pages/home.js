/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists:      [],
        q:          "",
        categories: []
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
      		client({path: '/?q='+this.q}).then(function (response) {
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
                console.log(response);
                that.categories = response.entity.data;

              }, function (response) {
                  // error callback
               });

      },

      author: function(name){
        return name.split('/')[0];
      },

      package: function(name){
        return name.split('/')[1];
      }
    }

}