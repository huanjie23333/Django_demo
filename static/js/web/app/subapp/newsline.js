define(['libs/Class','subapp/data/feed','subapp/adapters/coinbeef_all', 'utils/template','underscore'],
    function(Class,Feed,CoinBeefAdapter,Template, _){

        var NewsLineApp = Class.extend({

            get_feed: function (options) {
                var feed = new Feed(options);
                    feed.on('data_arrive',this.handle_data.bind(this));
                    feed.on('data_fail', this.handle_fail.bind(this));
                    return feed;
            },

            init:function(){

                this.$newsline =  $('.newsline');
                if(!!!this.$newsline.length) return ;

                this.template = Template($('#newsline_template').html());

                this.dataFeed = this.get_feed({
                     url: 'http://www.chainscoop.com/api/news.json',
                    method: 'GET',
                    interval:-1, // no repeat
                });
                this.adapter = new CoinBeefAdapter();

                this.dataFeed.run();
            },

            handle_data: function(data){
                this.data_list = this.adapter.update(data).spit();
                this.render();
             },

            handle_fail: function(data){
                console.log('news data fail');
                console.log(data);
            },

            render: function(){
                console.log(this.data_list);
                _.map(this.data_list, this._render_item.bind(this));
            },
            _render_item: function(entry){
                 this.create_element(entry);
            },
            create_element: function (entry) {
                this.$newsline.append($(this.template(entry)))
            },


        });

        return NewsLineApp;
    });