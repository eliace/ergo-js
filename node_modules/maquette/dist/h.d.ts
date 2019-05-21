import { VNode, VNodeChild, VNodeProperties } from './interfaces';
/**
 * The `h` function is used to create a virtual DOM node.
 * This function is largely inspired by the mercuryjs and mithril frameworks.
 * The `h` stands for (virtual) hyperscript.
 *
 * @param selector    Contains the tagName, id and fixed css classnames in CSS selector format.
 *                    It is formatted as follows: `tagname.cssclass1.cssclass2#id`.
 * @param properties  An object literal containing properties that will be placed on the DOM node.
 * @param children    Virtual DOM nodes and strings to add as child nodes.
 *                    `children` may contain [[VNode]]s, `string`s, nested arrays, `null` and `undefined`.
 *                    Nested arrays are flattened, `null` and `undefined` are removed.
 *
 * @returns           A VNode object, used to render a real DOM later.
 *
 * NOTE: There are {@link http://maquettejs.org/docs/rules.html|two basic rules} you should be aware of when updating the virtual DOM.
 */
export declare function h(selector: string, properties?: VNodeProperties, children?: VNodeChild[] | null): VNode;
/**
 * The `h` function is used to create a virtual DOM node.
 * This function is largely inspired by the mercuryjs and mithril frameworks.
 * The `h` stands for (virtual) hyperscript.
 *
 * @param selector    Contains the tagName, id and fixed css classnames in CSS selector format.
 *                    It is formatted as follows: `tagname.cssclass1.cssclass2#id`.
 * @param children    Virtual DOM nodes and strings to add as child nodes.
 *                    `children` may contain [[VNode]]s, `string`s, nested arrays, `null` and `undefined`.
 *                    Nested arrays are flattened, `null` and `undefined` are removed.
 *
 * @returns           A VNode object, used to render a real DOM later.
 *
 * NOTE: There are {@link http://maquettejs.org/docs/rules.html|two basic rules} you should be aware of when updating the virtual DOM.
 */
export declare function h(selector: string, children: VNodeChild[]): VNode;
