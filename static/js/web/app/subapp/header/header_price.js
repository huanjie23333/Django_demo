define(['libs/Class','jquery','underscore'],
function(Class,$,_){
   var HeaderPrice = Class.extend({

       get_el: function () {
           return $('#header_price_list');
       },
       get_template: function () {
           return _.template($('#header_price_template').html());
       },

       init:function(option){
           this.$el = this.get_el();
           if(!!!this.$el.length) return ;

           this.template = this.get_template();

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

       _render_item: function(entry){
           //console.log('entry');
           //console.log(entry);
           var ele = this.$el.find('#'+entry['element_id']);
           if(ele.length){
               this.set_price(ele, entry);
           }else{
               var ele = this.template(entry);
               ele = this.$el.append(ele);
               this.set_price(ele, entry);

           }

       },
       set_price:function(elem, quote){

           var change = 0
           try{
                var change = parseFloat(quote['change']);
           }
           catch(error){

           }
           if (change > 0){
               $(elem).find('.price').removeClass('fall').addClass('raise');
               $(elem).find('i').removeClass('fall fa-arrow-down').addClass('fa-arrow-up raise');
           }else{
               $(elem).find('.price').removeClass('raise').addClass('fall');
               $(elem).find('i').removeClass('fa-arrow-up raise').addClass('fall fa-arrow-down');
           }

           return;
       }
   });
   return HeaderPrice;
});