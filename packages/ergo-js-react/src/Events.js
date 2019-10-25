
const HTML_EVENTS = {
    onClick: 'onClick',
    onDoubleClick: 'onDoubleClick',
    onMouseDown: 'onMouseDown',
    onMouseUp: 'onMouseUp',
    onInput: 'onInput',
    onChange: 'onChange',
    onKeyDown: 'onKeyDown',
    onKeyUp: 'onKeyUp',
    onFocus: 'onFocus',
    onBlur: 'onBlur',
    onLoad: 'onLoad'
}

export const Events = HTML_EVENTS

export function ReactEvents (config) {
    config.HTML_EVENTS = HTML_EVENTS
}
