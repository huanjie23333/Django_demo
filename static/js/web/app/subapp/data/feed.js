define(['libs/Class', 'libs/event', 'jquery'],function(Class, Event , $){

    var Feed = Class.extend(Event.prototype, {
        init: function (options) {
            this.options = options;
            this.interval = options.interval || 5000
            this._running = false;
        },

        stop: function(){
            window.clearInterval(this._rid);
        },

        run: function(){
            if(this._running) return ;
            this._running = true;
            this._run();
            this._rid = window.setInterval(this._run.bind(this), this.interval)
        },

        _run: function(){
            $.when($.ajax(this.options)).then(
                this.request_success.bind(this),
                this.request_fail.bind(this)
            )
        },

        request_success:function(data){
            this.emit('data_arrive', data);
        },
        request_fail:function(){
            this.emit('request_fail', data);
        },

    });

    return Feed;

});