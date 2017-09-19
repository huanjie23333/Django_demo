define(['libs/Class', 'jquery'],function(Class, $){

    var Tracker = Class.extend({
        init: function(){
            $('a[data-category]').click(this.track_click.bind(this));
        },
        track_click_bd: function (e) {
            var category = $(e.target).attr('data-category');
            var tag = $(e.target).attr('data-tag');
            var site = $(e.target).attr('data-site');
            window._hmt.push(['_trackEvent',
                              'link', 'click',
                              'category', category,
                              'tag', tag,
                              'site', site
                            ]);


        },
        track_click_gg: function (e) {
        //
            var category = $(e.target).attr('data-category');
            var tag = $(e.target).attr('data-tag');
            var site = $(e.target).attr('data-site');
            ga('send', {
                hitType: 'event',
                eventCategory: 'off_site_link',
                eventAction: 'click',
                eventLabel: site,
                transport: 'beacon'

            });
            return ;
        },
        track_click:function(e){
            if(window._hmt){
                this.track_click_bd(e);
            }
            if(window.ga){
                this.track_click_gg(e);
            }
        },
    });

    return Tracker;

})