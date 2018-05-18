define(['libs/Class', 'jquery', 'underscore', 'libs/showdown'], function(Class, $, _, showdown){
    var eosDetail = Class.extend({
        init: function(){
            if(!$('.eos-detail').length) return;
            var slug = location.href.match(/\/(\d+)\.htm/)[1];
            var that = this;
            $.when($.ajax('https://www.chainnews.com/api/eos/'+slug)).then(function(data){
                var convertter = new showdown.Converter();
                data.desc = convertter.makeHtml(data.desc);
                var compile = _.template($('#eos-detail-template').html());
                var html = compile({item: data});
                $('.eos-detail').html(html);
                $('.loading-box').addClass('hidden-box');
                that.generateMap($('a.location').text());
            });
        },
        generateMap: function(location){
            var google = window.google;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': location}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var myOptions = {
                        zoom: 6,
                        center: results[0].geometry.location,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map-container"), myOptions);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title:location
                    });
                }
            });
        }
    });
    return eosDetail;
});