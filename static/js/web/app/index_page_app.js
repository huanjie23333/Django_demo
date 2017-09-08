require([
        'libs/polyfills',
        'jquery',
        'subapp/data/datafeed',
        'subapp/data/feed',
        'subapp/data/allcoinprice',
        'libs/salvattore'
    ],
    function (polyfill,
              $,
              DataFeed,
              Feed,
              AllCoin,
              Layout

              ) {
        var datafeed = new DataFeed();
        //here for side bar price list render
        var all_price_feed = new Feed({

        });

        //
        console.log('finish');

    });
