define(['libs/scroller', 'jquery', 'underscore', 'libs/jquery.sticky-sidebar'], function (Scroller, $, _, stickySidebar) {

  var ScrollBoxApp = Scroller.extend({
    get_target_height: function () {
      if (!this.target_height) {
        this.target_height = this.get_target().getBoundingClientRect().height;
      }
    }, hide_target: function () {
      $(this.get_target()).addClass('hidden');
    },
    init: function () {
      if (!this.get_target()) {
        return;
      }
      this._super();
      this.origin_width = this.get_box().getBoundingClientRect().width;
      this.get_target_height();
      $(this.get_target()).css({
        width: this.origin_width + 'px',
      });
      this.hide_target();

      this.stickySidebarInitStatus = false
    },
    get_footer: function () {
      return document.getElementById('footer');
    },
    get_box: function () {
      return document.getElementById('side_bar_bottom');
    },

    get_target: function () {
      return document.getElementById('scroll_target');
    },

    get_touch_bottom: function () {
      var footer = this.get_footer().getBoundingClientRect();
      var target = this.get_target().getBoundingClientRect();
      return footer.top <= target.top + target.height + 10;
    },
    _read: function () {
      var box = this.get_box();
      var rect = box.getBoundingClientRect();
      this.top_distance = this.get_footer().getBoundingClientRect().top;
      this.top = rect.top + rect.height;
      this.touch_bottom = this.get_touch_bottom();
    },

    _write: function () {

      if (this.top < 0 && this.top_distance > (this.target_height + 50)) {
        $('#sidebar_default').addClass('sidebar_default_sticky_hook')
        $(this.get_target()).removeClass('hidden').addClass('static-box');
        if(this.stickySidebarInitStatus === false){
          $('#sidebar_sticky_area').stickySidebar({
            containerSelector: '#content',
            innerWrapperSelector: '#scroll_target',
            topSpacing: 60,
            bottomSpacing: 20
          })
          this.stickySidebarInitStatus === true
        }
      } else {
        $(this.get_target()).removeClass('static-box');
      }
    },
  });
  return ScrollBoxApp;
});