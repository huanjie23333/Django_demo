define(['libs/Class', 'jquery'],function(Class, $){
    var ForkListApp = Class.extend({
        draw_current_block: function (current_block_height) {
            console.log('current block' + current_block_height);
        },
        draw_count_down: function () {
            concole.log('draw count down');
        },
        draw_clocks: function (current_block_height) {
            this.draw_current_block(current_block_height);
            this.draw_count_down()

        },
        get_current_block: function () {
            return $.when($.ajax({'url': 'https://blockchain.info/q/getblockcount'
            }));
        },
        get_block_fail: function () {
            console.log('fail getting block height');
        },
        init: function () {

            var _container = $('#fork-list-page');
            if (!_container.length){
                return ;
            }

            this.get_current_block().then(
                this.draw_clocks.bind(this),
                this.get_block_fail.bind(this)
                );
        }
    });

    return ForkListApp;
});