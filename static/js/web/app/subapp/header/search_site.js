define(['libs/Class', 'jquery'], function(Class, $){
    var SearchSite = Class.extend({
        init: function(){

            $('#search-site-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                if(q === ''){
                    if(location.pathname === '/'){
                        return false;
                    } else {
                        location.href = '/';
                        return false;
                    }
                }
            });

        }
    });
    return SearchSite;
});