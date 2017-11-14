define(['jquery','libs/Class', 'libs/csrf'], function($, Class, CSRF){

    var GetSiteData = Class.extend({
        init: function(){
            $('#id_web_site').on('blur', function(){
                var url = location.protocol + '//' + location.host + '/tools/site/?url=' + $(this).val();
                $.getJSON(url, function(data){
                    $('#id_cname').val(data.title);
                    $('#id_description').val(data.description);
                });
            });
        }
    });
    return GetSiteData;
});