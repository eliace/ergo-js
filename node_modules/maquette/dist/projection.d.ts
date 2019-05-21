/**
 * Exports here are NOT re-exported to maquette
 */
import { Projection, ProjectionOptions, VNode } from './interfaces';
export declare let extend: <T>(base: T, overrides: any) => T;
export declare let initPropertiesAndChildren: (domNode: Node, vnode: VNode, projectionOptions: ProjectionOptions) => void;
export declare let createDom: (vnode: VNode, parentNode: Node, insertBefore: Node | null | undefined, projectionOptions: ProjectionOptions) => void;
export declare let createProjection: (vnode: VNode, projectionOptions: ProjectionOptions) => Projection;
