//change filename from fastdom to fastdom.ant to avoid duplicate module name

requirejs.config({
    waitSeconds : 200,
    baseUrl: 'app/',
    paths: {
        libs: './libs',
        utils: './utils',
        component:'./component',
        subapp: './subapp',
        jquery: 'libs/jquery-1.11.1.min',
        bootstrap: 'libs/bootstrap.min',
        fastdom: 'libs/fastdom.ant',
        csrf:'libs/csrf',
        underscore:'libs/underscore.ant',
        cookie: 'libs/jquery.cookie',
        masonry: 'libs/masonry',
        jquery_bridget: 'libs/jquery.bridget',
        images_loaded: 'libs/imagesloaded.min',
        bootbox: 'libs/bootbox.min',
        Backbone: 'libs/backbone.min',
        snowFall: 'libs/jquery.snow',
        jqueryeasing:'libs/jqueryeasing'

    },

    shim: {
        'jqueryeasing': {
            deps:['jquery'],
            exports: 'jqueryeasing'
        },
        'snowFall':{
            deps:['jquery'],
            exports:'snowFall'
        },
        // shim won't handle script load , you still need require script in your source
        'Backbone':{
            deps:['underscore',],
            exports:'Backbone'
        },
        'bootbox':{
            deps: ['jquery', 'bootstrap']
        },
        'cookie':{
            deps:['jquery']
        },
        'csrf':{
            deps:['jquery']
        },
        'bootstrap':{
            deps:['jquery']
        },
        'jquery':{
            exports:'jQuery'
        },
        'underscore':{
            exports: '_'
        },
        'masonry':{
            deps:['jquery']
        }
    }
});

