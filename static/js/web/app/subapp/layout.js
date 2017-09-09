define(['libs/Class','libs/salvattore'],
    function(Class,$){
        var Layout = Class.extend({
            init: function(){

                //$grid = $('.grid').imagesLoaded().progress( function() {
                //    $grid.masonry({
                //        itemSelector:'grid-item',
                //        columnWidth: '.grid-item',
                //        isAnimated: false,
                //        saveOptions: true,
                //        transitionDuration: 0,
                //        //Selector: '.grid-item'
                //    });
                //});

                //$('.grid').masonry({
                //        itemSelector:'grid-item',
                //        columnWidth: '.grid-item',
                //        isAnimated: false,
                //        saveOptions: true,
                //        transitionDuration: 0,
                //        //Selector: '.grid-item'
                //    });

                //$('.grid').masonry({
                //      // set itemSelector so .grid-sizer is not used in layout
                //      itemSelector: '.grid-item',
                //      // use element for option
                //      columnWidth: '.grid-item',
                //    });
                console.log('layout done');
            }

        });
        return Layout;
});