define(['libs/Class', 'jquery', 'underscore'], function(Class, $, _){
    var eosListApp = Class.extend({
        init: function(){
            if(!$('.eos-nodes').length) return;
            this.renderEos();
        },
        renderEos: function(){
            $.when($.get('https://www.chainnews.com/api/eos/')).then(function(data){
                console.log(data);
                var banner = _.template($('#eos-nodes-banner-template').html());
                var bannerHTML = banner({data: data.results.slice(0,3)});
                $('.eos-banner').html(bannerHTML);
                this.list = _.template($('#eos-nodes-list-template').html());
                var listHTML = this.list({data: data.results.slice(3)});
                $('.eos-list').html(listHTML);
            });

        }
    });
    return eosListApp;
});