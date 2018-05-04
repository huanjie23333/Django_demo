define(['libs/Class', 'jquery', 'underscore'], function(Class, $, _){
    var SearchNewsAjax = Class.extend({
        init: function(){

            var $ajaxContent = $('#ajax-news-content');
            if(!!!$ajaxContent.length) return;

            var searchVal = '',
                tpl = '',
                nextURL = '';

            var compiled = _.template($('#search_news_template').html());

            var ajaxCallback = function(data){
                if(data.count == 0) {
                    recommendNews();
                } else {
                    renderTemplate(data);
                }
            };

            var recommendNews = function(){
                console.log('recommendation');
                $.getJSON('https://www.chainnews.com/api/news/recommendation?t=' + searchVal, renderTemplate);
            };

            var renderTemplate = function (data) {
                tpl += compiled(data);
                $('#ajax-news-content .box-body').html(tpl);
                $('#ajax-news-content .box-header').html(
                     '含「<span class="query-word">'
                     + searchVal
                     + '</span>」的搜索结果约 '
                     + data.count + ' 条'
                );
                if(data.next){
                     $('#ajax-news-content .box-footer').css('display', 'block');
                     nextURL = data.next;
                }
            };

            searchVal = decodeURI(location.href.replace(/^https?:\/\/.*?q=/, ''));
            $('#ajax-news-content .box-header').html(
                     '含「<span class="query-word">'
                     + searchVal
                     + '</span>」的搜索结果约 '
                     + ' 条'
            );
            $('input[name="q"]').attr('value', searchVal);
            $('#ajax-news-content .box-footer button').click(function(){
                 var ajaxURL = nextURL;
                 if(!ajaxURL) return false;
                 var $that = $(this);
                 $that.html('<i class="fa fa-spinner" aria-hidden="true"></i>');
                 $.ajax({
                     method: 'GET',
                     url: ajaxURL,
                     jsonp: true,
                     success: function(data){
                         ajaxCallback(data);
                         $that.html('加载更多').trigger('blur');
                     }
                 });
            });
            $.ajax({
                 method: 'GET',
                 url: 'https://api.chainnews.com/api/news/search.json?q=' + searchVal,
                 data: {},
                 jsonp: 'true',
                 success: ajaxCallback.bind(this)
            });

        }
    });
    return SearchNewsAjax;
});

