define(['jquery','libs/Class'],function ($, Class) {
   var TagTrigger = Class.extend({
       init: function(){
           var $btn = $('.tag-list-filter-list a');
           var $btnIcon = $('.tag-list-filter-list i');
           var $ul = $('ul.tag-list-filter-list');
           $btn.on('click', function(){
               $ul.toggleClass('tag-list-filter-list-hide');
               $btnIcon.toggleClass('icon-rotate');
               // $btnIcon.toggleClass('fa-sort-down').toggleClass('fa-sort-up');
           });
       }
   });
   return TagTrigger;
});