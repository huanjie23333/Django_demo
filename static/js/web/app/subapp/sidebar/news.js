define(['libs/Class', 'subapp/data/feed','jquery', 'underscore'],
    function(Class, Feed, $, _){

        var NewsApp = Class.extend({
            handle_title_click: function(e) {
               var $content  = $(e.currentTarget).parent().find('.news-content');
                   $content.toggleClass('hidden');
                   return ;
            },

            setupTitleClick: function () {
                this.$news_list.on('click', '.news-title', this.handle_title_click.bind(this));
            },

            init: function(option){
                this.$news_list = $('.news-list');
                if(!!!this.$news_list.length) return ;

                this.template =  _.template($('#news_template').html());

                if(!option["feed"]){
                    throw Error('can not init a price app without a feed');
                }

                if(!option["adapter"]){
                    throw Error('need adapter to goon');
                }

                this.dataFeed = option["feed"];
                this.dataFeed.on('data_arrive',this.handle_data.bind(this));
                this.dataFeed.on('data_fail', this.handle_fail.bind(this));

                this.adapter = option["adapter"];
                this.setupTitleClick();
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
                 _.map(this.data_list, this._render_item.bind(this));
            },

            _render_item: function(entry){
                 this.create_element(entry);
            },

            create_element: function (entry) {
                this.$news_list.append($(this.template(entry)))
            },

        });
        return NewsApp;

});