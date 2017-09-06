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
           var symbols = ['BTC', 'ETH', 'LTC'];
           _.map(this.elements, this.handle_element.bind(this));
       },
       handle_element: function(key, value){
            console.log(key);
            console.log(value);
       }
   });
   return Quote;
});