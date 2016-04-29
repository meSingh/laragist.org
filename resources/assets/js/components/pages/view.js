module.exports = {
    data: function(){
	    return {
    		gist: [],
            user :this.$route.params.user,
            name: this.$route.params.name,
            readme: ''
    }
  },

    created: function(){
        this.fetchGist();
        this.getreadme()
    },

    methods: {
    	fetchGist: function(){
            var that = this
            client({path: '/packages/'+this.user+'/'+this.name}).then(function(response){
                that.gist =  response.entity.data.package;
            }, 
            function(errorResponse){
                console.log('error');
            })
    	},

        versionsList : function(){

        },

        getreadme: function(){
            var that =this
            this.$http({url: 'https://raw.githubusercontent.com/'+this.user+'/'+this.name+'/master/readme.md'}).then(
                function(response){
                    that.readme = converter.makeHtml(response.data);
                },
                function(errorResponse){
                    this.$http({url: 'https://raw.githubusercontent.com/'+this.user+'/'+this.name+'/master/README.md'}).then(
                        function(response){
                            that.readme = converter.makeHtml(response.data);                        })

                })
        },

        toHtml: function(content){
            alert("sdsd");
            console.log(markdown.toHTML(content));
        }

    }
}