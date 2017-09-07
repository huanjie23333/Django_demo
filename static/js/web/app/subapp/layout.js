define(['libs/Class', 'masonry'],
    function(Class,mansonry){
        var Layout = Class.extend({
            init: function(){
                $('.grid').masonry({
                      // set itemSelector so .grid-sizer is not used in layout
                      itemSelector: '.grid-item',
                      // use element for option
                      columnWidth: '.grid-item',
                    });
            }

        });

        return Layout;

});