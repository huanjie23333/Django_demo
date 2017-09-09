define(['libs/Class',''], function(Class){
    var AllCoinPrice = Class.extend({
        init: function(option){

            if(!option["feed"]){
                throw Error('can not init a price app without a feed');
            }
            this.dataFeed = option["feed"];
            this.dataFeed.on('data_arrive',this.handle_data.bind(this));
            this.dataFeed.on('data_fail', this.handle_fail.bind(this));

            if(!option["adapter"]){
                throw Error('need adapter to goon');
            }
            this.adapter = option["adapter"];
        },
        handle_data: function(data){
            //console.log(data);
            var new_data = this.adapter.update(data).spit();
            console.log( 'spit out');
            //console.log(new_data);

        },
        handle_fail:function(error){
            console.log('price data fail');
            console.log(error);
        },
    });
    return AllCoinPrice;
});