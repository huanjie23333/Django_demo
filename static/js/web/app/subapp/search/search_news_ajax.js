define(['libs/Class', 'jquery', 'underscore'], function(Class, $, _){
    var SearchNewsAjax = Class.extend({
        init: function(){

            var $ajaxContent = $('#ajax-news-content');
            if(!!!$ajaxContent.length) return;

            this.searchVal = decodeURI(location.href.replace(/^http:\/\/.*?q=/, ''));
            $('#ajax-news-content .box-header').html(
                     '含「<span class="query-word">'
                     + this.searchVal
                     + '</span>」的搜索结果约 '
                     + ' 条'
            );
            $('#ajax-news-content .box-footer button').click(function(){
                 var ajaxURL = this.nextURL;
                 if(!ajaxURL) return false;
                 var $that = $(this);
                 $that.html('加载中...');
                 $.ajax({
                     method: 'GET',
                     url: ajaxURL,
                     jsonp: true,
                     success: function(data){
                         this.ajaxCallback(data);
                         $that.html('加载更多');
                     }
                 });
            });
            $.ajax({
                 method: 'GET',
                 url: 'http://www.chainscoop.com/api/news/search.json?q=' + this.searchVal,
                 data: {},
                 jsonp: 'true',
                 success: this.ajaxCallback
            });

        },
        nextURL: '',
        searchVal: '',
        ajaxCallback: function(data){
            var html = $('#search_news_template').html().replace(new RegExp('(' + this.searchVal + ')', 'gi'), '<span class="search-light">$1</span>');
            var compiled = _.template(html);
            $('#ajax-news-content .box-body').html(compiled(data));
            $('#ajax-news-content .box-header').html(
                 '含「<span class="query-word">'
                 + this.searchVal
                 + '</span>」的搜索结果约 '
                 + data.count + ' 条'
            );
            if(data.next){
                 $('#ajax-news-content .box-footer').css('display', 'block');
                 this.nextURL = data.next;
            }
        }
    });
    return SearchNewsAjax;
});

//todo: bug*2 加载更多样式