define(['libs/Class'], function(Class){
    var AllCoinPrice = Class.extend({
        init: function(feed){
            if(!feed){
                throw Error('can not init a price app without a feed');
            }
            this.dataFeed = feed;
            this.dataFeed.on('data_arrive',this.handle_data.bind(this));
            this.dataFeed.on('data_fail', this.handle_fail.bind(this));
        },
        handle_data: function(data){
            console.log( 'price data arrive');
            console.log(data);
        },
        handle_fail:function(error){
            console.log('price data fail');
            console.log(error);
        },
    });
    return AllCoinPrice;
});