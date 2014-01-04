/*
 * The router defines routes and their corresponding methods in the controller.
 */
define([
    "marionette"
], function(Marionette) {

    var Router = Marionette.AppRouter.extend({
        "appRoutes": {
            "browse/:type/:keyword": "browse",
            "search/:query": "search",
            "packages/:name/:release": "detail",
            "packages/:name": "detail",
            // catch all
            "*actions": "index"
        }
    });

    Router.prototype.setPageTitle = function(title) {
        var parts = ["RingoJS Package Registry"];
        if (title != undefined) {
            parts.unshift(title);
        }
        document.title = parts.join(" - ");
    };

    return Router;
});