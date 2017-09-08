define(['libs/Class', 'subapp/header/quote'],function(
    Class,
    Quote
){
    var DataFeed = Class.extend({
        can_use_ws: function () {
            //try {
            //    this.ws = new WebSocket("wss://api.huobi.pro/ws",)
            //    this.ws.send({
            //          "sub": "market.btccny.kline.1min",
            //          "id": "id1"
            //    });
            //}
            //catch (exp){
            //    return false;
            //}
            return false;
        },
        init: function(){

           this.quote = new Quote();
           if (!this.can_use_ws()){
                this.update_quote();
                window.setInterval(this.update_quote.bind(this),30000)
           }
        },

        update_quote:function(){
             $.when($.ajax({
                url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10&convert=CNY',
                method:'GET'
            })
            ).then(
                this.get_data_success.bind(this),
                this.get_data_fail.bind(this)
            );

        },

        get_data_success:function(data){
            console.log(data[0]['price_cny']);
            this.quote.update(data);
        },
        get_data_fail:function(){
            console.log('failed!!!');
        }
    });
    return DataFeed;
});