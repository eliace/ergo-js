/**
 * A `ProjectorPerformanceLogger` that reports measurements to window.performance.measure
 *
 * Can be passed to `createProjector` to get more insights into the virtual DOM performance.
 */
export var windowPerformanceProjectorLogger;
if (window.performance && window.performance.measure) {
    var performance_1 = window.performance;
    var lastMark_1;
    windowPerformanceProjectorLogger = function (eventType, trigger) {
        performance_1.mark(eventType);
        switch (eventType) {
            case 'domEventProcessed':
                performance_1.measure('eventHandler', 'domEvent', 'domEventProcessed');
                break;
            case 'renderDone':
                performance_1.measure('renderCycle', 'renderStart', 'renderDone');
                break;
            case 'rendered':
                performance_1.measure('render', lastMark_1, 'rendered');
                break;
            case 'patched':
                performance_1.measure('diff+patch', 'rendered', 'patched');
                break;
        }
        lastMark_1 = eventType;
    };
}
else {
    windowPerformanceProjectorLogger = function () { return undefined; };
}
//# sourceMappingURL=window-performance-projector-logger.js.map