require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/sidebar/sidebar',
        'subapp/newsline',
        'subapp/gotop',
        'libs/salvattore',
        'subapp/tools/bookmark',
        'bootstrap'
    ],
    function (polyfill,
              $,
              Header,
              Feed,
              Tracker,
              SideBar,
              NewsLine,
              GoTop,
              Layout,
              BookMark
              ) {

        jQuery = $;
        // require('bootstrap');
        window.app = {};
        var all_price_feed = window.app.price_feed = new Feed({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=40&convert=CNY',
            method: 'GET',
            interval: 15000
        });

        new Header();
        new SideBar();
        new Tracker();
        new NewsLine();
        new GoTop();


        all_price_feed.run();
        console.log('finish');

    });
