//collection for all instagram data
define([
    'underscore',
    'backbone',
    'models/photos'
], function(_, Backbone, photoModel){
    var photoCollection = Backbone.Collection.extend({
        model: photoModel
    });

    return photoCollection;
})