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
        'subapp/header/search_site',
        'subapp/search/search_news_ajax',
        'subapp/countdown/btc_countdown',
        'subapp/fork_list/fork_list',
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
              SearchNews,
              SearchSite,
              SearchNewsAjax,
              BtcCountdown,
              ForkListApp
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
        new SearchSite();
        new SearchNewsAjax();

        // for news tag trigger ;
        new TagTrigger();
        new BtcCountdown();

        // fork list page

        new ForkListApp();



        all_price_feed.run();
        console.log('finish');

    });
