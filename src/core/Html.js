import Options from './Options'
import {defaultFactory, deepClone, buildProp} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames'
import {h} from 'maquette'
import Source from './Data'
import State from './State'


const DEFAULT_RULES = {
  defaultItem: rules.Option,
  defaultComponent: rules.Option,
  defaultComponents: rules.OptionCollection,
  // items: rules.OptionArray,
  components: rules.OptionCollection,
  as: rules.StringArray,
  data: rules.Overlap
}

const DEFAULT_EVENTS = {
  onClick: 'onclick',
  onMouseDown: 'onmousedown',
  onMouseUp: 'onmouseup',
  onEnterAnimation: 'enterAnimation',
  onExitAnimation: 'exitAnimation',
  onUpdateAnimation: 'updateAnimation',
  onAfterCreate: 'afterCreate',
  onUpdateAnimation: 'updateAnimation',
  onAfterUpdate: 'afterUpdate',
  onInput: 'oninput',
  onChange: 'onchange',
  onKeyDown: 'onkeydown',
  onKeyUp: 'onkeyup',
  onFocus: 'onfocus',
  onBlur: 'onblur'
}


const SVG_OPTIONS = {
  d: true,
  fill: true
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
  tabIndex: true,
  target: true,
  title: true,
  value: true,
  _type: 'type',
  key: true,
}



