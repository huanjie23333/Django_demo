define(['libs/Class','underscore'],function(Class,_){
   var Quote = Class.extend({
       init: function(){
           this.elements = {
               BTC: $('#quote_btc'),
               ETH: $('#quote_eth'),
               LTC: $('#quote_ltc')
           }
       },
       update:function(data){
           this.data = data;
           var symbols = ['BTC', 'ETH', 'LTC'];
           _.map(this.elements, this.handle_element.bind(this));
       },
       set_price:function(elem, quote){
           var price = Math.round(parseFloat(quote['price_cny'])*100)/100.0;
           $(elem).find('.price').html(price);

           var change = 0
           try{
                var change = parseFloat(quote['percent_change_1h']);
           }
           catch(error){

           }
           if (change > 0){
               $(elem).find('.price').removeClass('fall').addClass('raise');
               $(elem).find('i').removeClass('fall fa-long-arrow-down').addClass('fa-long-arrow-up raise');
           }else{
               $(elem).find('.price').removeClass('raise').addClass('fall');
               $(elem).find('i').removeClass('fa-long-arrow-up raise').addClass('fall fa-long-arrow-down');
           }

           return;
       },
       handle_element: function(elem, key){
            var the_quote = _.filter(this.data, function(item){
                return item['symbol'] == key
            })[0];
            this.set_price(elem, the_quote);
       }
   });
   return Quote;
});