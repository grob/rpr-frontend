define([
    "underscore",
    "backbone",
    "app",
    "collection/versions"
], function(_, Backbone, app, Versions) {

    var Package = Backbone.Model.extend({
        "url": function() {
            return app.api.getUrl("packages", this.get("name"));
        }
    });

    Package.prototype.parse = function(data) {
        this.versions = new Versions(data.versions, {"parse": true});
        delete data.versions;
        // convert dates
        data.modified = new Date(data.modified);
        return data;
    };

    Package.prototype.getRepositoryUrl = function(type) {
        return _.find(this.get("repositories"), function(repo) {
            return !type || (repo.type === type);
        }) || null;
    };

    return Package;

});