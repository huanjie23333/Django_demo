require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/newsline',
        'subapp/gotop',
        'libs/salvattore',
        'subapp/tools/bookmark'

    ],
    function (polyfill,
              $,
              Header,
              Feed,
              Tracker,
              NewsLine,
              GoTop,
              Layout,
              BookMark
              ) {

        window.app = {};
        var all_price_feed = window.app.price_feed = new Feed({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=40&convert=CNY',
            method: 'GET',
            interval: 5000
        });

        new Header();
        new Tracker();
        new NewsLine();
        new GoTop();

        all_price_feed.run();
        console.log('finish');

    });