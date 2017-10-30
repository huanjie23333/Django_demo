require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/gotop',
        'subapp/tools/bookmark',
        'datatable',
        'bootstrap'
    ],
    function (polyfill,
              $,
              Header,
              Feed,
              Tracker,
              GoTop,
              DataTable,
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
        new Tracker();
        new GoTop();
        // header price fetch
        all_price_feed.run();

        // datatable

        // require('libs/datatable', function (){
        //
        //
        //
        // });


        $('#coin_table').DataTable({
                 stateSave: true
        });


        console.log('finish');

    });
