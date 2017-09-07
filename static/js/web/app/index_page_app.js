require([
        'libs/polyfills',
        'jquery',
        'subapp/data/datafeed',
        'subapp/layout'
    ],
    function (polyfill,
              $,
              DataFeed,
              Layout

              ) {
        var datafeed = new DataFeed();
        var layout = new Layout();
        console.log('finish');

    });
