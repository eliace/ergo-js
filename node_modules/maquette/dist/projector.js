import { applyDefaultProjectionOptions, dom } from './dom';
var createParentNodePath = function (node, rootNode) {
    var parentNodePath = [];
    while (node !== rootNode) {
        parentNodePath.push(node);
        node = node.parentNode;
    }
    return parentNodePath;
};
var find;
if (Array.prototype.find) {
    find = function (items, predicate) { return items.find(predicate); };
}
else {
    find = function (items, predicate) { return items.filter(predicate)[0]; };
}
var findVNodeByParentNodePath = function (vnode, parentNodePath) {
    var result = vnode;
    parentNodePath.forEach(function (node) {
        result = (result && result.children) ? find(result.children, function (child) { return child.domNode === node; }) : undefined;
    });
    return result;
};
var createEventHandlerInterceptor = function (projector, getProjection, performanceLogger) {
    var modifiedEventHandler = function (evt) {
        performanceLogger('domEvent', evt);
        var projection = getProjection();
        var parentNodePath = createParentNodePath(evt.currentTarget, projection.domNode);
        parentNodePath.reverse();
        var matchingVNode = findVNodeByParentNodePath(projection.getLastRender(), parentNodePath);
        projector.scheduleRender();
        var result;
        if (matchingVNode) {
            /* tslint:disable no-invalid-this */
            result = matchingVNode.properties["on" + evt.type].apply(matchingVNode.properties.bind || this, arguments);
            /* tslint:enable no-invalid-this */
        }
        performanceLogger('domEventProcessed', evt);
        return result;
    };
    return function (propertyName, eventHandler, domNode, properties) { return modifiedEventHandler; };
};
/**
 * Creates a [[Projector]] instance using the provided projectionOptions.
 *
 * For more information, see [[Projector]].
 *
 * @param projectorOptions   Options that influence how the DOM is rendered and updated.
 */
export var createProjector = function (projectorOptions) {
    var projector;
    var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
    var performanceLogger = projectionOptions.performanceLogger;
    var renderCompleted = true;
    var scheduled;
    var stopped = false;
    var projections = [];
    var renderFunctions = []; // matches the projections array
    var addProjection = function (
    /* one of: dom.append, dom.insertBefore, dom.replace, dom.merge */
    domFunction, 
    /* the parameter of the domFunction */
    node, renderFunction) {
        var projection;
        var getProjection = function () { return projection; };
        projectionOptions.eventHandlerInterceptor = createEventHandlerInterceptor(projector, getProjection, performanceLogger);
        projection = domFunction(node, renderFunction(), projectionOptions);
        projections.push(projection);
        renderFunctions.push(renderFunction);
    };
    var doRender = function () {
        scheduled = undefined;
        if (!renderCompleted) {
            return; // The last render threw an error, it should have been logged in the browser console.
        }
        renderCompleted = false;
        performanceLogger('renderStart', undefined);
        for (var i = 0; i < projections.length; i++) {
            var updatedVnode = renderFunctions[i]();
            performanceLogger('rendered', undefined);
            projections[i].update(updatedVnode);
            performanceLogger('patched', undefined);
        }
        performanceLogger('renderDone', undefined);
        renderCompleted = true;
    };
    projector = {
        renderNow: doRender,
        scheduleRender: function () {
            if (!scheduled && !stopped) {
                scheduled = requestAnimationFrame(doRender);
            }
        },
        stop: function () {
            if (scheduled) {
                cancelAnimationFrame(scheduled);
                scheduled = undefined;
            }
            stopped = true;
        },
        resume: function () {
            stopped = false;
            renderCompleted = true;
            projector.scheduleRender();
        },
        append: function (parentNode, renderFunction) {
            addProjection(dom.append, parentNode, renderFunction);
        },
        insertBefore: function (beforeNode, renderFunction) {
            addProjection(dom.insertBefore, beforeNode, renderFunction);
        },
        merge: function (domNode, renderFunction) {
            addProjection(dom.merge, domNode, renderFunction);
        },
        replace: function (domNode, renderFunction) {
            addProjection(dom.replace, domNode, renderFunction);
        },
        detach: function (renderFunction) {
            for (var i = 0; i < renderFunctions.length; i++) {
                if (renderFunctions[i] === renderFunction) {
                    renderFunctions.splice(i, 1);
                    return projections.splice(i, 1)[0];
                }
            }
            throw new Error('renderFunction was not found');
        }
    };
    return projector;
};
//# sourceMappingURL=projector.js.map