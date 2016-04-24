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

    		// GET request
      		this.$http({url: 'http://internal-api.laragist.org/v1', method: 'GET'}).then(function (response) {

      			if(response.data.meta.pagination.total >0)
      				this.gists = response.data.data;

    			console.log(response)

      		}, function (response) {
          		// error callback
      		}).bind(this);

    	}
    }

}