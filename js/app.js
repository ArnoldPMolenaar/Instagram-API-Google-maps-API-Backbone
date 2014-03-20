define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){
    var initialize = function(){
        //pass in the router module and call his initialize
        Router.initialize();
    }

    return{
        initialize: initialize
    };
});