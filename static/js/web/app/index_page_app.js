require([
        'libs/polyfills',
        'jquery',
        'subapp/data/datafeed',
        'subapp/data/feed',
        'subapp/data/allcoinprice',
        'subapp/adapters/coinmarketcapAdapter',
        'subapp/scrollprice',
        'subapp/tracker',
        'libs/salvattore',
        'subapp/tools/bookmark'

    ],
    function (polyfill,
              $,
              DataFeed,
              Feed,
              AllCoin,
              Adapter,
              ScrollPrice,
              Tracker,
              Layout,
              BookMark
              ) {
        var datafeed = new DataFeed();

        //var scroll_price = new ScrollPrice();
        var tracker = new Tracker();
        //here for side bar price list render
        var all_price_feed = new Feed({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=40&convert=CNY',
            method: 'GET',
            interval: 5000
        });
        var all_coin = new AllCoin({
            feed: all_price_feed,
            adapter : new Adapter()
        });
        all_price_feed.run();
        //
        console.log('finish');

    });
