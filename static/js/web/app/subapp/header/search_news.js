define(['libs/Class', 'jquery'], function(Class, $){
    var SearchNews = Class.extend({
        init: function(){

            $('#search-news-btn').click(function(){
                var q = $('input[name="q"]').val().trim();
                window.location.href = '/search/news/?q=' + q;
                return false;
                var searchVal = $('.main-search-container .nav-search').val().trim();
                // $.ajax({
                //     method: 'GET',
                //     url: 'http://www.chainscoop.com/api/news/search.json?q=' + searchVal,
                //     data: {},
                //     jsonp: 'true',
                //     success: function(data){
                //         var temp = '';
                //         for(var i = 0; i < data.count; i++){
                //             temp += '<div class="body"><h1 class="news-title">'
                //                 + data.results[i].title
                //                 + '</h1><ul><li class="news-content">'
                //                 + data.results[i].content;
                //             if(data.results[i].origin_link){
                //                 temp += '<a href="'
                //                     + data.results[i].origin_link
                //                     + '" rel="nofollow" target="_blank">「原文链接」</a>'
                //             }
                //             temp += '</li><li class="news-info"><span>'
                //                 + data.results[i].pub_time
                //                 + '</span><span class="tag-list-wrapper"><ul class="tag-list">'
                //                 + '<li class="tag-list-head"><i class="fa fa-tag"></i></li>';
                //             for(var j = 0; j < data.results[i].tag_list.length; j++){
                //                 temp += '<li class="tag-item"><a href="/news/tag/'
                //                     + data.results[i].tag_list[j]
                //                     + '/" target="_blank">'
                //                     + data.results[i].tag_list[j]
                //                     + '</a></li>';
                //             }
                //             temp += '</ul></span></li></ul></div>';
                //         }
                //         $('#side_column').prev().replaceWith(temp);
                //     }
                // });
            });
        }
    });
    return SearchNews;
});

