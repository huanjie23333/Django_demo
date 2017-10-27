define(['libs/Class', 'jquery', 'underscore','libs/autocomplete'],
    function (Class, $, _, AutoComplete) {
        var Search = Class.extend({
            init: function () {
                new AutoComplete({
                    selector: 'input[name="q"]',
                    source: function (term, response) {
                        try { xhr.abort(); } catch(e){}
                        $.getJSON('/search/autocomplete/', {q: term},
                            function (data) {
                            response(data['results']);
                        });
                    }

                });
                console.log('search');

            },
        });

        return Search;

    });