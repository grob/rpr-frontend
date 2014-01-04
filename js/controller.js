define([
    "marionette",
    "app",
    "collection/packages",
    "model/package",
    "view/packagelist",
    "view/package"
], function(Marionette, app, Packages, Package, PackageListView, PackageView) {

    var Controller = Marionette.Controller.extend({});

    Controller.prototype.index = function() {
        this.search(null);
    };

    Controller.prototype.browse = function(field, query) {
        if (field !== "keyword" && field !== "author") {
            return this.search(query);
        }
        var pageTitle;
        if (typeof(query) !== "string" || (query = query.trim()).length < 1) {
            query = null;
        } else {
            pageTitle = "Browse by " + field + ": '" + query + "'";
        }
        app.appRouter.setPageTitle(pageTitle);
        app.contentRegion.show(new PackageListView({
            "collection": new Packages(),
            "type": "browse",
            "field": field,
            "query": query
        }));
        app.trigger("browse", field + ':"' + query + '"');
    };

    Controller.prototype.search = function(query) {
        var pageTitle;
        if (typeof(query) !== "string" || (query = query.trim()).length < 1) {
            query = null;
        } else {
            pageTitle = "Results for '" + query + "'";
        }
        app.appRouter.setPageTitle(pageTitle);
        app.contentRegion.show(new PackageListView({
            "collection": new Packages(),
            "type": "search",
            "query": query
        }));
        app.trigger("search", query);
    };

    Controller.prototype.detail = function(name, release) {
        var package = new Package({
            "name": name
        });
        package.fetch().done(function(model) {
            var packageView = new PackageView({
                "model": package,
                "selectVersion": release || null
            });
            app.contentRegion.show(packageView);
            var version = package.versions.at(0);
            if (release != null) {
                version = package.versions.find(function(version) {
                    return version.get("version") === release;
                }) || version;
            }
            version.trigger("version:select");
        });
        app.appRouter.setPageTitle("Package '" + name + "'");
    };

    return Controller;
});