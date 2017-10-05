define(['libs/Class','subapp/header/header_price', 'subapp/adapters/HeaderCoinmarketcapAdapter'],
    function(Class, HeaderPrice, HeaderCoinmarketAdapter){

    var HeaderApp = Class.extend({
        init:function(option){
            // for header price display;
            this.header_price = new HeaderPrice({
                feed: window.app.price_feed,
                adapter : new HeaderCoinmarketAdapter()
            });


        },

    });
    return HeaderApp;
});