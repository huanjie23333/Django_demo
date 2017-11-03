define(['jquery'], function($){

    $(function() {
      $('.bookmarkme').click(function() {
        if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
          window.sidebar.addPanel(document.title, window.location.href, '');
        } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
          window.external.AddFavorite(location.href, document.title);
        } else if (window.opera && window.print) { // Opera Hotlist
          this.title = document.title;
          return true;
        } else { // webkit - safari/chrome
          alert('请按下 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 来收藏本站。');
        }
      });
    });
});