define(['libs/Class', 'libs/rasterizehtml', 'jquery', 'underscore'], function(Class, rasterizeHTML, $, _){
    var ShareImg = Class.extend({
        init: function(){
            if($('.shareimg').length){
                $('.newsline').on('click', '.shareimg', function(event){
                    var tar = $(event.currentTarget).parents('.entry');
                    var html = tar.html().replace(/style="display:none"/g, '');
                    html += $('#rasterize-style').html();

                    tar.find('i.shareimg-loading').css('display', 'inline-block');
                    rasterizeHTML.drawHTML(html).then(function(data){
                        svgString2Image(data.image, 'png', downloadPng);

                        function downloadPng(dataURL){
                            var title = $('.news-title', tar).html().trim();
                            $('<a class="download-img"></a>').attr('href', dataURL).attr('download', title)
                                .appendTo('.news-info', tar);
                            var download = document.querySelector('.download-img');
                            download.click();
                            $(download).remove();
                            tar.find('i.shareimg-loading').css('display', 'none');
                        }
                    });
                });

            }
            if($('.daily-quote').length){
                var tpl = $('#daily-quote-template').text();
                var compiled = _.template(tpl);
                $('.render-img').on('click', function(e){
                    var data = getTime();
                    data.author = $(e.target).parent().parent().find('.person').text();
                    data.desc = $(e.target).parent().parent().find('.quote').text();
                    rasterizeHTML.drawHTML(compiled({data:data})).then(function(res){
                        svgString2Image(res.image, 'png', downloadPng);

                        function downloadPng(dataURL){
                            var title = data.desc;
                            $('<a class="download-img"></a>').attr('href', dataURL).attr('download', title)
                                .appendTo('body');
                            var download = document.querySelector('.download-img');
                            download.click();
                            $(download).remove();
                        }
                    });
                });
                function getTime(){
                    var days = ['日', '一', '二', '三', '四', '五', '六'];
                    var endays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                    var d = new Date();
                    var month = d.getMonth() + 1;
                    var zhday = days[d.getDay()];
                    var enday = endays[d.getDay()];
                    var counts = getCounts(d);
                    var lunarDate = getLunar(d);
                    console.log(lunarDate);
                    return {
                        year: d.getFullYear(),
                        month: month,
                        enday: enday,
                        date: ('0' + d.getDate()).slice(-2),
                        zhday: zhday,
                        zhdate: lunarDate,
                        a: counts[0],
                        b: counts[1],
                        c: counts[2]
                    };

                    function getCounts(d){
                        var firstDayTime = new Date(d.getFullYear(), 0, 1).getTime();
                        var hours = (d.getTime() - firstDayTime) / 1000 / 60 / 60;
                        return ('00' + Math.ceil(hours / 24)).slice(-3);
                    }

                    function getLunar(d){
                        var month = ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
                        var zhDate = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
                        var l = lunar.toLunar(d);
                        var s;
                        switch(true){
                            case l.lunarDay < 11:
                                s = zhDate[l.lunarDay];
                                break;
                            case l.lunarDay < 21:
                                s = '十' + zhDate[l.lunarDay % 10];
                                break;
                            case l.lunarDay < 30:
                                s = '廿' + zhDate[l.lunarDay % 20];
                                break;
                            default:
                                s = '三十';
                                break;
                        }
                        s = ('初' + s).slice(-2);
                        var m;
                        if(l.isLeap){
                            m = '润' + month[l.lunarMonth] + '月';
                        } else {
                            m = month[l.lunarMonth] + '月';
                        }
                        return m + s;
                    }
                }
            }
            function svgString2Image(svgData, format, callback) {
                format = format ? format : 'png';
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = svgData.width;
                canvas.height = svgData.height;
                var image = new Image();
                image.onload = function () {
                    context.clearRect(0, 0, svgData.width, svgData.height);
                    context.drawImage(image, 0, 0, svgData.width, svgData.height);
                    var pngData = canvas.toDataURL('image/' + format, 0.8);
                    callback(pngData);
                };
                image.src = svgData.src;
            }
        }
    });
    return ShareImg;
});