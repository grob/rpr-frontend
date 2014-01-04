define([
    "marionette",
    "api"
], function(Marionette, Api) {

    var getRelativeBaseUrl = function(href) {
        var anchor = document.createElement("a");
        anchor.href = href;
        return anchor.pathname.replace(/\/+$/, "");
    };

    var App = Marionette.Application.extend({
        "api": new Api($("[data-api]").data("api")),
        // the base Url of the application
        "baseUrl": getRelativeBaseUrl($("base").attr("href"))
    });

    App.prototype.getUrl = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this.baseUrl);
        return args.join("/");
    };

    return new App();
});
