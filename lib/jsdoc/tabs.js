

exports.handlers = {
    /**
        Translate HTML tags in descriptions into safe entities.
        Replaces <, & and newlines
     */
    newDoclet: function(e) {
        if (e.doclet.description) {
            e.doclet.description = e.doclet.description
                                   .replace(/\\s/g,'&nbsp;&nbsp;');
        }
    }
};
