define(['libs/Class',
        'subapp/header/header_price',
        'subapp/adapters/HeaderCoinmarketcapAdapter',
        'subapp/header/search',
        'subapp/header/promo_text',
    ],
    function(
        Class,
        HeaderPrice,
        HeaderCoinmarketAdapter,
        Search,
        PromoText
    ){

    var HeaderApp = Class.extend({
        init:function(option){
            // for header price display;
            // this.header_price = new HeaderPrice({
            //     feed: window.app.price_feed,
            //     adapter : new HeaderCoinmarketAdapter()
            // });

            this.search = new Search();
            // for promo text
            // new PromoText();

        },

    });
    return HeaderApp;
});