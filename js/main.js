/*
 * The configuration file for require.js holds all dependency declarations for
 * the application. This is the first file, that will be loaded by require.js
 * and it holds a reference to the main.js file, that starts the app itself.
 */
require.config({
    // circumvent cache
    "urlArgs": "tmp=" + (new Date()).getTime(),

    // Paths that contain the various different javascript files.
    "paths": {
        "lib": "./lib",
        "utils/dates": "./lib/utils/dates",
        "utils/strings": "./lib/utils/strings",
        "model": "./model",
        "collection": "./collection",
        "view": "./view",
        "text": "./lib/text",
        "templates": "../templates",

        // Library paths.
        "jquery": "./lib/jquery",
        "underscore": "./lib/lodash",
        "backbone": "./lib/backbone",
        "marionette": "./lib/backbone.marionette"
    },

    /*
     * Configure the dependencies and exports for older, traditional
     * "browser globals" scripts that do not use define() to declare the
     * dependencies and set a module value.
     */
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	"shim": {
		"backbone": {
			"deps": [
				"underscore",
                "jquery"
			],
			"exports": "Backbone"
        },
        "marionette": {
            "deps": [
                "backbone"
            ],
            "exports": "Marionette"
        }
	}
});

require([
	"app",
    "router",
    "controller",
    "utils/dates",
    "view/search"
], function(app, Router, Controller, dates, SearchView) {

    app.addRegions({
        "searchRegion": "#search",
        "contentRegion": "#content"
    });
    app.controller = new Controller();
    app.appRouter = new Router({
        "controller": app.controller
    });

    app.addInitializer(function() {
        this.searchRegion.attachView(new SearchView());
    });

    app.on("initialize:after", function() {
        Backbone.history.start({
            "pushState": true,
            "root": app.baseUrl
        });
        // hijack all links not marked as external
        $(document).on("click", "a:not([data-external])", function(event) {
            var href = $(this).attr("href");
            var protocol = this.protocol + '//';
            if (href.slice(protocol.length) !== protocol) {
                event.preventDefault();
                event.stopImmediatePropagation();
                app.appRouter.navigate(href, true);
            }
        });
    });

    app.start();
    // for easier debugging
    window.app = app;
});
