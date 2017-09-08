require([
        'libs/polyfills',
        'jquery',
        'subapp/data/datafeed',
        'libs/salvattore'
    ],
    function (polyfill,
              $,
              DataFeed,
              Layout

              ) {
        var datafeed = new DataFeed();
        console.log('finish');

    });
