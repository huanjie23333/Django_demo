define(['jquery','libs/Class'],function ($, Class) {
   var Captcha = Class.extend({
       init: function(){
           var toggleImg = function(){
               $('img.c-image').remove();
               var rd = Math.random();
               $('a.c-refresh').before(
                   $('<img class="c-image image_VhirG6" src="/captcha/?rd='+ rd +'">')
               );
               $('img.c-image').css({
                   height: '40px',
                   width: '150px'
               });
               $('img.c-image').click(toggleImg);
               return false;
           };
           $('img.c-image').click(toggleImg)
               .wrap('<div></div>')
               .after('<a href="javascript:;" class="c-refresh">看不清，换一张</a>');
           $('.c-refresh').click(toggleImg);
       }
   });
   return Captcha;
});