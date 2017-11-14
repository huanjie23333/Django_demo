define(['jquery','libs/Class', 'libs/csrf'], function($, Class, CSRF){

    var GetSiteData = Class.extend({
        init: function(){
            var $dom = $('#id_web_site').after('<div class="url-error">网址不合法</div>')
                .parent('div').css('position', 'relative');
            $('.url-error').hide();
            $('#id_web_site').on('blur', function(){
                var url = location.protocol + '//' + location.host + '/tools/site/?url=' + $(this).val();
                var reg = /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)_.[a-z]{2,5}(:[0-9]{1,5})?(\/._)?$/;
                if(reg.test($(this).val())){
                    $('.url-error').hide();
                    $.getJSON(url, function(data){
                        $('#id_cname').val(data.title);
                        $('#id_description').val(data.description);
                    });
                } else {
                    $('.url-error').show();
                }
            });
        }
    });
    return GetSiteData;
});