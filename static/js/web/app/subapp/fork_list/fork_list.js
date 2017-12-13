define(['libs/Class', 'jquery'],function(Class, $){
    var ForkListApp = Class.extend({
        draw_current_block: function (current_block_height) {
            $('.current-block-height .height-number').html(current_block_height);
        },
        draw_count_down: function() {

            var $fork_list = $('.fork-item');
            $fork_list.each(this.draw_single_fork_item.bind(this));
        },


        get_dead_line_secs: function (current_block_height, target_block_height) {

            return (target_block_height - current_block_height) * 60 * 10 ;
        },

        get_deadline_days: function (target_block_height) {
            return Math.floor( this.get_dead_line_secs(this.current_block_height, target_block_height) / (24 * 60 * 60));
        },
        get_is_done: function (current_block_height , target_block_height) {
            return current_block_height > target_block_height;
        },
        get_deadline_hours: function (target_block){

            return Math.floor(this.get_dead_line_secs(this.current_block_height, target_block)/ (60 * 60)) % 24;

        },
        get_deadline_minutes: function (target_block) {
            return Math.floor(this.get_dead_line_secs(this.current_block_height, target_block) / 60) % 60;
        },


        get_deadline_seconds: function (target_block) {
            return this.get_dead_line_secs(this.current_block_height, target_block) % 60;
        },
        draw_single_fork_item: function(index, element){

            var $days = $(element).find('.days');
            var $hours = $(element).find('.hours');
            var $minutes =$(element).find('.minutes');
            var $seconds = $(element).find('.seconds');

            var target_block = parseInt($(element).attr('data-fork-height'));

            var is_done =  this.get_is_done(target_block);
            var dd_days = this.get_deadline_days(target_block);
            var dd_hours = this.get_deadline_hours(target_block);
            var dd_minutes = this.get_deadline_minutes(target_block);
            var dd_seconds = this.get_deadline_seconds(target_block);


            $days.html(dd_days);
            $hours.html(dd_hours);
            $minutes.html(dd_minutes);
            $seconds.html(dd_seconds);

            if(is_done){

                //完成分叉
                $('.clockdiv', $(element)).html('完成分叉');
                $('.fork-state', $(element)).removeClass('fork-incoming')
                    .addClass('fork-passed').html('分叉完成');
            }


        },
        get_deadline: function(index, el) {
            this.deadline[index] = (el.dataset.forkHeight - this.current_block_height) * 600;
        },
        draw_clocks: function (current_block_height) {
            this.current_block_height = current_block_height;
            this.draw_current_block(current_block_height);
            this.deadline = [];
            $('.fork-item').each(this.get_deadline.bind(this));
            setInterval(this.draw_count_down.bind(this), 1000);

        },
        get_current_block: function () {
            return $.when(
                $.ajax({'url': 'https://blockchain.info/q/getblockcount'})
            );
        },
        get_block_fail: function () {
            console.log('fail getting block height');
        },
        hide_text: function(){
            //desc 文本溢出隐藏
            $('.desc').each(function(){
                var height = 36;  //3倍字体
                while($(this).height() > height) {
                    $(this).text($(this).text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
                }
                $(this).height(height);
            });
        },
        init: function () {

            var _container = $('#fork-list-page');
            if (!_container.length){
                return ;
            }

            this.hide_text();

            this.get_current_block().then(
                this.draw_clocks.bind(this),
                this.get_block_fail.bind(this)
            );
        }
    });

    return ForkListApp;
});