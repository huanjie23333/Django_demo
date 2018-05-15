define(['libs/Class', 'jquery', 'underscore', 'libs/numeral.min'], function(Class, $, _, numeral){
    var renderCoinsRank = Class.extend({
        init: function(){
            if(!$('#coin_table').length) return;
            var compiled = _.template($('#coins-rank-table').html());
            $.when($.ajax('https://www.chainnews.com/api/tokenlist?limit=100&skip=0')).then(function(res){
                render(res);

                $('#search-coin-btn').click(function(){
                    var text = $('input[name="q"]').val().trim();
                    var api = 'https://www.chainnews.com/api/tokenlist?limit=10&skip=0&query.$or[0].symbol=/Bitcoin/&query.$or[1].en_name=/Bitcoin/&query.$or[2].zh_name=/Bitcoin/';
                    $('#coin_table tbody').html('');
                    $('.loading-box').removeClass('hidden-box');
                    $.when($.ajax(api.replace(/Bitcoin/g, text))).then(function(res){
                        render(res);
                    });
                });

                window.app.table = $('#coin_table').DataTable({
                     // stateSave: true,
                     "pageLength": 100,
                     "lengthChange":true,
                     "paging": false,
                     "searching": false,
                     "info":false,
                     "language": {
                         "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Chinese.json"
                     },
                     "order": [[ 2, "desc" ]]
                });
            });
            function render(res){
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
                $('.loading-box').addClass('hidden-box');
            }
        }
    });
    return renderCoinsRank;
});