const Html = class {

  static OPTIONS = {}

  constructor(options={}, context) {

    try {

    var proto = Object.getPrototypeOf(this)

    //  собираем опции класса, если они еще не собраны
    if (!proto.hasOwnProperty('classOpts')) {

      var chain = []

      var cls = proto

      while (cls && cls.constructor !== Object) {
        chain.push(cls.defaultOpts || cls.constructor.defaultOpts)
        cls = Object.getPrototypeOf(cls)
      }

      var classOpts = new Options()

      for (let i = chain.length-1; i >= 0; i--) {
        // добавляем только в том случае, когда опции не наследуются
        if (chain[i] != chain[i+1]) {
          classOpts.merge(chain[i])
        }
      }

      proto.classOpts = classOpts.build(DEFAULT_RULES)
    }

    let opts = new Options(this.classOpts, options).build(DEFAULT_RULES)

    this.html = opts.html || 'div'

    this.children = []

    this.props = opts.props || {classes: {}}

    this.layout = opts.layout ? defaultFactory(opts.layout, Layout) : null

//    this.state = {}

//    console.log(opts)

    // постобработка "сахарных" опций

    let extOpts = {}

    for (var i in opts) {
      var o = opts[i]

      if (i[0] == '$') {
        // ленивая инициализация расширенных опций компонентов
        extOpts['components'] = extOpts['components'] || {}

        var compKey = i.substr(1)
        if (extOpts['components'][compKey]) {
          extOpts['components'][compKey].merge(o)
        }
        else {
          extOpts['components'][compKey] = o
        }
      }

    }

    const preparedOpts = new Options(opts, extOpts)

    // sugar opts
    for (var i in opts) {
      if (this.constructor.OPTIONS[i]) {
        const desc = this.constructor.OPTIONS[i]
        if (desc.sugar) {
          desc.sugar.call(this, opts[i], preparedOpts)
        }
      }
    }


    // if (this.prepareOptions) {
    //   this.prepareOptions(opts, preparedOpts)
    // }

//    let incOpts = null
    if (opts.mixins) {
      for (let i = 0; i < opts.mixins.length; i++) {
        let mixinOpts = opts.mixins[i].call(this, preparedOpts)
        preparedOpts.merge(mixinOpts)
      }
    }

    this.options = opts = preparedOpts.build(DEFAULT_RULES)

    this.sources = {}

    if (opts.sources) {
      for (let i in opts.sources) {
    //        console.log('local', i)
        this.bind(opts.sources[i], i)
      }
    }

    this.dynamicItems = false
    this.dynamicComponents = false
    for (let i in this.sources) {
      if (opts[i+'Items']) {
        this.dynamicItems = true
      }
      if (opts[i+'Components']) {
        this.dynamicComponents = true
      }
    }

    // if (opts.subscribes) {
    //   for (let i in opts.subscribes) {
    //     if (this.sources[i]) {
    //       if (opts.dynamic[i]['items']) {
    //         this.dynamicItems = true
    //       }
    //       if (opts.dynamic[i]['components']) {
    //         this.dynamicComponents = true
    //       }
    //     }
    //   }
    //   // for (let i in this.sources) {
    //   //   if (opts.dynamic[i+'Items']) {
    //   //     this.dynamicItems = true
    //   //   }
    //   //   if (opts.dynamic[i+'Components']) {
    //   //     this.dynamicComponents = true
    //   //   }
    //   // }
    // }
    if (opts.dynamic === true) {
      this.dynamicItems = true
      this.dynamicComponents = true
    }
    // if (opts['$items']) {
    //   this.dynamicItems = true
    // }
    // if (opts['$components']) {
    //   this.dynamicComponents = true
    // }

    // // выполняем первичный маппинг? чтобы понять, необходимо ли создавать дочерние элементы
    // const srcOpts = {}
    // for (let i in this.sources) {
    //   if (opts[i]) {
    //     let o = opts[i].call(this, this.sources[i].get(), this.sources[i])
    //     if (o) {
    //       if (o['components'] || o['$components']) {
    //         this.dynamicComponents = true
    //       }
    //       if (o['items'] || o['$items']) {
    //         this.dynamicItems = true
    //       }
    //       srcOpts[i] = o
    //     }
    //   }
    // }

    // проверяем первичный биндинг на наличие компонентов или элементов
//    console.log(this.sources)

    // создание компонентов и элементов

    if (opts.components && !this.dynamicComponents) {
      for (var i in opts.components) {
        this.addComponent(i, opts.components[i])
      }
    }

    if (opts.items && !this.dynamicItems) {
      for (var i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], i)
      }
    }

    // привязка данных

    // if (opts.data) {
    //   this.bind(opts.data)
    // }
    //
    // if (opts.state) {
    //   this.bindState(opts.state)
    // }


    // инициализация свойств

    for (var i in opts) {
      var o = opts[i]

      if (opts.dynamicOptions && opts.dynamicOptions[i]) {
        const desc = opts.dynamicOptions[i]
        if (desc.init) {
          desc.init.call(this, opts[i])
        }
        else if (desc.initOrSet) {
          desc.initOrSet.call(this, opts[i])
        }
      }
      else if (this.constructor.OPTIONS[i]) {
        const desc = this.constructor.OPTIONS[i]
        if (desc.init) {
          desc.init.call(this, opts[i])
        }
        else if (desc.initOrSet) {
          desc.initOrSet.call(this, opts[i])
        }
      }
      else if (i == 'as') {
        if (o.length) {
          this.props['class'] = classNames(this.props['class'], o.join(' '))
        }
      }
      else if (i == 'text') {
        if (this.$content) {
          this.$content.opt('text', o)
        }
        else {
//          this.addComponent('content', {text: o})
          this.text = o
        }
      }
    //   else if (i == 'text') {
    //     if (opts.components && opts.components.content) {
    //       console.log(opts)
    //       opts.components.content.merge({text: o})  //FIXME
    //     }
    //     else {
    //       this.text = o
    // //      this.$content = new Text(o)
    // //      this.children.push(this.$content)
    //     }
      // else if (i == 'styles') {
      //   this.props['styles'] = Object.assign(this.props['styles'] || {}, o)
      // }
      else if (i == 'height') {
        this.props.styles = this.props.styles || {}
        this.props.styles.height = (typeof o === 'string') ? o : o+'px'
      }
      else if (i == 'width') {
        this.props.styles = this.props.styles || {}
        this.props.styles.width = (typeof o === 'string') ? o : o+'px'
      }
      else if (HTML_OPTIONS[i] === true) {
        this.props[i] = o
      }
      else if (HTML_OPTIONS[i]) {
        this.props[HTML_OPTIONS[i]] = o
      }
      else if (DEFAULT_EVENTS[i]) {
        this.props[DEFAULT_EVENTS[i]] = o.bind(this)// (e) => o.call(this, e, this)
    //        Events.on(this, DEFAULT_EVENTS[i], o)
      }
    }

    // // динамические компоненты и элементы
    // if (opts.subscribes) {
    //   for (let i in this.sources) {
    //     const o = opts.subscribes[i]
    //     const s = this.sources[i]
    //     if (o && o['components']) {
    //       this.opt('$$components', o['components'].call(this, s.get(), s), i)
    //     }
    //     if (o && o['items']) {
    //       this.opt('$$items', o['items'].call(this, s.get(), s), i)
    //     }
    //     // if (opts.dynamic[i+'Components']) {
    //     //   this.opt('$components', opts.dynamic[i+'Components'].call(this, s.get(), s), i)
    //     // }
    //     // if (opts.dynamic[i+'Items']) {
    //     //   this.opt('$items', opts.dynamic[i+'Items'].call(this, s.get(), s), i)
    //     // }
    //   }
    // }
    // if (opts['$items']) {
    //   this.opt('$items', opts['$items'])
    // }
    // if (opts['$components']) {
    //   this.opt('$components', opts['$components'])
    // }

    // применяем биндинг элементов и компонентов
    for (let i in this.sources) {
      if (opts[i+'Items']) {
        this.opt('$$items', opts[i+'Items'].call(this, this.sources[i].get(), this.sources[i]), i)
      }
      else if (opts[i+'Components']) {
        this.opt('$$components', opts[i+'Components'].call(this, this.sources[i].get(), this.sources[i]), i)
      }
    }
    // применяем биндинг опций
    for (let i in this.sources) {
      if (opts[i+'Options']) {
        const o = opts[i+'Options'].call(this, this.sources[i].get(), this.sources[i], i)
        for (let j in o) {
          this.opt(j, o[j])
        }
      }
    }

    // // динамические опции
    // if (opts.subscription) {
    //   let dynOpts = {}
    //   for (let i in opts.subscription) {
    //     if (i == 'all') {
    //       const v = {}
    //       for (let j in this.sources) {
    //         v[j] = this.sources[j].get()
    //       }
    //       Object.assign(dynOpts, opts.subscription[i].call(this, v, this.sources))
    //     }
    //     else if (this.sources[i]) {
    //       Object.assign(dynOpts, opts.subscription[i].call(this, this.sources[i].get(), this.sources[i], i))
    //     }
    //   }
    // }
    for (let i in this.sources) {
      if (opts[i+'Effectors']) {
        const effectors = opts[i+'Effectors']
        for (let j in effectors) {
          this.sources[i].use(j, effectors[j], this)
        }
      }
    }


    this._binding_chain = []
    for (let i in this.sources) {
      if (opts[i+'Changed']) {
        this._binding_chain.push(i)
      }
    }
    while (this._binding_chain.length) {
      const i = this._binding_chain.shift()
      this.sources[i]._init(this)
//      this.sources[i].update('none', 'init')
      // заменить на прямой вызов update
//      this.sources[i].emit('get', {target: this})
//      this.sources[i].emit('init', {target: this})//this.sources[i].get(), this)
      // const o = opts[i+'Changed'].call(this, this.sources[i].get(), this.sources[i], i)
      // for (let j in o) {
      //   this.opt(j, o[j])
      // }
    }
    // for (let i in this.sources) {
    //   if (opts[i+'Changed']) {
    //     const o = opts[i+'Changed'].call(this, this.sources[i].get(), this.sources[i], i)
    //     for (let j in o) {
    //       this.opt(j, o[j])
    //     }
    //   }
    // }
    delete this._binding_chain

    if (opts.binding) {
      const v = {}
      // while (this._binding_chain.length) {
      //   const src = this.sources[this._binding_chain.shift()]
      //   v[i] = this.sources[i].cache != null ? this.sources[i].cache : this.sources[i].get()
      // }
      for (let i in this.sources) {
        v[i] = /*this.sources[i].cache != null ? this.sources[i].cache :*/ this.sources[i].get()
      }
      const bindOpts = opts.binding.call(this, v, this.sources)
      if (bindOpts) {
        for (let j in bindOpts) {
          this.opt(j, bindOpts[j])
        }
      }
    }

//     for (let i in srcOpts) {
//       let o = srcOpts[i]
//       for (let j in o) {
//         if (j == 'components' || j == '$components' || j == 'items' || j == '$items') {
//           this.opt(j, o[j], i)
//         }
//       }
// //      this.rebindOpts(srcOpts[i], i)
//     }
//
//     for (let i in srcOpts) {
//       let o = srcOpts[i]
//       for (let j in o) {
//         if (!(j == 'components' || j == '$components' || j == 'items' || j == '$items')) {
//           this.opt(j, o[j], i)
//         }
//       }
// //      this.rebindOpts(srcOpts[i], i)
//     }

//    console.log('desc', this.constructor.optDesc)
//    console.log(opts)

    }
    catch (e) {
      console.error(e)
      throw e
    }
  }


  render() {
//    console.log('render', !!this.vnode, this.children.length, this)
    if (this.options.render === false) {
      return null
      // if (!this.options.rendering.call(this, h)) {
      //   return null
      // }
    }

    if (this.children.length) {
      if (this.layout == null) {
        this.layout = defaultFactory(this.options.layout, Layout)
      }
      if (this.text) {
        this.vnode = this.vnode || this.layout.render(this.html, deepClone(this.props), [...this.children, new Text(this.text)])
      }
      else {
        this.vnode = this.vnode || this.layout.render(this.html, deepClone(this.props), [...this.children])
      }
    }
    else if(this.text || this.props.value) {
      this.vnode = this.vnode || h(this.html, deepClone(this.props), [this.text])
    }
    else if (this.options.renderIfEmpty !== false) {
      this.vnode = this.vnode || h(this.html, deepClone(this.props))
    }
    return this.vnode
  }

  child(path) {

    if (typeof path === 'string') {
      path = path.split('.')
    }

    let key = path.shift()
    for (let i = 0; i < this.children.length; i++) {
      let c = this.children[i]
      if (c.props.key == key) {
        return path.length ? c.child(path) : c
      }
    }

    return null
  }

  item(index) {
    for (let i = 0; i < this.children.length; i++) {
      let c = this.children[i]
      if (c.index == index) {
        return c
      }
    }
    return null
  }

  opt(name, value, key) {

    if (arguments.length == 1) {
      // get
      if (this._binding_chain) {
        while (this._binding_chain.length) {
          const i = this._binding_chain.shift()
          this.sources[i]._init(this)
//          this.sources[i].emit('init', {target: this})//, null, this)
          // const o = this.options[i+'Changed'].call(this, this.sources[i].get(), this.sources[i], i)
          // for (let j in o) {
          //   this.opt(j, o[j])
          // }
        }
      }
      return this.options[name]
    }

    let keys = [name]
    let values = value
    let isObject = false

    if (name && typeof name === 'object'/*name.constructor === Object*/) {
      keys = Object.keys(name)
      isObject = true
      key = value
      values = name
    }

    for (let i = 0; i < keys.length; i++) {
      name = keys[i]
      value = isObject ? values[name] : values
//     }
//
//     if (name && name.constructor === Object) {
//       // FIXME здесь нужен цикл по ключам без
//       keys = Object.keys(name)
// //      console.log(keys)
//       if (keys.length == 1) {
//         value = name[keys[0]]
//         name = keys[0]
//       }
//       else {
//         const k = value
//         const v = name
//         for (let i in v) {
//           this.opt(i, v[i], k)
//         }
//         return
//       }
//       //TODO сливаем опции
//     }

    if (this.options[name] == value) {
      continue
//      return this
    }

//    console.log('opt', name, v)

    if (name[0] != '$') {
      // FIXME заменить нормальным слиянием
      if (value && value.constructor === Object) {
        if (this.options[name] != null) {
          this.options[name] = buildProp(this.options[name], value)
          value = this.options[name]
//          Object.assign(this.options[name], value)
        }
        else {
          this.options[name] = value
        }
      }
      else {
        this.options[name] = value
      }
    }
    else {
      name = name.substr(1)
    }

    if (this.options.dynamicOptions && this.options.dynamicOptions[name]) {
      const desc = this.options.dynamicOptions[name]
      if (desc.set) {
        desc.set.call(this, value)
      }
      else if (desc.initOrSet) {
        desc.initOrSet.call(this, value)
      }
    }
    else if (this.constructor.OPTIONS[name]) {
      const desc = this.constructor.OPTIONS[name]
      if (desc.set) {
        desc.set.call(this, value, key)
      }
      else if (desc.initOrSet) {
        desc.initOrSet.call(this, value, key)
      }
    }
    else if (name == 'text') {
      if (this.$content) {
        this.$content.opt('text', String(value))
      }
      else {
        this.text = String(value)
      }
//      this.options[name] = String(v)
    }
    else if (name == 'html') {
      this.html = value
    }
    else if (name == 'as') {
      if (value.length) {
        this.props['class'] = classNames(this.props['class'], value.join(' '))
      }
    }
    else if (name == 'sources') {
      for (let i in value) {
        if (this.sources[i]) {
          // TODO надо сделать rebind
        }
        else {
          this.bind(value[i], i)
        }
      }
      for (let i in value) {
        this.sources[i]._init(this)
//        this.sources[i].emit('init', {target: this})//, null, this)
//        this.rebind(this.sources[i].get(), i, this.sources[i])
      }
    }
    else if (name == 'items') {
      if (this._modify_items) {
        console.warn('items overchange', value)
      }
      else {
        this._modify_items = true
        if (typeof value == 'string') {
          key = value
          value = this.sources[key]
        }
        if (value instanceof Source) {
          value = value.asStream()
        }
        if (value instanceof Source.Stream) {

          key = value.key || key

          const o = this.options
          let items = this.children.filter(child => child.index != null)
      //    console.log(items.length, this.children.length)
          let add = {}
          let update = []

//          console.log('items', value.get())
          value.entries((entry, i) => {
//          value.stream((entry, i) => {
      //      console.log(entry.get())
            let found = null
            for (let j = 0; j < items.length; j++) {
              const item = items[j]
              if (item.options.sources[key] == entry) {
                update.push(item)
                found = item
                break
              }
            }
            if (!found) {
              add[i] = entry
      //        console.log('to add', entry, update.length, this)
            }
            else {
              items.splice(items.indexOf(found), 1)
            }
          })

      //    console.log('reconcile', Object.keys(add).length, update.length, items.length)

          items.forEach(item => this.removeItem(item))

          Object.keys(add).forEach(i => {
            let entry = add[i]
            this.addItem({sources: {[key]: entry}}, Number(i)/*, {...this.sources, ...{[key]: entry}}*/)
          })

          // update.forEach(item => {
          //   let src = item.sources[key]
          //   item.rebind(src.get(), key, src)
          // })

        }
        else {
          this.removeAllItems()
          for (let i = 0; i < value.length; i++) {
            this.addItem(value[i])
          }
        }
        delete this._modify_items
      }
    }
    else if (name == 'components') {
      if (this._modify_components) {
        console.warn('components overchange', value)
      }
      else {
        this._modify_components = true
  //      debugger
        if (typeof value == 'string') {
          key = value
          value = this.sources[key]
        }
        else if (typeof value == 'function') {
          value = value()
        }

        if (value instanceof Source) {
          let o = this.options
          let def = {...o.components}
          const data = value.get()
          if (o.components) {
            for (let i in o.components) {
//          for (let i in data) {
              if (o.components && o.components[i]) {
                const s = data[i]
                if (s !== false && !this['$'+i]) {
    //              debugger
                  this.addComponent(i, o.components[i])
                }
                else if (s === false && this['$'+i]) {
    //              debugger
                  this.removeComponent(i)
                }
                delete def[i]
              }
            }
          }
          for (let i in def) {
            if (this['$'+i]) {
              // пропускаем
            }
            else {
              this.addComponent(i, o.components[i])
            }
          }

//           if (o.defaultComponents) {
// //            def = {...o.defaultComponents}
//             for (let i in o.defaultComponents) {
//               if (o.defaultComponents[i]) {
//                 const s = data[i]
//                 if (s !== false && !this['$'+i]) {
//                   this.addComponent(i, o.defaultComponents[i])
//                 }
//                 else if (s == false && this['$'+i]) {
//                   this.removeComponent(i)
//                 }
//               }
//             }
//           }

        }
        else if (typeof value === 'function') {

        }
        else {
          for (let i in value) {
            const component = value[i]
            if (component == this['$'+i]) {
              // пропускаем
            }
            else {
              this.addComponent(i, component)
            }
          }
        }
        delete this._modify_components
      }
    }
/*
    else if (name == '$components') {
      // if (typeof value === 'function') {
      //   value = value.call(this)
      // }
      let o = this.options
      let def = {...o.components}
      for (let i in value) {
        if (o.components && o.components[i]) {
          const s = value[i]
          if (s !== false && !this['$'+i]) {
            this.addComponent(i, o.components[i])
          }
          else if (s === false && this['$'+i]) {
            this.removeComponent(i)
          }
          delete def[i]
        }
      }
      for (let i in def) {
        this.addComponent(i, o.components[i])
      }
    }
    else if (name == '$items') {
      // if (typeof value === 'function') {
      //   value = value.call(this)
      // }
      const o = this.options
      let items = this.children.filter(child => child.index != null)
  //    console.log(items.length, this.children.length)
      let add = {}
      let update = []

      this.sources[key].stream((entry, i) => {
  //      console.log(entry.get())
        let found = null
        for (let j = 0; j < items.length; j++) {
          const item = items[j]
          if (item.options.sources[key] == entry) {
            update.push(item)
            found = item
            break
          }
        }
        if (!found) {
          add[i] = entry
  //        console.log('to add', entry, update.length, this)
        }
        else {
          items.splice(items.indexOf(found), 1)
        }
      })

  //    console.log('reconcile', Object.keys(add).length, update.length, items.length)

      items.forEach(item => this.removeItem(item))

      Object.keys(add).forEach(i => {
        let entry = add[i]
        this.addItem(new Options({sources: {[key]: entry}}, o.items ? o.items[i] : null), Number(i))
      })

      // update.forEach(item => {
      //   let src = item.sources[key]
      //   item.rebind(src.get(), key, src)
      // })

    }
*/
    // else if (name == 'key') {
    //   this.props.key = v
    // }
    else if (HTML_OPTIONS[name] === true) {
      this.props[name] = value
    }
    else if (HTML_OPTIONS[name]) {
      this.props[HTML_OPTIONS[name]] = value
    }
  }

    this.rerender()
    return this
  }

  rerender() {
    let c = this
    while (c && c.vnode) {
      delete c.vnode
      c = c.parent
    }
  }

  addItem(o, i) {

    if (this.options.defaultItem && typeof o === 'string') {
      o = {text: o}
    }
//     let dataOpts = this.data == null ? null : {data: this.data}
//     if (this.state) {
//       dataOpts = {...dataOpts, state: this.state}
// //      console.log(i, dataOpts)
//     }
    const dataOpts = {sources: this.sources}
    let itemOpts = new Options(dataOpts, this.options.defaultItem, o).build(DEFAULT_RULES)
//    console.log('addItem', o, itemOpts)
    const item = defaultFactory(itemOpts, (typeof itemOpts === 'string') ? Text : Html)
    this.children.push(item)
    if (i == null) {
      i = 0
      // ищем максимальный индекс
      for (let j = this.children.length-1; j >= 0; j--) {
        let child = this.children[j]
        if (child.index > 0) {
          i = child.index+1
          break
        }
      }
    }
    item.props.key = item.options.key || 'item-'+i
    item.index = i
    item.parent = this

    // const ctx = this.sources
    // for (let i in ctx) {
    //   item.bind(ctx[i], i)
    // }

    if (this.vnode) {
      this.rerender()
    }

    return item
  }

  addComponent(i, o) {
    if (this['$'+i]) {
      this.removeComponent(i)
    }

    if (((this.options.dynamicComponents && this.options.dynamicComponents[i]) || this.options.defaultComponent) && typeof o === 'string') {
      o = {text: o}
    }

    // TODO сделать корректную обработку строковых опций

    // if ((this.options.defaultComponent || this.options.components[i]) && typeof o === 'string') {
    //   o = {text: o}
    // }


//     let dataOpts = this.data == null ? null : {data: this.data}
//     if (this.state) {
//       dataOpts = {...dataOpts, state: this.state}
// //      console.log(i, dataOpts)
//     }
    const dynamicComponent = this.options.dynamicComponents && this.options.dynamicComponents[i]
    const dataOpts = {sources: this.sources}
    var compOpts = new Options(this.options.defaultComponent, dynamicComponent, dataOpts, o).build(DEFAULT_RULES)
//    console.log('addComponent', o, compOpts)
    const comp = defaultFactory(compOpts, (typeof o === 'string') ? Text : Html)
    this.children.push(comp)
    comp.props.key = i
//        comp.index = 0
    comp.parent = this
    this['$'+i] = comp


//    if (i == 'mainMenu') debugger

    // const ctx = this.sources
    // for (let i in ctx) {
    //   comp.bind(ctx[i], i)
    // }
    // if (this.state) {
    //   comp.bindState(this.state)
    // }

    if (this.vnode) {
      this.rerender()
    }

    return comp
  }

  removeComponent(key) {

    let child = (typeof key === 'object') ? key : this['$'+key]

    if (child) {
      const i = this.children.indexOf(child)
      this.children.splice(i, 1)

      delete this['$'+key]

      delete child.parent
      child.destroy()

      if (this.vnode) {
        this.rerender()
      }
    }
    else {
      console.warn('try to remove not existing component')
    }

    return child
  }

  removeItem(i) {
    // TODO
    let child = null
    let childIndex = -1
    if (typeof i == 'object') {
      child = i
      childIndex = this.children.indexOf(child)
    }
    else {
      for (let j = 0; j < this.children.length; j++) {
        if (this.children[j].index == i) {
          child = this.children[j]
          childIndex = j
          break
        }
      }
    }
    if (child != null) {
      this.children.splice(childIndex, 1)
      for (let j = childIndex; j < this.children.length; j++) {
        let c = this.children[j]
        if (c.index != null) {
          c.index--
        }
      }
      delete child.parent
      child.destroy()

      if (this.vnode) {
        this.rerender()
      }
    }
  }

  removeAllItems() {
    for (let i = this.children.length-1; i >= 0; i--) {
      let child = this.children[i]
      if (child.index != null) {
        this.removeItem(child)
      }
    }
  }


  destroy() {
    for (let i in this.sources) {
      this.sources[i].unjoin(this)
    }
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].destroy();
    }

    delete this.sources
    delete this.children
    delete this.layout

