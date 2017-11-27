define(['libs/Class', 'jquery'], function(Class, $){
    var SearchNews = Class.extend({
        init: function(){

            $('#search-news-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                if(q === ''){
                    if(location.pathname === '/'){
                        return false;
                    } else {
                        location.href = '/';
                        return false;
                    }
                }
                window.location.href = '/search/news/?q=' + q;
                return false;
            });

        }
    });
    return SearchNews;
});

