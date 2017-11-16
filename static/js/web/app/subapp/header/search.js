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
                            // response(data['results']);
                                $.ajax('http://www.chainscoop.com/api/news/autocomplete/', {
                                    jsonp: true,
                                    success: function(data2){
                                        var results = data.results.concat(data2.results);
                                        response(results);
                                    },
                                    method: 'GET',
                                    data: {q: term}
                                });
                        })
                    }
                });
                console.log('search');

            },
        });

        return Search;

    });