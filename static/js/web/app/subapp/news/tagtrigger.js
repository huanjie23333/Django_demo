define(['jquery','libs/Class'],function ($, Class) {
   var TagTrigger = Class.extend({
       init: function(){
           var $btn = $('.tag-list-filter-bottom a');
           var $btnIcon = $('.tag-list-filter-bottom i');
           var $ul = $('ul.tag-list-filter-list');
           $ul.addClass('tag-list-filter-list-hide');
           $btn.on('click', function(){
               $ul.toggleClass('tag-list-filter-list-hide');
               $btnIcon.toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
           });
       }
   });
   return TagTrigger;
});