import {Domain, Layout, Context, Config} from '../core'
import {createVNode, renderVNode} from './Renderer'

Config.h = createVNode

const SVG_OPTIONS = {
  d: true,
  fill: true,
  cx: true,
  cy: true,
  r: true,
  points: true
}


Config.HTML_OPTIONS = {
  ...SVG_OPTIONS,
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
  innerHTML: true,
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
  _type: 'type',
  key: true,
  min: true,
  max: true,
  ref: true
}

Config.HTML_EVENTS = {
  onClick: 'onClick',
  onDoubleClick: 'ondblclick',
  onMouseDown: 'onMouseDown',
  onMouseUp: 'onMouseUp',
  onInput: 'onInput',
  onChange: 'onChange',
  onKeyDown: 'onKeyDown',
  onKeyUp: 'onKeyUp',
  onFocus: 'onFocus',
  onBlur: 'onBlur'
}



export default class ReactContext extends Context {

  constructor (o) {
    super(o)
    this.defaultLayout = o.defaultLayout || Layout
//    this.projector = o.projector
    this.defaultSource = o.defaultSource || Domain
    this.projector = {
      scheduled: false,
      append: function (root, dom) {
        this.root = root
        this.dom = dom
        this.scheduleRender()
      },
      scheduleRender: function () {
        console.log('scheduleRender')
        if (!this.scheduled) {
          requestAnimationFrame(() => {
            renderVNode(this.root.render(), this.dom)
            this.scheduled = false
          })
        }
        this.scheduled = true
      }
    }
  }

}
