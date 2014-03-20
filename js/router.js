/**
 * Router/controller
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/photos'
], function($, _, Backbone, PhotoView){
    var AppRouter = Backbone.Router.extend({
        //setup routes
        routes:{
            //view URl
            'google/': 'loadGoogleMaps',

            //default route
            '*actions': 'DefaultActions'
        }
    });

    //initialize when DOM is loaded
    var initialize = function(){
        //default jQuery settings
        $('#instTarget').hide();

        //create router
        var app_router = new AppRouter();

        app_router.on('loadGoogleMaps', function(){
            //load google maps and markers
            var photo_view = new PhotoView();
        });

        app_router.on('DefaultActions', function(actions){
            console.log('No Routes', actions);
        });

        //setup a backbone history for al objects
        Backbone.history.start();

        //trigger global functions
        app_router.trigger('loadGoogleMaps');
    };

    return{
        initialize: initialize
    };
});