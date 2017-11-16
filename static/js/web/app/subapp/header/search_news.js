define(['libs/Class', 'jquery'], function(Class, $){
    var SearchNews = Class.extend({
        init: function(){

            $('#search-news-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                window.location.href = '/search/news/?q=' + q;
                return false;
            });
        }
    });
    return SearchNews;
});

