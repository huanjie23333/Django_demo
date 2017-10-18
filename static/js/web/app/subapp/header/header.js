define(['libs/Class',
        'subapp/header/header_price',
        'subapp/adapters/HeaderCoinmarketcapAdapter',
        'subapp/header/search'
    ],
    function(Class, HeaderPrice, HeaderCoinmarketAdapter,Search){

    var HeaderApp = Class.extend({
        init:function(option){
            // for header price display;
            this.header_price = new HeaderPrice({
                feed: window.app.price_feed,
                adapter : new HeaderCoinmarketAdapter()
            });

            this.search = new Search();

        },

    });
    return HeaderApp;
});