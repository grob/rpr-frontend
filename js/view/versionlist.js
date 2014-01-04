define([
    "underscore",
    "marionette",
    "app",
    "view/versionlistitem",
    "text!templates/versionlist.tmpl"
], function(_, Marionette, app, VersionListItemView, template) {

    var VersionListView = Marionette.CompositeView.extend({
        "template": _.template(template, null, {"variable": "data"}),
        "itemView": VersionListItemView,
        "itemViewContainer": "tbody",
        "initialize": function() {
            this.selected = null;
            this.listenTo(this.collection, "version:selected", this.onSelect);
        }
    });

    VersionListView.prototype.onSelect = function(version) {
        if (this.selected && this.selected.cid !== version.cid) {
            this.selected.trigger("version:unselect");
        }
        this.selected = version;
        if (this.collection.first() !== this.selected) {
            app.appRouter.navigate("/packages/" + this.selected.get("name") +
                    "/" + this.selected.get("version"));
        } else {
            app.appRouter.navigate("/packages/" + this.selected.get("name"));
        }
    };

    return VersionListView;
});