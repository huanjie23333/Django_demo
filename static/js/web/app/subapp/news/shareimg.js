define(['libs/Class', 'libs/rasterizehtml', 'jquery'], function(Class, rasterizeHTML, $){
    var ShareImg = Class.extend({
        init: function(){
            if(!$('#shareimg').length) return ;
            $('#shareimg').click(function(){
                var html = $('.shareimg-wrapper').html().replace(/style="display:none"/g, '');
                html += $('#rasterize-style').html();
                $('.shareimg-loading').css('display', 'inline-block');
                rasterizeHTML.drawHTML(html).then(function(data){

                    svgString2Image(data.image, 'png', downloadPng);

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
                            var pngData = canvas.toDataURL('image/' + format, 0.6);
                            callback(pngData);
                        };
                        image.src = svgData.src;
                    }

                    function downloadPng(dataURL){
                        var title = $('.news-title').html();
                        $('<a class="download-img"></a>').attr('href', dataURL).attr('download', title)
                            .appendTo('.news-share');
                        var download = document.querySelector('.download-img');
                        download.click();
                        $(download).remove();
                        $('.shareimg-loading').css('display', 'none');
                    }

                });
            });
        }
    });
    return ShareImg;
});