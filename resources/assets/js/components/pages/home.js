/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists: [],
    	};
    },

    created: function(){
      this.fetchGists()
    },

    methods: {
    	fetchGists: function(){
        var that = this
    		// GET request
      		client({path: '/'}).then(function (response) {

      			if(response.entity.meta.pagination.total >0)
      				that.gists = response.entity.data;

      		}, function (response) {
          		// error callback
      		});

    	}
    }

}