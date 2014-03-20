/**
 * Google maps model
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var MapModel = Backbone.Model.extend({
        defaults: {
            id: '',
            LatLng: {},
            mapOptions: {},
            position: {},
            map: {},
            zoom: 10
        },
        //initialize for google maps
        initMap: function(position){
            this.set('position', position)
            var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.set('LatLng', LatLng);
            var mapOptions = {
                zoom: this.get('zoom'),
                center: this.get('LatLng')
            };
            this.set('mapOptions', mapOptions);
        }
    });

    return MapModel;
});