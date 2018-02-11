define(['libs/Class','jquery', 'libs/jqcloud', 'underscore'],
    function(
    Class,
    $,
    jqCloud,
    _
){
    var TagCloud =  Class.extend({
        _clear_tag: function (tag) {
            var new_tag = _.clone(tag);
                new_tag['text'] = tag['name'];
                new_tag['weight'] = (tag['count'] + 160)/12;
                new_tag['link'] = '/news/tag/'+ tag['name'] +'/';
            return new_tag;

        },
        clear_data: function () {
            this.tag_list = _.map(this.tag_list, this._clear_tag.bind(this));
        },
        handle_data: function(data){
            data['tags'] = data['tags'].slice(0,40);
            this.$el.append($(this._template(data)));
        },
        init_tag_request: function(){
            $.when($.ajax(
                {
                    url: 'https://api.chainnews.com/api/news/tags/',
                    method: 'GET'
                }
            )).then(this.handle_data.bind(this))
        },
        init: function(){
            console.log('init tag cloud');
            this.$el = $('.sidebar-tag-list-wrapper');
            if (!$('#news_tag_template').length || !this.$el.length){
                return ;
            }
            this._template = _.template($('#news_tag_template').html());
            this.init_tag_request();
            this.tag_list = null
            // if( !this.tag_list || !this.$el.length){
            //     return;
            // }
            //
            // this.clear_data();
            // this.render();

        },
        render: function(){
            this.$el.jQCloud(this.tag_list);
            //this.$el.jQCloud(
            //
            //)
        },
    });

    return TagCloud;

});