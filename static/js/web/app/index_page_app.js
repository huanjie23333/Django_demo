require([
        'libs/polyfills',
        'jquery',
        'subapp/data/datafeed'
    ],
    function (polyfill,
              $,
              DataFeed

              ) {
        var datafeed = new DataFeed();
        console.log('finish');

    });
