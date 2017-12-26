define(['libs/Class','jquery','highstock','highcharts_lang'],function(Class,$,highstock,highcharts_lang){
    var Chart = Class.extend({
        init:function(){
            this.get_chart();
        },
        get_chart:function(){
            var data = [];
            for(var i=0; i < crypto_index.length ; i++){
                var arr = [];
                var time = new Date(crypto_index[i].date);
                arr.push(time.getTime());
                arr.push(crypto_index[i].price);
                data.push(arr);
            }
            $('#chart_container').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1,
                        enabled:true
                    },
                    navigator:{
                        enabled:false
                    },
                    scrollbar:{
                        enabled:false
                    },
                    exporting:{
                        enabled:false
                    },
                    credits:{
                        enabled:false
                    },
                    title: {
                        text: 'BTC'
                    },
                    series: [{
                        name: 'BTC Price',
                        data: data,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }
        });
    return Chart;

});