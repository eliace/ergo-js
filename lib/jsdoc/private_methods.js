



/*
 * Automatically marks member as private if name starts with '_' prefix.
 */
exports.handlers = {
    newDoclet: function(e) {
        var doclet = e.doclet;
 
        if (typeof doclet.access === 'undefined' && doclet.name && doclet.name[0] === '_') {
            doclet.access = 'private';
        }
    }
};
