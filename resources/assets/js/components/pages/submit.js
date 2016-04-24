/**
 * Created by Piyush Agrawal on 23/04/16.
 */

module.exports = {

    data: function(){
    	return {
    		gists: [],
    		q: ''
    	};
    },

    methods: {
    	search: function(){
    		if(this.q.length < 3)
    			return;
    		// GET request
      		this.$http({url: 'http://internal-api.laragist.org/v1/?q='+this.q, method: 'GET'}).then(function (response) {

      			if(response.data.meta.pagination.total >0)
      				this.gists = response.data.data;

    			console.log(response)

      		}, function (response) {
          		// error callback
      		}).bind(this);

    	}
    }

}