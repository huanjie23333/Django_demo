define(['libs/Class', 'subapp/header/quote'],function(
    Class,
    Quote

){
    var DataFeed = Class.extend({
        init: function(){
            $.when($.ajax({
                url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10&convert=CNY',
                method:'GET'
            })
            ).then(
                this.get_data_success.bind(this),
                this.get_data_fail.bind(this)
            );
            this.quote = new Quote();
        },

        get_data_success:function(data){
            console.log(data);
            this.quote.update(data);
        },
        get_data_fail:function(){
            console.log('failed!!!');
        }
    });
    return DataFeed;
});