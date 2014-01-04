define([
    "underscore",
    "marionette",
    "app",
    "text!templates/package.tmpl",
    "view/versionlist",
    "view/version"
], function(_, Marionette, app, template, VersionListView, VersionView) {

    var PackageView = Marionette.Layout.extend({
        "template": _.template(template, null, {"variable": "data"}),
        "regions": {
            "versionsRegion": "#versions",
            "versionRegion": "#version"
        },
        "initialize": function(opts) {
            this.listenTo(this.model.versions, "version:selected", this.showVersionDetail);
        }
    });

    PackageView.prototype.onRender = function() {
        this.versionsRegion.show(new VersionListView({
            "collection": this.model.versions
        }));
    };

    PackageView.prototype.showVersionDetail = function(model) {
        this.versionRegion.show(new VersionView({
            "model": model
        }));
    };

    return PackageView;
});