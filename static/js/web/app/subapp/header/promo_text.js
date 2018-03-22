define(['libs/Class','jquery', 'underscore'], function(Class, $, _){

    var PromoTextApp = Class.extend({
        init: function () {
            var stop = false;
            console.log('in promotext');


            // $('.promo-text-wrapper').marquee({
            //     gap: 150,
            //     duration: 500,
            // });
            // window.setInterval(function(){
            //      if (stop){
            //        $('.promo-text-wrapper').marquee('toggle');
            //      }else{
            //          stop = true;
            //          return ;
            //      }
            //
            // }, 1000);
            this.element_count = 6 ;
            this.current_ele_index = 1 ;
            this.element_width = 150;
            this.$ele_wrapper = $('.promo-text-list');
            if(!this.$ele_wrapper.length){
                return;
            }
            this.start_mq();
        },

        start_mq: function () {
            window.setInterval(this.marquee.bind(this), 2000)
        },
        marquee: function () {
            if(this.current_ele_index == this.element_count){
                this.$ele_wrapper.css({left: -this.element_width * 2});
                this.current_ele_index = 3;
            }
            // console.log('current ele index : ' + this.current_ele_index);
            // console.log('move : ' + this.element_width * (this.current_ele_index-1));
            this.current_ele_index += 1;
            this.$ele_wrapper.animate({left: -this.element_width * (this.current_ele_index-1)}, 500);
        }


    });

    return PromoTextApp;
});