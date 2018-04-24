define(['libs/Class', 'jquery', 'underscore', 'libs/numeral.min'], function(Class, $, _, numeral){
    var renderCoinsRank = Class.extend({
        init: function(){
            var compiled = _.template($('#coins-rank-table').html());
            $.when($.ajax('https://api.blockinner.com/api/coin/getList?limit=100&skip=0')).then(function(res){
                console.log(res.data.data);
                res.data.data.forEach(function(item, idx){
                    item.attach.total_market_cap_usd_f = numeral(item.attach.total_market_cap_usd).format('0,0.00');
                    item.attach.volume_usd_statistic.of24h_f = numeral(item.attach.volume_usd_statistic.of24h).format('0,0.00');
                    item.attach.price_cny_f = numeral(item.attach.price_cny).format('0,0.00');
                    if(item.attach.increase_rate > 0){
                        item.attach.increase_rate_f = '+' + numeral(item.attach.increase_rate).format('0,0.00');
                    } else {
                        item.attach.increase_rate_f =  numeral(item.attach.increase_rate).format('0,0.00');
                    }
                    item.priceClass = item.attach.increase_rate > 0 ? 'raise' : 'fall';
                });
                var html = compiled({ coins: res.data.data });
                $('#coin_table tbody').html(html);
            });
        }
    });
    return renderCoinsRank;
});