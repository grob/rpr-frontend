define([
    "underscore",
    "marionette",
    "app",
    "view/packagelistitem",
    "text!templates/packagelist.tmpl"
], function(_, Marionette, app, PackageListItemView, template) {


    var PackageListView = Marionette.CompositeView.extend({
        "className": "packages",
        "template": _.template(template, null, {"variable": "data"}),
        "itemViewContainer": "#packages",
        "itemView": PackageListItemView,
        "ui": {
            "loadMore": "#load-more"
        },
        "events": {
            "click #load-more": "loadMore"
        },
        "serializeData": function() {
            return {
                "type": this.type,
                "field": this.field,
                "query": this.query
            }
        },
        "initialize": function(opts) {
            this.type = opts.type;
            this.field = opts.field;
            this.query = opts.query;
            this.listenTo(app, "search browse", this.onSearch);
            this.listenTo(this.collection, "sync", this.onCollectionLoaded);
        }
    });

    PackageListView.prototype.getUrlParameters = function() {
        return {
            "q": this.query,
            "l": this.collection.perPage
        };
    };

    PackageListView.prototype.onSearch = function(query) {
        this.query = query;
        this.collection.fetch({
            "data": this.getUrlParameters()
        });
    };

    PackageListView.prototype.loadMore = function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.collection.fetch({
            "update": true,
            "remove": false,
            "merge": false,
            "data": _.extend(this.getUrlParameters(), {
                "o": this.collection.length
            })
        });
    };

    PackageListView.prototype.onCollectionLoaded = function() {
        this.ui.loadMore.toggleClass("visible", this.collection.hasMore());
    };

    return PackageListView;
});