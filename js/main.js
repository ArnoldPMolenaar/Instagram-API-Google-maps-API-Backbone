//load default libarys
require.config({
   paths: {
       jquery: 'libs/jquery',
       underscore: 'libs/underscore',
       backbone: 'libs/backbone'
   }
});

require([
    //load the app module to difine the functions
    'app',
], function(App){
    //'app' dependency is passes in as 'App'
    App.initialize();
});

define([
    //configure the library's in my bootstrap
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    //pass in jQuery, underscore and backbone
    return {};
});