//    delete this.parent
    // if (this.data) {
    //   this.data.unjoin(this)
    // }
    // if (this.state) {
    //   this.state.unjoin(this)
    // }
  }

  walk(callback) {
    callback(this)
    this.children.forEach(c => c.walk && c.walk(callback))
  }

  climb (callback) {
    let c = this
    while (c) {
      if (callback(c) === false) {
        break
      }
      c = c.parent
    }
  }



  bind(v, i) {

//    console.log('bind', i, v)

    if (v == null) {
      return
    }

    let source = null

    const o = this.options

    let key = (o.dynamic && o.dynamic[i]) ? o.dynamic[i]['id'] : o[i+'Id']
    // if (o.dynamic) {
    //   key = o.dynamic[i+'Id'] || (o.dynamic[i] && o.dynamic[i]['id'])
    // }

    if (key != null) {
      source = (v instanceof Source) ? v.entry(key) : new Source(v, null, key)
    }
    else {
      source = (v instanceof Source) ? v : new Source(v)
    }

//    const effects = o[i+'Effects']

    // if (o[i+'Id'] || o[i+'Options'] || o[i+'Items'] || o[i+'Components']/* || o.binding || o[i+'Changed']*/
    //     || (o.dynamic && (o.dynamic[i]/* || o.dynamic[i+'Id'] || o.dynamic[i+'Items'] || o.dynamic[i+'Components'] || o.dynamic[i+'Options']*/))) {
    //   source.join(this, this.rebind, this.unbind, i, effects)
    //   if (this.sources[i]) {
    //     this.sources[i].unjoin(this)
    //   }
    // }

    // if (o[i+'Changed']/* || o[i+'Effects'] || o.effects*/) {
    //   // TODO возможно, с эффектами придется поступить так же - вспомогательная функция
    //   source.join(this, [o[i+'Changed'], this.opt], this.unbind, i, o[i+'Effects'])
    //   if (this.sources[i]) {
    //     this.sources[i].unjoin(this)
    //   }
    // }

    if (o.binding || o[i+'Effects'] || o.effects || o[i+'Changed']) {
      // TODO возможно, с эффектами придется поступить так же - вспомогательная функция
      source.join(this, this.rebind, this.unbind, i/*, o[i+'Effects']*/)
      if (this.sources[i]) {
        this.sources[i].unjoin(this)
      }
    }

    // else {
    //   console.log('ignore join')
    // }


    this.sources[i] = source

    this.children.forEach(child => {if (child.sources[i] == null) child.bind(source, i)})

//    this.rebind(source.get(), i, source)
  }
