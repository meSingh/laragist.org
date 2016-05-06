module.exports = {
    data: function(){
	    return {
    		gist: [],
            user :this.$route.params.user,
            name: this.$route.params.name,
            readme: '',
            version_id: '',
            version: [],
            versionsListPulled: 0,
            readmePulled: 0,
            versionPulled: 0
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
                that.version.require_dev = that.gist.latest['require-dev'];
                that.getreadme();
            }, 
            function(errorResponse){
                console.log('error');
            })
    	},

        versionsList : function(){

        },

        getreadme: function(version){
            var that =this
            var url = document.createElement('a')
            url.href = this.gist.repository

            if(url.hostname == 'github.com')
                var host = "https://raw.githubusercontent.com{repo}/";
            else if(url.hostname == 'bitbucket.org')
                var host = "https://bitbucket.org{repo}/raw/";

            var pathname = url.pathname.replace('.git','')
            host = host.replace('{repo}',pathname);

            this.$http({url:  host+ this.version_id + '/readme.md'}).then(
                function(response){
                    that.readme = converter.makeHtml(response.data);
                },
                function(errorResponse){
                    this.$http({url: host+ this.version_id + '/README.md'}).then(
                        function(response){
                            that.readme = converter.makeHtml(response.data);                        })

                })
        }

    }
}
