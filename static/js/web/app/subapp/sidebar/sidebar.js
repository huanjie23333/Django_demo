define(['libs/Class',
    'jquery',
    //for news
    'subapp/sidebar/news',
    'subapp/data/fakeFeed',
    'subapp/adapters/coinbeef',
    //for price list
    'subapp/sidebar/allcoinprice',
    'subapp/adapters/coinmarketcapAdapter',

    //for tag scroll
    'subapp/sidebar/scrollbox',
    // tag cloud
    'subapp/sidebar/tagcloud',
    'subapp/sidebar/clock'
],
    function(Class,
             $,
             NewsApp,
             FakeFeed,
             CoinBeefAdapter,

             AllCoin,
             AllCoinAdapter,

             ScrollBox,

             TagCloud,
             Clock


    ){

    var SideBarApp = Class.extend({
        init:function(){

            this.newsFeed = new FakeFeed({
                data:window.news_obj,
                interval:-1, // no repeat
            });
            this.news =new NewsApp({
                feed:  this.newsFeed,
                adapter: new CoinBeefAdapter()
            });
            // already rendered by server
            // close the feed
            //this.newsFeed.run();

            new AllCoin({
                    feed: window.app.price_feed,
                    adapter : new AllCoinAdapter()
                });

            // for tags list scroll stick
            new ScrollBox();

            // for tagcloud
            new TagCloud();

            // countdown for 2x fork
            Clock();
        }
    });
    return SideBarApp;
});