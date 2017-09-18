define(['fastdom', 'jquery','libs/Class', 'underscore'],function(fastdom, $, Class, _){

    var ScrollPriceApp = Class.extend({
        init: function(){
            this.price_container = $('#side_column')
            this.setupScrollMenu();
        },
        setupScrollMenu: function(){
            $(window).scroll(this.schedulePriceMove.bind(this));
        },
        schedulePriceMove:function(){
            var that = this;
            if (!this.read){
                this.read = fastdom.read(function(){
                    that.scrollTop = $(window).scrollTop();
                    if($('#header').length){
                         //console.log('top: :'+ $('#header')[0].getBoundingClientRect().top);
                         that.current_move_target = $('#header')[0].getBoundingClientRect().top + 110;
                         that.css_left_target = $('#main_column')[0].getBoundingClientRect().right;

                    }
                });
            }

            if(this.write) {
                fastdom.clear(this.write);
            }

            this.write = fastdom.write(this.moveprice.bind(this));
        },

        moveprice:function(){
            //console.log('move header');
            if(this.current_move_target>=0) {
                this.read = null;
                //console.log(this.current_move_target);
                this.price_container.css({
                    top:0+'px',
                    left:0 + 'px',
                    position:'relative'
                });

                return ;
            }else{
                this.price_container.css({
                    top:0+'px' ,
                    left: this.css_left_target +'px',
                    position:'fixed',
                });
                //console.log(this.current_move_target);
                this.read = null ;
                return ;

            }


        },
    });

    return ScrollPriceApp;

});