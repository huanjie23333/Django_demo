define(['libs/Class', 'libs/rasterizehtml', 'jquery'], function(Class, rasterizeHTML, $){
    var ShareImg = Class.extend({
        init: function(){
            if(!$('.shareimg').length) return ;

            $('.newsline').on('click', '.shareimg', function(event){
                var tar = $(event.currentTarget).parents('.entry');
                var html = tar.html().replace(/style="display:none"/g, '');
                html += $('#rasterize-style').html();

                tar.find('i.shareimg-loading').css('display', 'inline-block');
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
    });
    return ShareImg;
});