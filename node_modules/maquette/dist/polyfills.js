"use strict";
// tslint:disable no-invalid-this
// istanbul ignore next: Polyfill only needed for IE10 and IE11
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        return this.filter(predicate)[0];
    };
}
//# sourceMappingURL=polyfills.js.map