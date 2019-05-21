import { ProjectorPerformanceLogger } from '../interfaces';
/**
 * A `ProjectorPerformanceLogger` that reports measurements to window.performance.measure
 *
 * Can be passed to `createProjector` to get more insights into the virtual DOM performance.
 */
export declare let windowPerformanceProjectorLogger: ProjectorPerformanceLogger;
