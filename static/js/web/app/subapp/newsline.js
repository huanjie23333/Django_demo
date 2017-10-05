define(['libs/Class','subapp/data/fakeFeed','subapp/data/Feed','subapp/adapters/coinbeef_all','underscore'],
    function(Class,FakeFeed,Feed,CoinBeefAdapter,_){

        var NewsLineApp = Class.extend({

            get_feed: function (options) {
                var feed = new Feed(options);
                feed.on('data_arrive',this.handle_data.bind(this));
                feed.on('data_fail', this.handle_fail.bind(this));
                return feed;
            },

            get_fake_feed: function(options){
                var feed = new FakeFeed(options);
                feed.on('data_arrive',this.handle_data.bind(this));
                feed.on('data_fail', this.handle_fail.bind(this));
                return feed;
            },

            display_loading_info: function () {
                if(this.$loadBtn && this.$loadBtn.length){
                    this.$loadBtn.html('加载中...');
                }
            },

            hide_loading_info: function () {
                 if(this.$loadBtn && this.$loadBtn.length){
                     this.$loadBtn.html('加载更多');
                 }
            },

            load_next: function () {
                if(!this.next_page_url) return ;

                this.display_loading_info();

                //release old feed
                delete(this.dataFeed);

                this.dataFeed = this.get_feed({
                    url: this.next_page_url,
                    method: "GET",
                    interval:-1
                });

                this.dataFeed.run();

            },
            initLoadBtn: function () {
                var $btn = this.$loadBtn = $('.btn-load-news');
                if(!$btn.length){
                    return
                }
                $btn.on('click', this.load_next.bind(this));
            },


            init:function(){

                this.$newsline =  $('.newsline');
                if(!!!this.$newsline.length) return ;

                this.template = _.template($('#newsline_template').html());

                //this.dataFeed = this.get_feed({
                //     url: '/news/json/?page=1',
                //    method: 'GET',
                //    interval:-1, // no repeat
                //});

                this.dataFeed = this.get_fake_feed({
                    data: window.news_obj,
                    interval:-1, // no repeat

                });

                this.adapter = new CoinBeefAdapter();

                this.dataFeed.run();
                this.initLoadBtn();
            },

            hide_load_btn: function () {
                 $('.btn-load-news').hide();
            },
            handle_data: function(data){
                this.next_page_url = this.get_next_page_url(data['next']);
                if(!this.next_page_url){
                    this.hide_load_btn();
                }
                this.data_list = this.adapter.update(data).spit();
                this.render();
                this.hide_loading_info();
            },

            get_next_page_url:function(origin_url){
                var host = '/news/json/';
                if(!origin_url){
                    return null;
                }
                var parser = document.createElement('a');
                parser.href = origin_url;
                return host + parser.search;
            },

            handle_fail: function(data){
                console.log('news data fail');
                console.log(data);
                this.hide_loading_info();
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