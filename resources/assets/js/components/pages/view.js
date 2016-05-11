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
            versionPulled: 0,
            selectedVersion: []
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

                console.log(that.gist.versions)
                that.selectedVersion = that.gist.latest;
                that.selectedVersion.require_dev = that.gist.latest['require-dev'];
                that.getreadme(that.version_id);

                var $select = $('#versionsList').selectize({
                    persist: false,
                        maxItems: 1,
                        valueField: 'version',
                        labelField: 'version',
                        searchField: ['version'],
                        options: that.gist.versions
                    })
                var selectize = $select[0].selectize;

                // Selectize events for items selected and deselected
                selectize.on('item_add', function(value, $item){
                    that.gist.versions.forEach(function(g){
                        if( $item[0].dataset.value == g.version )
                            {
                                var gist = g;
                                that.selectedVersion = g;
                                that.selectVersion();
                            }
                    })
                })
            }, 
            function(errorResponse){
                console.log('error');
            })


        },

        versionsList : function(){

        },

        getreadme: function(version){
            var that =this

            //Creating dummy a element to parse repository url
            var url = document.createElement('a')
            url.href = this.gist.repository

            if(url.hostname == 'github.com')
                var host = "https://raw.githubusercontent.com{repo}/";
            else if(url.hostname == 'bitbucket.org')
                var host = "https://bitbucket.org{repo}/raw/";

            var pathname = url.pathname.replace('.git','')
            host = host.replace('{repo}',pathname);

            this.$http({url:  host+ version + '/readme.md'}).then(
                function(response){
                    that.readme = converter.makeHtml(response.data);
                },
                function(errorResponse){
                    this.$http({url: host+ version + '/README.md'}).then(
                        function(response){
                            that.readme = converter.makeHtml(response.data);                        })

                })

        },

        selectVersion: function(){
            console.log(this.selectedVersion)

            this.getreadme(this.selectedVersion.version)
            this.selectedVersion.require_dev = this.selectedVersion['require-dev'];

        }

    }
}
