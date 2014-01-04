define([
    "backbone",
    "app",
    "model/package"
], function(Backbone, app, Package) {

    var Packages = Backbone.Collection.extend({
        "model": Package,
        "url": app.api.getUrl("search"),
        "initialize": function() {
            this.total = 0;
            this.offset = 0;
            this.listenTo(this, "request", function() {
                app.trigger("packages:loading");
            });
            this.listenTo(this, "sync", function() {
                app.trigger("packages:loaded");
            });
        }
    });

    Packages.prototype.hasMore = function() {
        return this.total > this.length;
    };

    Packages.prototype.reset = function(models, options) {
        this.offset = 0;
        return Backbone.Collection.prototype.reset.apply(this, arguments);
    };

    Packages.prototype.parse = function(response) {
        this.total = response.total;
        this.offset = response.offset;
        this.perPage = response.length;
        return _.map(response.hits, function(pkgData) {
            return Package.prototype.parse.call(null, pkgData);
        });
    };

    return Packages;
});