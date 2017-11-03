require([
        'libs/polyfills',
        'jquery',
        'subapp/header/header',
        'subapp/data/feed',
        'subapp/tracker',
        'subapp/gotop',
        'subapp/tools/bookmark',
        'datatable',
        'subapp/stockchart',
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

        if($('#coin_table').length){
            window.app.table = $('#coin_table').DataTable({
                 // stateSave: true,
                 "pageLength": 100,
                 "lengthChange":true,
                 "paging": false,
                 "searching": false,
                 "info":false,
                 "language": {
                     "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Chinese.json"
                 }
            });
        }

        console.log('finish');

    });