/*
  rebind(v, source, key) {
    const o = this.options

    // if (this._binding) {
    //   console.warn('overlap binding', this._binding, key)
    //   return
    // }

//    console.log('rebind', key)
//    const source = this.sources[key]

//     if (o[key+'Dynamic']) {
//       this.removeAllItems()
//       source.each((entry, i) => {
// //        console.log(i, entry.get(), o.items)
//         if (Array.isArray(source.get())) {
// //          console.log('array', i, entry.get())
//           if (o.items && o.items[i]) {
//             const s = entry.get()
// //            console.log(i, s)
//             if (s) {
//             }
//             this.addItem(o.items[i], i, {...this.sources, ...{[key]: entry}})//new Options({state: entry}, o.items[i]), i)
//           }
//         }
//         else {
//           if (o.components && o.components[i]) {
//             const s = entry.get()
//   //          console.log('substate', i, s)
//             if (s && !this['$'+i]) {
//               this.addComponent(i, o.components[i], {...this.sources, ...{[key]: entry}})//new Options({state: entry}, o.components[i]))
//             }
//             else if (!s && this['$'+i]) {
//               this.removeComponent(i)
//             }
//           }
//         }
//       })
//
//     }
//     else {
      // if (o[key+'BindingItems']) {
      //   o[key+'BindingItems'].call(this, v, key, source)
      // }
      // if (o[key+'BindingComponents']) {
      //   o[key+'BindingComponents'].call(this, v, key, source)
      // }
      // if (o[key+'Binding']) {
      //   o[key+'Binding'].call(this, v, key, source)
      // }
      // if (o.binding) {
      //   o.binding.call(this)
      // }
      if (o[key+'Items']) {
        this.opt('$$items', o[key+'Items'].call(this, v, source), key)
      }
      if (o[key+'Components']) {
        this.opt('$$components', o[key+'Components'].call(this, v, source), key)
      }
      if (o[key+'Options']) {
        const dynOpts = o[key+'Options'].call(this, v, source, key)
        if (dynOpts) {
          for (let j in dynOpts) {
            this.opt(j, dynOpts[j], key)
          }
        }
      }
      if (o.dynamic && o.dynamic !== true && o.dynamic[key]) {
        const srcOpts = o.dynamic[key]
        if (srcOpts['components']) {
          this.opt('$$components', srcOpts['components'].call(this, v, source), key)
        }
        if (srcOpts['items']) {
          this.opt('$$items', srcOpts['items'].call(this, v, source), key)
        }
        if (srcOpts['options']) {
          const dynOpts = srcOpts['options'].call(this, v, source, key)
          if (dynOpts) {
            for (let j in dynOpts) {
              this.opt(j, dynOpts[j], key)
            }
          }
        }
      }

      if (o[key+'Changed']) {
        const dynOpts = o[key+'Changed'].call(this, v, source, key)
        if (dynOpts) {
          for (let j in dynOpts) {
            this.opt(j, dynOpts[j], key)
          }
        }
      }

      if (o.binding) {
        v = {}
        for (let i in this.sources) {
          v[i] =  this.sources[i].get()
        }
        const bindOpts = o.binding.call(this, v, this.sources, key)
        if (bindOpts) {
          for (let j in bindOpts) {
            this.opt(j, bindOpts[j], key)
          }
        }
      }
      // if (o.dynamic) {
      //   if (o.dynamic[key+'Components']) {
      //     this.opt('$components', o.dynamic[key+'Components'].call(this, v, source), key)
      //   }
      //   if (o.dynamic[key+'Items']) {
      //     this.opt('$items', o.dynamic[key+'Items'].call(this, v, source), key)
      //   }
      //   if (o.dynamic[key+'Options']) {
      //     const dynOpts = o.dynamic[key+'Options'].call(this, v, source)
      //     if (dynOpts) {
      //       for (let j in dynOpts) {
      //         this.opt(j, dynOpts[j], key)
      //       }
      //     }
      //   }
      // }
//    }

  }
*/
  unbind() {

  }


  rebind (v, key) {

    const o = this.options

//    console.log (v, key)

    if (v.name == 'changed' || v.name == 'init') {
      if (o[key+'Changed']) {
        const dynOpts = o[key+'Changed'].call(this, v.data, key)
        if (dynOpts) {
          this.opt(dynOpts, key)
          // for (let j in dynOpts) {
          //   this.opt(j, dynOpts[j], key)
          // }
        }
      }

      if (o.binding) {
        v = {}
        for (let i in this.sources) {
          v[i] = /*this.sources[i].cache != null ? this.sources[i].cache :*/ this.sources[i].get()
        }
        const bindOpts = o.binding.call(this, v, key)
        if (bindOpts) {
          this.opt(bindOpts, key)
          // for (let j in bindOpts) {
          //   this.opt(j, bindOpts[j], key)
          // }
        }
      }

    }

    if (o[key+'Effects']) {
      o[key+'Effects'].call(this, v, key)
    }

    // return
    //
    // if (o[key+'Changed']) {
    //   const dynOpts = o[key+'Changed'].call(this, v, key)
    //   if (dynOpts) {
    //     this.opt(dynOpts, key)
    //     // for (let j in dynOpts) {
    //     //   this.opt(j, dynOpts[j], key)
    //     // }
    //   }
    // }
    //
    // if (o.binding) {
    //   v = {}
    //   for (let i in this.sources) {
    //     v[i] = /*this.sources[i].cache != null ? this.sources[i].cache :*/ this.sources[i].get()
    //   }
    //   const bindOpts = o.binding.call(this, v, key)
    //   if (bindOpts) {
    //     this.opt(bindOpts, key)
    //     // for (let j in bindOpts) {
    //     //   this.opt(j, bindOpts[j], key)
    //     // }
    //   }
    // }

  }



  emit (name, event) {

  }


  rise (name, event) {
    this.climb(c => {
      if (c.options[name]) {
        return c.options[name].call(c, event)
      }
    })
  }

  // rebindOpts(o, key) {
  //   for (let i in o) {
  //     this.opt(i, o[i], key)
  //   }
  // }

}


export default Html
