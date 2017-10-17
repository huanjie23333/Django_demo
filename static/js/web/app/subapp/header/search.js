define(['libs/Class','jquery', 'underscore', 'auto_complete'],
    function(Class, $, _, auto_complete){
       var Search = Class.extend({
           init: function(){
               console.log('search');

           },
       });

       return Search;

});