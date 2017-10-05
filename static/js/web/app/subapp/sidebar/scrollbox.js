define(['libs/scroller', 'jquery', 'underscore'],function(Scroller, $, _){

    var ScrollBoxApp = Scroller.extend({
        init:function(){
            this._super();
            this.origin_width = this.get_box().getBoundingClientRect().width;
            $(this.get_target()).css({
                                           width:this.origin_width+'px',
                                       });
        },
        get_footer: function(){
            return document.getElementById('footer');
        },
        get_box: function(){
            return document.getElementById('side_bar_bottom');
        },

        get_target:function(){
            return document.getElementById('scroll_target');
        },

        get_touch_bottom: function () {
            var footer = this.get_footer().getBoundingClientRect();
            var target = this.get_target().getBoundingClientRect();
            return footer.top <= target.top+target.height+10;
        },
        _read: function(){
                    var box = this.get_box();

                    var rect = box.getBoundingClientRect();
                    if (!this.target_height){
                        this.target_height = this.get_target().getBoundingClientRect().height;
                        console.log(this.target_height);
                    }
                    this.top_distance = this.get_footer().getBoundingClientRect().top;
                    this.top = rect.top+rect.height;
                    this.touch_bottom = this.get_touch_bottom();
                    //console.log(this.touch_bottom);
                },

        _write:function(){
               if(this.top<0 && this.top_distance > (this.target_height + 20)){
                    $(this.get_target()).addClass('static-box');

               }else{
                    $(this.get_target()).removeClass('static-box');
               }


        },
    });

    return ScrollBoxApp;

});