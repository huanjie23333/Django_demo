define(['libs/Class', 'jquery', 'libs/bluebird'],function(Class, $, Promise){
    var ForkListApp = Class.extend({
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
                if($(element).attr("data-fork-height") == '0'){
                    //高度未确定
                    $('.clockdiv', $(element)).html('分叉时间未定');
                    $('.fork-state', $(element)).removeClass('fork-incoming')
                        .removeClass('fork-passed').addClass('fork-unknown').html('时间未定');
                    $('.block-height .height-number', $(element)).html('未知');
                } else {
                    //完成分叉
                    $('.clockdiv', $(element)).html('完成分叉');
                    $('.fork-state', $(element)).removeClass('fork-incoming')
                        .addClass('fork-passed').html('完成分叉');
                }
            }


        },
        get_deadline: function(index, el) {
            var current_height = $(el).data('current_block');
            var block_interval = parseFloat($(el).attr('data-block-intervel'))*60;

            $(el).data({'dead_line':(el.dataset.forkHeight - current_height) * block_intervall});
        },
        draw_clocks: function () {
            setInterval(this.draw_count_down.bind(this), 1000);
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
        get_api_list: function () {
            var _api_list = [];
            $('.fork-item').each(function (index, item) {
                _api_list.push($(item).attr('data-block-height-api'));
            });
            return _.uniq(_api_list);
        },
        init_item_current_block: function () {
            this._api_list = this.get_api_list();
            // get a clean api list;

            return Promise.all(
                _.map(this._api_list, function(api){
                    return new Promise(function (resolve, reject){
                        $.ajax({
                            url: api,
                            method: 'GET'
                        }).done(resolve).fail(reject);
                    });
                })
            );
        },
        handle_error: function(error){
            console.log(error);
        },
        set_item_current_block: function (index, item) {
                var api = $(item).attr('data-block-height-api');
                $(item).data({'current_block': this.current_blocks[api]});
                var dead_line, target_block, block_intervel, current_block;
                block_intervel = parseFloat($(item).attr('data-block-intervel')) * 60;
                target_block = parseInt($(item).attr('data-fork-height'));
                current_block = $(item).data('current_block');
                dead_line = (target_block - current_block) * block_intervel ;
                $(item).data({'dead_line': dead_line});
                $(item).find('.current-block-height .height-number').html(current_block);

                return this;
        },
        set_current_blocks: function (){
            $('.fork-item').each(this.set_item_current_block.bind(this));
            return this;
        },
        handle_api_done: function (results) {
            var _result_list = [].slice.call(arguments);
            var _result_list = _.map(_result_list, function(item){
                if(_.isObject(item)){
                    return parseInt(item['count']);
                }else{
                    return parseInt(item);
                }
            });
            return  this.current_blocks = _.object(this._api_list, _result_list);

        },
        move_undecided_forks: function () {
            var $undecided_list = $("[data-fork-height='0']");
            var $incoming_list = $("[data-fork-status='incoming']");
            if($undecided_list.length<=0 ||$incoming_list.length <=0 ){
                return
            }
            $last_incoming = $incoming_list[$incoming_list.length-1];
            $undecided_list.each(function(index, item){
                $(item).insertAfter($($last_incoming));
            });
            return ;

        },
        init: function () {

            var _container = $('.fork-item');
            if (!_container.length){
                return ;
            }
            this.hide_text();
            this.move_undecided_forks();

            this.init_item_current_block()
             .spread(this.handle_api_done.bind(this))
             .then(this.set_current_blocks.bind(this))
             .then(this.draw_count_down.bind(this))
             .then(this.draw_clocks.bind(this))
             .catch(this.handle_error.bind(this));
        }
    });

    return ForkListApp;
});