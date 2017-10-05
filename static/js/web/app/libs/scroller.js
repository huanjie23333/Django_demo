define(['fastdom', 'jquery', 'libs/Class'], function (fastdom, $, Class) {

    var Scroller = Class.extend({
        init: function () {
            this.setupScrollMenu();
        },

        setupScrollMenu: function () {
            $(window).scroll(this.schedulePriceMove.bind(this));
        },

        schedulePriceMove: function () {
            if (!this.read) {
                this.read = fastdom.read(this._read.bind(this));
            }
            if (this.write) {
                fastdom.clear(this.write);
            }
            this.write = fastdom.write(this._do_write.bind(this));
        },

        _read: function () {

        },

        _do_write: function(){
            this._write();
            this.write = null ;
            this.read = null ;
        },
        _write: function () {

        }
    });

    return Scroller;

});