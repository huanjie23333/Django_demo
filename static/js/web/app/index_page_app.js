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
        'subapp/news/tagtrigger',
        'subapp/captcha/captcha',
        'subapp/submit/getsitedata',
        'subapp/header/search_news',
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
              BookMark,
              TagTrigger,
              Captcha,
              GetSiteData,
              SearchNews
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
        new Captcha();

        new GetSiteData();

        new SearchNews();

        // for news tag trigger ;
        new TagTrigger();



        all_price_feed.run();
        console.log('finish');

    });
