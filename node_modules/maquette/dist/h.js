/* tslint:disable function-name */
var toTextVNode = function (data) {
    return {
        vnodeSelector: '',
        properties: undefined,
        children: undefined,
        text: data.toString(),
        domNode: null
    };
};
var appendChildren = function (parentSelector, insertions, main) {
    for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
        var item = insertions[i];
        if (Array.isArray(item)) {
            appendChildren(parentSelector, item, main);
        }
        else {
            if (item !== null && item !== undefined && item !== false) {
                if (typeof item === 'string') {
                    item = toTextVNode(item);
                }
                main.push(item);
            }
        }
    }
};
export function h(selector, properties, children) {
    if (Array.isArray(properties)) {
        children = properties;
        properties = undefined;
    }
    else if ((properties && (typeof properties === 'string' || properties.hasOwnProperty('vnodeSelector'))) ||
        (children && (typeof children === 'string' || children.hasOwnProperty('vnodeSelector')))) {
        throw new Error('h called with invalid arguments');
    }
    var text;
    var flattenedChildren;
    // Recognize a common special case where there is only a single text node
    if (children && children.length === 1 && typeof children[0] === 'string') {
        text = children[0];
    }
    else if (children) {
        flattenedChildren = [];
        appendChildren(selector, children, flattenedChildren);
        if (flattenedChildren.length === 0) {
            flattenedChildren = undefined;
        }
    }
    return {
        vnodeSelector: selector,
        properties: properties,
        children: flattenedChildren,
        text: (text === '') ? undefined : text,
        domNode: null
    };
}
//# sourceMappingURL=h.js.map