define([
    "underscore",
    "marionette",
    "app",
    "text!templates/packagelistitem.tmpl",
    "utils/dates"
], function(_, Marionette, app, template, dates) {

    var githubRegex = [
        /http(?:s)?:\/\/github\.com\/([\w-]+)\/([\w-]+)(\.git)?/,
        /git@github\.com:([\w-]+)\/([\w-]+)(\.git)?/,
        /git:\/\/github\.com\/([\w-]+)\/([\w-]+)(\.git)?/
    ];

    var PackageListItemView = Marionette.ItemView.extend({
        "tagName": "li",
        "className": "package",
        "template": _.template(template, null, {"variable": "data"}),
        "templateHelpers": {
            "helpers": {
                "dates": dates
            }
        },
        "ui": {
            "readMe": ".readme",
            "readMeContent": ".readme .content",
            "toggleReadMe": ".readme .button-readme"
        },
        "events": {
            "click .button-readme": "toggleReadme",
            "click": "showDetail"
        },
        "initialize": function() {
            this.isReadmeVisible = false;
            this.readMe = null;
        }
    });

    PackageListItemView.prototype.toggleReadme = function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this.isReadmeVisible === true) {
            this.ui.readMe.removeClass("expanded");
            this.ui.readMeContent.empty();
            this.ui.toggleReadMe.text(this.ui.toggleReadMe.data("text"));
            this.isReadmeVisible = false;
        } else {
            if (this.readMe === null) {
                this.loadReadMe();
            } else {
                this.showReadMe();
            }
        }
    };

    PackageListItemView.prototype.loadReadMe = function() {
        var repository = this.model.getRepositoryUrl("git");
        if (!repository) {
            this.ui.toggleReadMe.html("Readme not available").attr("disabled", true);
        } else {
            var match = null;
            _.some(githubRegex, function(re) {
                match = re.exec(repository.url);
                return match != null;
            });
            if (match != null) {
                this.ui.readMe.addClass("loading");
                $.ajax({
                    "headers": {"Accept": "application/vnd.github.v3.html+json"},
                    "url": "https://api.github.com/repos/" + match[1] + "/" + match[2] + "/readme"
                }).fail(_.bind(function() {
                    this.ui.toggleReadMe.text(this.ui.toggleReadMe.data("unavailable"))
                            .attr("disabled", true);
                }, this)).done(_.bind(this.showReadMe, this)).complete(_.bind(function() {
                    this.ui.readMe.removeClass("loading");
                }, this));
            } else {
                this.ui.toggleReadMe
                        .text(this.ui.toggleReadMe.data("unavailable"))
                        .attr("disabled", true);
            }
        }
    };

    PackageListItemView.prototype.showReadMe = function(content) {
        if (content) {
            this.readMe = content;
        }
        this.ui.readMe.addClass("expanded");
        this.ui.toggleReadMe.text(this.ui.toggleReadMe.data("close"));
        this.ui.readMeContent.html(this.readMe);
        this.isReadmeVisible = true;
    };

    PackageListItemView.prototype.showDetail = function(event) {
        if ($(event.target).is("a,button")) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        app.controller.detail(this.model.get("name"));
    };

    return PackageListItemView;
});