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
            var dead_line = $(element).data("dead_line") -1;
            $(element).data({"dead_line":  dead_line});

            var done = dead_line < 0;
            var days = Math.floor(dead_line / (24 * 60 * 60));
            var hours = Math.floor(dead_line / (60 * 60)) % 24;
            var minutes = Math.floor(dead_line / 60) % 60;
            var seconds = dead_line % 60;

            if(!done){
                $('.days', $(element)).html(days);
                $('.hours', $(element)).html(hours);
                $('.minutes', $(element)).html(minutes);
                $('.seconds', $(element)).html(seconds);
            } else {
                //完成分叉
                $('.clockdiv', $(element)).html('完成分叉');
                $('.fork-state', $(element)).removeClass('fork-incoming')
                    .addClass('fork-passed').html('完成分叉');
            }


        },
        get_deadline: function(index, el) {
            $(el).data({'dead_line':(el.dataset.forkHeight - this.current_block_height) * 600});
            // this.deadline[index] = (el.dataset.forkHeight - this.current_block_height) * 600;
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
                var height = 42;  //3倍字体
                while($(this).height() > height) {
                    $(this).text($(this).text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
                }
                $(this).height(height);
            });
        },
        collect_api: function () {
            
        },
        init: function () {

            var _container = $('#fork-list-page');
            if (!_container.length){
                return ;
            }
            
            this._api_list = this.collect_api();
            _.each(this._api_list, function () {
                
            })

            this.hide_text();

            this.get_current_block().then(
                this.draw_clocks.bind(this),
                this.get_block_fail.bind(this)
            );
        }
    });

    return ForkListApp;
});