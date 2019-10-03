import {Domain, Layout, Context, Config} from '../core'
import {createVNode, renderVNode} from './Renderer'

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
  type: 'type',
  key: true,
  min: true,
  max: true,
  ref: true,
  defaultValue: true,
  htmlFor: true
}

Config.HTML_EVENTS = {
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

Config.Renderer.h = createVNode

Config.Renderer.append = function (root, dom) {
  this.root = root
  this.dom = dom
  this.schedule()
}

Config.Renderer.schedule = function () {
//  console.count('schedule_render')
  if (!this.scheduled) {
    requestAnimationFrame(() => {
//      console.count('actual_render')
      this.scheduled = false
      const effects = this.effects
      this.effects = []
      if (!this.root.vnode || this.root._dirty) {
        renderVNode(this.root.render(), this.dom)
      }
      console.count('RENDER')
      if (effects) {
//        const effects = this.effects
//        this.effects = []
//        requestAnimationFrame(() => {
          while (effects.length) {
            const eff = effects.pop()
            eff()
          }
//        })
      }
    })
  }
  this.scheduled = true
}

Config.Renderer.effect = function (callback) {
  console.count('schedule_effect')
  if (!this.effects) {
    this.effects = []
  }
  this.effects.push(callback)
  if (!this.scheduled) {
    this.schedule()
  }
}

Config.defaultLayout = Layout
Config.defaultSource = Domain

Config.DEV = true


export default class ReactContext {

  constructor (o) {
//    super(o)
    this.defaultLayout = o.defaultLayout || Layout
//    this.projector = o.projector
    this.defaultSource = o.defaultSource || Domain
    this.projector = {
      scheduled: false,
      append: function (root, dom) {
        throw new Error('projector not supported')
        this.root = root
        this.dom = dom
        this.scheduleRender()
      },
      scheduleRender: function () {
        throw new Error('projector not supported')
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
