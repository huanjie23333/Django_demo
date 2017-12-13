define(['libs/Class', 'jquery'],function(Class, $){
    var ForkListApp = Class.extend({
        draw_current_block: function (current_block_height) {
            $('.current-block-height .height-number').html(current_block_height);
        },
        draw_count_down: function() {

            var $fork_list = $('.fork-item');
            $fork_list.each(this.draw_single_fork_item.bind(this));
        },
        draw_single_fork_item: function(index, element){

            this.deadline[index]--;
            var done = this.deadline[index] < 0;
            var days = Math.floor(this.deadline[index] / (24 * 60 * 60));
            var hours = Math.floor(this.deadline[index] / (60 * 60)) % 24;
            var minutes = Math.floor(this.deadline[index] / 60) % 60;
            var seconds = this.deadline[index] % 60;

            if(!done){
                $('.days', $(element)).html(days);
                $('.hours', $(element)).html(hours);
                $('.minutes', $(element)).html(minutes);
                $('.seconds', $(element)).html(seconds);
            } else {
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