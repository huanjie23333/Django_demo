define(['libs/Class', 'underscore', 'jquery'], function(Class, _, $){
    var BtcCountdown = Class.extend({
        init: function(){
            var fork_list =[
                 {
                    'name': '比特幣白金',
                    'ename': 'Bitcoin Platinum',
                    'height':498533
                },
               {
                    'name': '超级比特幣',
                    'ename': 'Bitcoin Platinum',
                    'height':498888
                },
                {
                    'name': '比特幣王者',
                    'ename': 'BTC King ',
                    'height':499999
                },
                {
                    'name': '比特幣上帝',
                    'ename': 'Bitcoin God ',
                    'height': 501225
                }
            ];

            var compiled = _.template($('#btc-countdown-tpl').html());
            var html = compiled({list:fork_list});
            $('#btc-countdown').html(html);


            var interval = 600;
            getBlockHeight(initClock);

            function getBlockHeight(callback){
                $.ajax({
                    url: 'https://blockchain.info/q/getblockcount',
                    success: callback
                });
            }
            function initClock(result){
                var current_block = parseInt(result);
                var deadline = [];
                for(var i = 0; i < fork_list.length; i++){
                    var targetblock = fork_list[i]['height'];
                    deadline.push(new Date(Date.parse(new Date())
                        + getSecondsRemaining(current_block, targetblock, interval)));
                }
                if($('.clockdiv').length) {
                    renderClock('clockdiv', deadline, current_block);
                }
                if($('.top_clockdiv').length) {
                    renderClock('top_clockdiv', deadline, current_block);
                    $('.top_clockdiv .target_block_count').html(fork_list[0].height);

                }

            }
            function getSecondsRemaining(blockheight, targetblock, interval) {
                var blocksremaining = targetblock - blockheight;
                var secondsremaining = blocksremaining * interval * 1000;
                return secondsremaining;
            }
            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }
            function renderClock(classname, endtime, blockheight) {
                // display block height;

                $('.current_block_count').each(function(index,ele){
                    $(ele).html(blockheight);
                });

                function do_update(){
                    var clocks = document.getElementsByClassName(classname);
                    for (var i=0, len=clocks.length ; i<len; i++) {
                        updateClock(clocks[i], endtime, i);
                    }
                }


                function updateClock(clock, endtime, i) {

                    var daysSpan = clock.querySelector('.days');
                    var hoursSpan = clock.querySelector('.hours');
                    var minutesSpan = clock.querySelector('.minutes');
                    var secondsSpan = clock.querySelector('.seconds');

                    var t = getTimeRemaining(endtime[i]);
                    if(t.total <= 0) {
                        clock.innerHTML = fork_list[i].name + '已成功分叉！';
                    } else {
                        daysSpan.innerHTML = t.days;
                        hoursSpan.innerHTML = ('' + t.hours).slice(-2);
                        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                    }

                }

                do_update();
                var timeinterval = setInterval(do_update, 1000);
            }
        }
    });

    return BtcCountdown;
});