define(['libs/Class', 'jquery', 'underscore'], function(Class, $, _){
    var eosListApp = Class.extend({
        init: function(){
            if(!$('.eos-nodes').length) return;
            this.renderEos();
            this.handleLoadBtn();
        },
        renderEos: function(){
            var that = this;
            $.when($.get('https://www.chainnews.com/api/eos/')).then(function(data){
                $('.loading-box').addClass('hidden-box');
                that.loadMore = data.next;
                if(data.next){
                    $('.load-more-btn').removeClass('hidden-box');
                }
                var banner = _.template($('#eos-nodes-banner-template').html());
                var bannerHTML = banner({data: data.results.slice(0,3)});
                $('.eos-banner').html(bannerHTML);
                that.list = _.template($('#eos-nodes-list-template').html());
                that.listHTML = that.list({data: data.results.slice(3)});
                $('.eos-list').html(that.listHTML);
            });
        },
        handleLoadBtn: function(){
            var that = this;
            $('.load-more-btn').click(function(){
                $('.load-more-btn').html('加载中...').blur();
                $.when($.get(that.loadMore)).then(function(data){
                    that.loadMore = data.next;
                    if(!data.next){
                        $('.load-more-btn').addClass('hidden-box');
                    }
                    that.listHTML += that.list({data: data.results});
                    $('.eos-list').html(that.listHTML);
                    $('.load-more-btn').html('加载更多');
                });
            });
        }
    });
    return eosListApp;
});