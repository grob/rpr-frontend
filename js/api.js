define([], function() {

    var Api = function(baseUrl) {
        if (typeof(baseUrl) !== "string" || baseUrl.length < 1) {
            throw new Error("Missing or invalid base URL argument");
        }
        this.baseUrl = baseUrl;
        return this;
    };

    Api.prototype.getUrl = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this.baseUrl);
        return args.join("/");
    };

    return Api;
});