import gs from './GettingStarted.md'
import opts from './Options.md'
import struct from './Structure.md'
import layout from './Layout.md'
import data from './DataFlow.md'

import hljs from 'highlight.js';///lib/languages/javascript';
import 'highlight.js/styles/tomorrow-night-eighties.css';

function domHighlightAll (el) {
    el.querySelectorAll('pre').forEach(block => {
        hljs.highlightBlock(block)
    })
}

export const GettingStartedPage = () => {
    return {
        css: 'learn-docs content box',
        innerHTML: {__html: gs},
//        dom: { domHighlightAll }  
    }
}

export const OptionsPage = () => {
    return {
        css: 'learn-docs content box',
        innerHTML: {__html: opts},
//        dom: { domHighlightAll }  
    }
}

export const StructurePage = () => {
    return {
        css: 'learn-docs content box',
        innerHTML: {__html: struct},
//        dom: { domHighlightAll }  
    }
}

export const LayoutPage = () => {
    return {
        css: 'learn-docs content box',
        innerHTML: {__html: layout},
//        dom: { domHighlightAll }  
    }
}

export const DataFlowPage = () => {
    return {
        css: 'learn-docs content box',
        innerHTML: {__html: data},
//        dom: { domHighlightAll }  
    }
}
