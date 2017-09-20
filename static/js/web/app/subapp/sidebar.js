define(['libs/Class','jquery','subapp/sidebar/news', 'subapp/data/feed', 'subapp/adapters/coinbeef'],
    function(Class,$,NewsApp, Feed, CoinBeefAdapter){

    var SideBarApp = Class.extend({
        init:function(){
            this.newsFeed = new Feed({
                url: 'http://www.chainscoop.com/api/news.json',
                method: 'GET',
                interval:-1, // no repeat
            });
            this.news =new NewsApp({
                feed:  this.newsFeed,
                adapter: new CoinBeefAdapter()
            });

            this.newsFeed.run();
        }
    });
    return SideBarApp;
});