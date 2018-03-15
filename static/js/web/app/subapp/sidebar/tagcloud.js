define(['libs/Class','jquery', 'libs/jqcloud', 'underscore'],
    function(
    Class,
    $,
    jqCloud,
    _
){
    var TagCloud =  Class.extend({
        handle_data: function(data){
            data['tags'] = data['tags'].slice(0,40);
            this.$el.append($(this._template(data)));
        },
        init_tag_request: function(){
            $.when($.ajax(
                {
                    // url: 'http://127.0.0.1:7000/api/news/tags/',
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
        },
        render: function(){
            this.$el.jQCloud(this.tag_list);
        },
    });

    return TagCloud;

});