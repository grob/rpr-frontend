define([
    "underscore",
    "marionette",
    "app",
    "text!templates/version.tmpl",
    "utils/dates"
], function(_, Marionette, app, template, dates) {

    var VersionView = Marionette.ItemView.extend({
        "template": _.template(template, null, {"variable": "data"}),
        "templateHelpers": {
            "helpers": {
                "dates": dates
            }
        }
    });

    return VersionView;
});