define(function() {

    var strings = {};

    /**
     * Fills a string with another string up to a desired length
     * @param {String} string the string
     * @param {String} fill the filling string
     * @param {Number} length the desired length of the resulting string
     * @param {Number} mode the direction which the string will be padded in:
     * a negative number means left, 0 means both, a positive number means right
     * @returns String the resulting string
     */
    strings.pad = function(string, fill, length, mode) {
        if (typeof(string) !== "string") {
            string = string.toString();
        }
        if (fill == null || length == null) {
            return string;
        }
        var diff = length - string.length;
        if (diff == 0) {
            return string;
        }
        var left, right = 0;
        if (mode == null || mode > 0) {
            right = diff;
        } else if (mode < 0) {
            left = diff;
        } else if (mode == 0) {
            right = Math.round(diff / 2);
            left = diff - right;
        }
        var list = [];
        for (var i = 0; i < left; i++) {
            list[i] = fill;
        }
        list.push(string);
        for (i = 0; i < right; i++) {
            list.push(fill);
        }
        return list.join("");
    };

    strings.truncate = function(string, length, suffix) {
        if (string.length <= length) {
            return string;
        }
        return string.substring(0, length) + (suffix || "...");
    };

    strings.truncatewords = function(string, length, suffix) {
        if (typeof(string) !== "string" || string.length < 1) {
            return null;
        }
        var re = /[ \n\r\t]/;
        length = parseInt(length, 10);
        if (!length) {
           return string;
        }

        for (var i=0, j=string.length, count = 0, current, last; i<string.length; i+=1){
           var current = string.charAt(i);
           if (re.test(last)){
              if (!re.test(current)){
                 ++count;
                 if (count == length){
                    return string.substring(0, j + 1) + " ...";
                 }
              }
           }
           if (!re.test(current)) {
              j = i;
           }
           last = current;
        }
        return string;
    };

    strings.toDashed = function(str) {
        return str.replace(/([a-z])([A-Z]+)/g, function(match, m1, m2) {
            return m1 + '-' + m2.toLowerCase();
        });
    };

    strings.toCamelCase = function(str) {
        return str.replace(/-([a-z])/gi, function(match, m1) {
            return m1.toUpperCase();
        });
    };

    return strings;

});