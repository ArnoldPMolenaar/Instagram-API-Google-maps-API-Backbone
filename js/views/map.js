/**
 * google maps view
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var MapView = Backbone.View.extend({
        id: 'google-map-canvas',
        //initialize google maps with the model
        initialize: function(){
            //set the map object into the model
            this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
        },
        //render google maps bij replacing the id with the element
        render: function(){
            $('#' + this.id).replaceWith(this.el);
            return this;
        }
    });

    return MapView;
})