define(['libs/Class', 'jquery', 'underscore','libs/autocomplete'],
    function (Class, $, _, AutoComplete) {
        var Search = Class.extend({
            init: function () {
                new AutoComplete({
                    selector: 'input[name="q"]',
                    source: function (term, response) {
                        try { xhr.abort(); } catch(e){}
                        $.getJSON('/search/autocomplete/', {q: term},
                            function(data){
                                $.ajax('http://www.chainscoop.com/api/news/autocomplete/', {
                                    jsonp: true,
                                    success: function(data2){
                                        var results = data.results.concat(data2.results);
                                        response(results);
                                    },
                                    method: 'GET',
                                    data: {q: term}
                                });
                            }
                        );
                    }
                });

                // 搜索框内删除输入按钮
                var $cancel = $('.input-cancel-btn');
                $cancel.click(function(){
                    $('input[name="q"]').val('');
                    $cancel.css({
                        display: 'none'
                    });
                });
                var input = document.querySelector('input[name="q"]');
                var parent = document.querySelector('.logo-wrapper');
                $('input[name="q"]').keyup(function(){
                    if(this.value == '') {
                        $cancel.css({
                            display: 'none'
                        });
                    } else {
                        var left = input.getBoundingClientRect().right - parent.getBoundingClientRect().left;
                        $cancel.css({
                            display: 'block',
                            left: left - 20,
                            top: 0
                        });
                    }
                });


            }
        });

        return Search;

    });