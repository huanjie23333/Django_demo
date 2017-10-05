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
        init: function(){
            console.log('init tag cloud');
            this.$el = $('#tag_cloud');
            this.tag_list = window.tag_list_json;
            if( !this.tag_list || !this.$el.length){
                return;
            }

            this.clear_data();
            this.render();

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