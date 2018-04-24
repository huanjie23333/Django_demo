define(['libs/Class', 'jquery', 'underscore', 'numeral'], function(Class, $, _){
    var renderCoinsRank = Class.extend({
        init: function(){
            var compiled = _.template($('#coins-rank-table').html());
            $.when($.ajax('https://api.blockinner.com/api/coin/getList?limit=100&skip=0')).then(function(res){
                console.log(res.data.data);
                res.data.data.forEach(function(item, idx){

                });
                // var html = compiled({ coins: res.data.data });
                // $('#coin_table tbody').html(html);
            });
        }
    });
    return renderCoinsRank;
});