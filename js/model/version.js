define([
    "backbone"
], function(Backbone) {

    var Version = Backbone.Model.extend();

    Version.prototype.parse = function(data) {
        // convert dates
        data.modified = new Date(data.modified);
        return data;
    };

    return Version;
});