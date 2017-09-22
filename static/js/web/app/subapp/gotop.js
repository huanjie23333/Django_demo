define(['jquery', 'libs/underscore', 'libs/Class', 'libs/fastdom'],
    function ($, _, Class, fastdom) {

        var GoTop = Class.extend({
            init: function () {
                this.topLinkWrapper = $('.gotop-wrapper');

                if (this.topLinkWrapper.length) {
                    this.setupWatcher();
                    this.topLinkWrapper.on('click', this.do_top.bind(this));
                } else {
                    return;
                }
            },

            do_top: function () {
                $("html, body").animate(
                    {scrollTop: 0}, 500
                );
                return false;
            },
            setupWatcher: function () {
                $(window).scroll(this.onScroll.bind(this));
            },
            onScroll: function () {
                if (this.read) {
                    fastdom.clear(this.read);
                }
                this.read = fastdom.read(this.doRead.bind(this));
                if (this.write) {
                    fastdom.clear(this.write);
                }
                this.write = fastdom.write(this.doWrite.bind(this));
            },
            doRead: function () {
                this.scrollTop = $(window).scrollTop();
                if (this.topLinkWrapper.length) {
                    this.btnRect = this.topLinkWrapper[0].getBoundingClientRect();
                }
                this.content_rect = $('#content .container')[0].getBoundingClientRect()
                this.footerRect = $('#footer')[0].getBoundingClientRect();
            },
            doWrite: function () {
                var that = this;
                if (!this.scrollTop) {
                    return;
                }
                if (this.scrollTop > 400) {
                    fastdom.write(this.show_top_link.bind(this));

                } else {
                    fastdom.write(this.hide_top_link.bind(this));
                }
            },
            show_top_link:function(){
                var item_left = this.content_rect.left + this.content_rect.width - 50;
                this.topLinkWrapper.css({left:item_left}).show();
            },

            hide_top_link:function(){
                 this.topLinkWrapper.hide();
            }

        });

        return GoTop;
    });