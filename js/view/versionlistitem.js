define([
    "underscore",
    "marionette",
    "app",
    "text!templates/versionlistitem.tmpl",
    "utils/dates"
], function(_, Marionette, app, template, dates) {

    var VersionListItemView = Marionette.ItemView.extend({
        "tagName": "tr",
        "template": _.template(template, null, {"variable": "data"}),
        "templateHelpers": {
            "helpers": {
                "dates": dates
            }
        },
        "events": {
            "click": "onSelect"
        },
        "initialize": function() {
            this.listenTo(this.model, "version:select", this.select);
            this.listenTo(this.model, "version:unselect", this.unselect);
        }
    });

    VersionListItemView.prototype.onSelect = function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.select();
    };

    VersionListItemView.prototype.select = function() {
        this.$el.addClass("selected");
        this.model.trigger("version:selected", this.model);
    };

    VersionListItemView.prototype.unselect = function() {
        this.$el.removeClass("selected");
    };

    return VersionListItemView;
});