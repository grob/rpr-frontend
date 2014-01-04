define([
    "underscore",
    "marionette",
    "app"
], function(_, Marionette, app) {

    var SearchView = Marionette.ItemView.extend({
        "el": "#search",
        "ui": {
            "input": "input[type=search]"
        },
        "events": {
            "keyup": "handleInput"
        },

        "initialize": function() {
            // necessary to populate ui hash (this view is attached, not rendered)
            this.bindUIElements();
            this.listenTo(app, "packages:loading", this.onLoading);
            this.listenTo(app, "packages:loaded", this.onLoaded);
            this.listenTo(app, "search", this.onSearch);
            this.ui.input.focus();
            $(document).on("keydown", _.bind(this.onKeyDown, this));
            return this;
        }

    });

    SearchView.prototype.onSearch = function(query) {
        this.ui.input.val(query || "");
    };

    SearchView.prototype.onLoading = function() {
        this.ui.input.addClass("loading");
    };

    SearchView.prototype.onLoaded = function() {
        this.ui.input.removeClass("loading");
    };

    SearchView.prototype.handleInput = function(event) {
        if (event.keyCode === 13) {
            var query = this.ui.input.val();
            app.controller.search(query);
            app.appRouter.navigate("search/" + query);
        }
    };

    SearchView.prototype.onKeyDown = function(event) {
        if (event.keyCode === 27) {
            this.ui.input.blur().val("").focus();
            app.controller.search();
            app.appRouter.navigate("/");
        }
    };

    return SearchView;

});