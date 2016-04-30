module.exports = {
    data: function(){
	    return {
    		gist: [],
            user :this.$route.params.user,
            name: this.$route.params.name,
            readme: '',
            version_id: '',
            version: []
    }
  },

    created: function(){
        this.fetchGist();
        
    },

    methods: {
    	fetchGist: function(){
            var that = this
            client({path: '/packages/'+this.user+'/'+this.name}).then(function(response){
                that.gist =  response.entity.data.package;
                that.version_id = that.gist.version;
                that.version = that.gist.latest;
                that.getreadme();
            }, 
            function(errorResponse){
                console.log('error');
            })
    	},

        versionsList : function(){

        },

        getreadme: function(){
            var that =this
            this.$http({url: 'https://raw.githubusercontent.com/'+this.user+'/'+this.name+'/' + this.version_id + '/readme.md'}).then(
                function(response){
                    that.readme = converter.makeHtml(response.data);
                },
                function(errorResponse){
                    this.$http({url: 'https://raw.githubusercontent.com/'+this.user+'/'+this.name+'/' + this.version_id + '/README.md'}).then(
                        function(response){
                            that.readme = converter.makeHtml(response.data);                        })

                })
        }

    }
}
