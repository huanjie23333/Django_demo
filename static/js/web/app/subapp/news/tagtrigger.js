define(['jquery','libs/Class'],function ($, Class) {
   var TagTrigger = Class.extend({
       init: function(){
           $('.news-line-wrapper .tag-list-filter-list').prepend(
               '<a class="trigger-btn"><i class="fa fa-sort-down" aria-hidden="true"></i></a>'
           );
           var $btn = $('a.trigger-btn');
           var $btnIcon = $('.news-line-wrapper .tag-list-filter-list i');
           var $ul = $('.news-line-wrapper ul.tag-list-filter-list');
           $btn.on('click', function(){
               $ul.toggleClass('tag-list-filter-list-hide');
               $btnIcon.toggleClass('icon-rotate');
               // $btnIcon.toggleClass('fa-sort-down').toggleClass('fa-sort-up');
           });
       }
   });
   return TagTrigger;
});