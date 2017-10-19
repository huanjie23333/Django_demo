define(['libs/Class', 'jquery'], function (Class, $) {

    var targetblock = 494784; // 2x fork block
    var interval = 600; // ten minute blocks




    function getBlockheight(callback) {
        var current_block = 0 ;
        $.ajax({
        url: 'https://blockchain.info/q/getblockcount',
            success: callback
        });
    }



    function getSecondsRemaining(blockheight, targetblock, interval) {
        blocksremaining = targetblock - blockheight;
        secondsremaining = blocksremaining * interval * 1000;
        return secondsremaining
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
                updateClock(clocks[i]);
            }
        }


        function updateClock(clock) {

            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        do_update();
        var timeinterval = setInterval(do_update, 1000);
    }



    function initClock(result){
        var current_block = parseInt(result);
        var deadline =   new Date(Date.parse(new Date()) + getSecondsRemaining(current_block, targetblock, interval));
        renderClock('clockdiv', deadline, current_block);

    }

    function Run() {
        getBlockheight(initClock)
        // initializeClock('clockdiv', deadline);
    }

    return Run

});

