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
       handle_element: function(elem, key){
            var the_quote = _.filter(this.data, function(item){
                return item['symbol'] == key
            })[0];
            this.set_price(elem, the_quote);
       },
       set_price:function(elem, quote){
           var price = Math.round(parseFloat(quote['price_cny'])*100)/100.0;
           $(elem).find('.price').html(price);
           return;
       }
   });
   return Quote;
});