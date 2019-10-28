
const SVG_OPTIONS = {
    d: true,
    fill: true,
    cx: true,
    cy: true,
    r: true,
    points: true
  }
  
  
  const HTML_OPTIONS = {
    accessKey: true,
    action: true,
    alt: true,
    autocomplete: true,
    checked: true,
    class: true,
    classes: true,
    disabled: true,
    encoding: true,
    enctype: true,
    href: true,
    id: true,
    innerHTML: 'dangerouslySetInnerHTML',
    method: true,
    name: true,
    placeholder: true,
    readOnly: true,
    rel: true,
    rows: true,
    spellcheck: true,
    src: true,
    srcset: true,
    styles: true,
    style: true,
    step: true,
    tabIndex: true,
    target: true,
    title: true,
    value: true,
    type: 'type',
    key: true,
    min: true,
    max: true,
    ref: true,
    defaultValue: true,
    htmlFor: true
  }
  

export const Options = {...SVG_OPTIONS, ...HTML_OPTIONS}

export function ReactOptions (config) {
    config.HTML_OPTIONS = HTML_OPTIONS
}
