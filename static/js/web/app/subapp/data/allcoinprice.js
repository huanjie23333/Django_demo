define(['libs/Class','utils/template','jquery','underscore'], function(Class,Template,$, _){

    var AllCoinPrice = Class.extend({

        init: function(option){
            this.$coin_list= $('#coin_list');
            this.tempalte = Template($('#coin_template').html())
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
            this.data_list = this.adapter.update(data).spit();
            this.render();
        },

        handle_fail:function(error){
            console.log('price data fail');
            console.log(error);
        },

        render: function(){
            _.map(this.data_list, this._render_item.bind(this));
        },

        update_element: function (element, coin_data) {
            var change_class = coin_data['change_class'];
            $(element).find('.coin-price').removeClass('fail raise').addClass(change_class).html(coin_data['price_cny']);
            $(element).find('.coin-change').removeClass('fail raise').addClass(change_class).html(coin_data['change_percent']);
        },

        create_element: function (coin_data) {
            this.$coin_list.append($(this.tempalte(coin_data)))
        },

        _render_item: function(coin_data){
            //console.log('item_data');
            //console.log(coin_data);
            var element = this.$coin_list.find('#'+coin_data['id']);
            if(element.length){
                this.update_element(element, coin_data);
            }else{
                this.create_element(coin_data);
            }
        },
    });
    return AllCoinPrice;
});