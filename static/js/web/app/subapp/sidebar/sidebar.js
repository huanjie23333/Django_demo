define(['libs/Class',
    'jquery',
    //for news
    'subapp/sidebar/news',
    'subapp/data/feed',
    'subapp/adapters/coinbeef',
    //for price list
    'subapp/sidebar/allcoinprice',
    'subapp/adapters/coinmarketcapAdapter',

    //for tag scroll
    'subapp/sidebar/scrollbox',
    // tag cloud
    'subapp/sidebar/tagcloud',
    'subapp/sidebar/clock',
],
    function(Class,
             $,
             NewsApp,
             NewsFeed,
             CoinBeefAdapter,

             AllCoin,
             AllCoinAdapter,

             ScrollBox,

             TagCloud,
             ForkClock

    ){

    var SideBarApp = Class.extend({
        init:function(){

            this.newsFeed = new NewsFeed({
                url: 'https://api.chainnews.com/api/news.json',
                method: 'GET',

                interval: -1
            });
            this.news =new NewsApp({
                feed:  this.newsFeed,
                adapter: new CoinBeefAdapter()
            });
            // already rendered by server
            // close the feed
            this.newsFeed.run();

            new AllCoin({
                    feed: window.app.price_feed,
                    adapter : new AllCoinAdapter()
                });

            // for tags list scroll stick
            new ScrollBox();

            // for tagcloud
            new TagCloud();

            // ForkClock();


        }
    });
    return SideBarApp;
});