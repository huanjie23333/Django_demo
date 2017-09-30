define(['libs/Class','jquery','subapp/sidebar/news', 'subapp/data/fakeFeed', 'subapp/adapters/coinbeef'],
    function(Class,$,NewsApp, FakeFeed, CoinBeefAdapter){

    var SideBarApp = Class.extend({
        init:function(){
            if(!window.news_obj){
                throw Error('CAN NOT FIND NEWS DATA');
            }
            this.newsFeed = new FakeFeed({
                data:window.news_obj,
                interval:-1, // no repeat
            });
            this.news =new NewsApp({
                feed:  this.newsFeed,
                adapter: new CoinBeefAdapter()
            });
            // already rendered by server
            // not need feed to run ......
            //this.newsFeed.run();
        }
    });
    return SideBarApp;
});