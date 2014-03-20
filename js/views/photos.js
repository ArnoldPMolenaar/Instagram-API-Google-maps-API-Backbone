define([
    'jquery',
    'underscore',
    'backbone',
    'models/map',
    'views/map',
    'collections/photos',
    'text!templates/infoWindow.html'
], function($, _, Backbone, MapModel, MapView, photoCollection, infoWindowTemplate){
    var photoView = Backbone.View.extend({
        el: $('.markerContent'),
        initialize: function(){
            //get data from instagram
            var queryUrl = 'includes/data/instagram.php';
            $.getJSON(queryUrl, this.onDataLoaded);
        },
        onDataLoaded: function(data){
            if(data.meta.code == 200){
                //create a new collection for the objects
                this.collection = new photoCollection();

                //save data into variable
                var objects = data.data;

                //check if the variable is not empty
                if(objects.length > 0){
                    //loop all photos and data
                    for(var i in objects){
                        //save object in the collection
                        this.collection.add({
                            photo: objects[i].thumbnail.url,
                            locName: objects[i].location.name,
                            username: objects[i].username,
                            likes: objects[i].likes.count,
                            latitude: objects[i].location.latitude,
                            longitude: objects[i].location.longitude
                        });
                    }

                    //create model
                    var map_model = new MapModel();
                    map_model.initMap({ coords: {latitude: 52, longitude: 5} });

                    //set the model to the view
                    var map_view = new MapView({model: map_model});

                    //render Google Maps
                    map_view.render();

                    //setup infoWindow markers
                    _.each(this.collection.models, function(data){
                        //get a template for the content
                        this.template = _.template(infoWindowTemplate, data);
                        $(this.$el).html(this.template);

                        //set the infoWindow template in the marker
                        var infoWindow = new google.maps.InfoWindow({
                            content: this.template
                        });

                        //set position and marker on the map
                        var LatLng = new google.maps.LatLng(data.attributes.latitude, data.attributes.longitude);
                        var marker = new google.maps.Marker({
                            position: LatLng,
                            map: map_model.get('map'),
                            title: data.attributes.locName
                        });

                        //add a click function to the marker to open the dialog
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.open(map_model.get('map'), marker);
                        });
                    });
                }
                else{
                    //there aren't photos in the results
                    $('#instTarget').fadeIn().append("We couldn't find the picture, check your query.");
                }
            }
            else{
                //show error no instagram connection
                $('#instTarget').fadeIn().append('Kan niet verbinden! <br> type: ' + data.meta.error_type + '<br>  code: ' + data.meta.code + '<br>  Bericht: ' + data.meta.error_message);
            }
        }
    });

    return photoView;
})