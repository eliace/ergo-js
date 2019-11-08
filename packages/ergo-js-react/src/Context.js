import {Domain, Layout, Config} from 'chorda-core'
import {createVNode, renderVNode} from './Renderer'
import {ReactEvents} from './events'
import {ReactOptions} from './options'

const SVG_OPTIONS = {
  d: true,
  fill: true,
  cx: true,
  cy: true,
  r: true,
  points: true
}


const HTML_OPTIONS = {
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
  innerHTML: {
    set: function (v) {
      this.dom.props.dangerouslySetInnerHTML = {__html: v}
    }
  },
//  innerHTML: 'dangerouslySetInnerHTML',
  method: true,
  name: true,
  placeholder: true,
  readOnly: true,
  required: true,
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

Config.Renderer.h = createVNode

const append = function (root, dom) {
  this.root = root
  this.dom = dom
  this.schedule()
}

const schedule = function () {
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
//      console.count('RENDER')
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

const effect = function (callback) {
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


// export default class ReactContext {

//   constructor (o) {
// //    super(o)
//     this.defaultLayout = o.defaultLayout || Layout
// //    this.projector = o.projector
//     this.defaultSource = o.defaultSource || Domain
//     this.projector = {
//       scheduled: false,
//       append: function (root, dom) {
//         throw new Error('projector not supported')
//         this.root = root
//         this.dom = dom
//         this.scheduleRender()
//       },
//       scheduleRender: function () {
//         throw new Error('projector not supported')
//         console.log('scheduleRender')
//         if (!this.scheduled) {
//           requestAnimationFrame(() => {
//             renderVNode(this.root.render(), this.dom)
//             this.scheduled = false
//           })
//         }
//         this.scheduled = true
//       }
//     }
//   }

// }

export default (config) => {
  config.HTML_OPTIONS = HTML_OPTIONS
  config.HTML_EVENTS = HTML_EVENTS
  config.Renderer.h = createVNode
  config.Renderer.append = append
  config.Renderer.schedule = schedule
  config.Renderer.effect = effect
  config.defaultLayout = Layout
  config.defaultSource = Domain
//  config.DEV = false
}
