import Options from './Options'
import {defaultFactory, deepClone, buildProp, hashCode, Binder, reconcile} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames'
import {h} from 'maquette'
//import Domain from './Domain'
import Source from './Source'
//import State from './State'


const DEFAULT_RULES = {
  defaultItem: rules.Option,
  defaultComponent: rules.Option,
  defaultComponents: rules.OptionCollection,
  // items: rules.OptionArray,
  components: rules.OptionCollection,
  as: rules.StringArray,
  data: rules.Overlap,
  '$': rules.Option
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

// const DOM_EVENTS = {
//   transitionend: true,
//   animationend: true
// }


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
  step: true,
  tabIndex: true,
  target: true,
  title: true,
  value: true,
  _type: 'type',
  key: true,
  min: true,
  max: true
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


      const DEFAULT_OPTS = ['text', 'width', 'height', 'as', 'items', 'components', '$items', '$components']

      let proxy = {}
      // const gs = function (...args) {
      //   console.log('proxy', args, this)
      // }
      for (let i in DEFAULT_OPTS) {
        const setter = function (v) {
//          console.log(v)
          return this.__target.opt(DEFAULT_OPTS[i], v)// gs.call(this, DEFAULT_OPTS[i], v)
        } //gs.bind(null, DEFAULT_OPTS[i])
        const getter = function () {
          return this.__target.opt(DEFAULT_OPTS[i])
        }
        Object.defineProperty(proxy, DEFAULT_OPTS[i], {
          set: setter,
          get: getter
        })
      }

      proto.classOptsProxy = proxy
    }

    let opts = new Options(this.classOpts, options).build(DEFAULT_RULES)

    this.html = opts.html || 'div'

    this.children = []

    this.props = opts.props || {classes: {}, styles: {}}

    this.layout = opts.layout ? defaultFactory(opts.layout, Layout) : null

    this.context = context

//    this.state = {}

//    console.log(opts)

    // постобработка "сахарных" опций

    let extOpts = {}

    // for (var i in opts) {
    //   var o = opts[i]
    //
    //   if (i[0] == '$') {
    //     // ленивая инициализация расширенных опций компонентов
    //     extOpts['components'] = extOpts['components'] || {}
    //
    //     var compKey = i.substr(1)
    //     if (extOpts['components'][compKey]) {
    //       extOpts['components'][compKey].merge(o)
    //     }
    //     else {
    //       extOpts['components'][compKey] = o
    //     }
    //   }
    //
    // }

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
      if (opts.sourcesBound) {
        for (let i in this.sources) {
          this.sources[i]._key = i
        }
        opts.sourcesBound.call(this, this.sources)
        for (let i in this.sources) {
          delete this.sources[i]._key
        }
      }
    }


    // this.dynamicItems = false
    // this.dynamicComponents = false
    // for (let i in this.sources) {
    //   if (opts[i+'Items']) {
    //     this.dynamicItems = true
    //   }
    //   if (opts[i+'Components']) {
    //     this.dynamicComponents = true
    //   }
    // }

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
    // if (opts.dynamic === true) {
    //   this.dynamicItems = true
    //   this.dynamicComponents = true
    // }
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

    if (opts.components == null) {
      for (let i in opts) {
        if (i[0] == '$') {
          this.addComponent(i.substr(1), true)
        }
      }
    }
    else if (opts.components) {
      for (let i in opts) {
        if (i[0] == '$') {
          const k = i.substr(1)
//          if (opts.components[k] !== false) {
            this.addComponent(k, opts.components[k])
//          }
        }
      }
      for (let i in opts.components) {
        if (!opts['$'+i]/* && opts.components[i] !== false*/) {
          this.addComponent(i, opts.components[i])
        }
      }
      //   if (i[0] == '$') {
      //     const k = i.substr(1)
      //     if (!opts.components || opts.components[k] !== false) {
      //       this.addComponent(k, opts.components ? opts.components[k] : true)
      //     }
      //   }
    }
    // else {
    //   for (let i in opts.components) {
    //     this.addComponent(i, opts.components[i])
    //   }
    // }
    // if (opts.components && opts.dynamic !== true) {
    //   for (var i in opts.components) {
    //     if (!opts.dynamic || !opts.dynamic[i]) {
    //       this.addComponent(i, opts.components[i])
    //     }
    //   }
    // }

    if (opts.items) {
      for (var i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], i)
      }
    }


//     if (this.options.methods) {
//       for (let i in this.options.methods) {
//         this[i] = this.options.methods[i]
//         // this[i] = (...params) => {
//         //   this.emit(i, {params})
//         //   return this.options.methods[i].apply(this, params)
//         // }
//       }
// //      Object.assign(this, this.options.methods) // FIXME это неправильно
//     }


    // const setter = function (target, prop, value) {
    //   target.opt()
    // }

//    debugger

    this.opts = {__target: this}

//    const proxy = this.classOptsProxy

//    debugger

//     if (Object.setPrototypeOf) {
//       Object.setPrototypeOf(proxy, Object.getPrototypeOf(this.opts))
//     } else if (proxy.__proto__) {
//       proxy.__proto__ = this.opts.__proto__
//     } else {
//       console.log('err')
// //      prototypeOk = false;
//     }
//Object.setPrototypeOf(proxy, Objecy.getPrototypeOf(this.opts))
    Object.setPrototypeOf(this.opts, this.classOptsProxy)

      // this.opts.aaa = 5
      // console.log(this.opts, this.classOptsProxy)

//    this.opts.as = ['hello']

//    console.log(this.opts.prototype)

    // this.opts = new Proxy(this, {
    //   set (target, prop, value) {
    //     return target.opt(prop, value)
    //   },
    //   get (target, prop) {
    //     return target.opt(prop)
    //   }
    // })

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
      const o = opts[i]

      if (o instanceof Binder) {
        if (!this._binders) {
          this._binders = {}
        }
        this._binders[i] = o

        const source = this.sources[o.domain]
        if (!source._listeners || !source._listeners.has(this)) {
          source.join(this, this.changed, null, o.domain)
        }
        continue
      }

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
      // else if (i == 'styles') {
      //   // фикс для оптимизации maquette
      //   this.props.styles = Object.assign(this.props.styles || {}, o)
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
        this.props[DEFAULT_EVENTS[i]] = /*o.bind(this)*/ (e) => o.call(this, e, this.sources)
    //        Events.on(this, DEFAULT_EVENTS[i], o)
      }
    }


    this.tryInit()


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

    }
    catch (err) {
      console.error(err)
      throw err
    }
  }


  render() {
//    console.log('render', !!this.vnode, this.children.length, this)
    if ('render' in this.options) {
      let render = this.options.render
      if (typeof render === 'function') {
        render = render.call(this, this.options)
      }
      if (!render) {
        return null
      }
    }
    // if (this.options.render === false) {
    //   return null
    //   // if (!this.options.rendering.call(this, h)) {
    //   //   return null
    //   // }
    // }

    if (this.children.length) {
      if (this.layout == null) {
        this.layout = defaultFactory(this.options.layout, Layout, this.context)
      }
      if (this.text) {
        if (this._dirty || !this.vnode) {
          this.vnode = this.layout.render(this.html, deepClone(this.props), [...this.children, new Text(this.text)])
        }
      }
      else {
        if (this._dirty || !this.vnode) {
          this.vnode = this.layout.render(this.html, deepClone(this.props), [...this.children])
        }
      }
    }
    else if(this.text || this.props.value) {
      if (this._dirty || !this.vnode) {
        this.vnode = h(this.html, deepClone(this.props), [this.text])
      }
    }
    else if (this.options.renderIfEmpty !== false) {
      if (this._dirty || !this.vnode) {
        this.vnode = h(this.html, deepClone(this.props))
      }
    }

    delete this._dirty

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
    // else if (name == 'styles') {
    //   // фикс для оптимизации maquette
    //   this.props.styles = Object.assign(this.props.styles || {}, value)
    // }
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
          const o = this.options

          key = value.key || key

          const idResolver = o[key+'EntryId']

          let items = this.items//.filter(itm => !itm._destroying) //?
      //    console.log(items.length, this.children.length)
          let add = {}
          let update = []
          const entriesByKeys = {}

          const prevIds = this.items.map(itm => {return {i: itm.index, k: itm.props.key, itm}})
          const nextIds = []

          value.entries((entry, idx, k) => {
            nextIds.push({i: Number(idx), k})
            let found = null
            for (let j = 0; j < items.length; j++) {
              const item = items[j]
              if (item.props.key == k) {
                if (item.sources[key] != entry) {
                  update.push(item)
                }
                else if (item._destroying) {
                  update.push(item)
                }
                found = item
                break
              }
            }

            if (!found) {
              add[k] = entry
      //        console.log('to add', entry, update.length, this)
            }
            else {
              entriesByKeys[k] = entry
              items.splice(items.indexOf(found), 1)
            }
          }, idResolver)

          console.log(prevIds, nextIds)

          // key
          // index
          // entry

          // entry <=> index + key

          const reconcileResult = reconcile(prevIds, nextIds)

          console.log('reconcile', reconcileResult)

          reconcileResult.moves.forEach(move => {
            this.moveItem(move.i, move.to)
//            move.itm.bind(entriesByKeys[move.k], key)
//            move.itm.init()
//            console.log(items[move.i], move)
          })

          reconcileResult.updated.forEach(upd => {
            if (upd.itm.isDestroying) {
              delete upd.itm._destroying
              delete upd.itm._sourcesToUnjoin
              upd.itm.tryInit()
            }
            else {
//              console.log(entriesByKeys[upd.k] == upd.itm.sources[key], upd.k)
              if (entriesByKeys[upd.k] != upd.itm.sources[key]) {
                upd.itm.bind(entriesByKeys[upd.k], key)
              }
            }
          })

          // this.items.forEach(itm => {
          //   if (itm.index != itm.sources[key].id) {
          //   }
          // })


          console.log('update items', update)
          console.log('[reconcile] update items', reconcileResult.updated)

//           update.forEach(itm => {
// //             if (!itm._destroying) {
// //               for (let k in entriesByKeys) {
// //                 if (entriesByKeys[k] == itm.sources[key]) {
// //                   itm.props.key = k
// //                   break
// //                 }
// //               }
// //             }
// //             else {
// // //              itm.bind(itm.sources[key], key)
// //                           // if (itm._destroying) {
// //               delete itm._destroying
// //               delete itm._sourcesToUnjoin
// //               itm.init()
// //             }
//
//
//
// //            console.log('update item', itm.props.key, entriesByKeys[itm.props.key])
// //             itm.bind(entriesByKeys[itm.props.key], key)
//             // if (itm._destroying) {
//             //   delete itm._destroying
//             //   delete itm._sourcesToUnjoin
//             //   itm.init()
//             // }
// //             else {
// // //              itm.init()
// //             }
//           })

          console.log('remove items', items)
          console.log('[reconcile] remove items', reconcileResult.deleted)

//          items.forEach(item => this.removeItem(item))
          items.forEach(itm => {
            if (itm.isInitializing) {
              console.warn('try to destroy initializing item', itm)
            }
            if (!itm.isDestroying) {
              itm.tryDestroy()
            }
//            item.removed = true
//            item.sources[key].emit('removeItem', {params: [item], target: this})
//            this.removeItem(item)
          })

          console.log('add items', add)
          console.log('[reconcile] add items', reconcileResult.added)

          Object.keys(add).forEach(k => {
            let entry = add[k]
            this.addItem({sources: {[key]: entry}}, Number(entry.id), k)
          })

          console.log('result items', this.items)

/*
          const keyFn = o[key+'Key']

          // if (keyFn) {
          //   value.src.get().forEach(v => {
          //     // это ключ остается
          //     const uid = uidFn(v)
          //
          //   })
          // }
          // value.entries((entry, i) => {
          //   if (keyFn) {
          //     const k = keyFn(entry.get())
          //
          //   }
          // })

//          console.log('items', value.get())
//          value.src.get().forEach((v, i) => {
          value.entries((entry) => {
//          value.stream((entry, i) => {
      //      console.log(entry.get())
            let found = null
            if (keyFn) {
              const k = entry.get() ? keyFn(entry.get()) : null
//              console.log('key', k, item.props.key)
              for (let j = 0; j < items.length; j++) {
                const item = items[j]
                if (item.props.key == k) {
                  update.push(item)
                  found = item
                  break
                }
              }
            }
            else {
              for (let j = 0; j < items.length; j++) {
                const item = items[j]
                if (item.options.sources[key] == entry) {
                  update.push(item)
                  found = item
                  break
                }
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
          console.log('remove items', items)

//          items.forEach(item => this.removeItem(item))
          items.forEach(item => {
            item.removed = true
            item.sources[key].emit('removeItem', {params: [item], target: this})
//            this.removeItem(item)
          })


          console.log('add items', add)

          Object.keys(add).forEach(i => {
            let entry = add[i]
            if (keyFn) {
              console.log('key add', keyFn(entry.get()))
            }
            this.addItem({sources: {[key]: entry}}, Number(i), keyFn ? keyFn(entry.get()) : entry.hashCode())
          })
*/
//          console.log(this.children.filter(itm => itm.index != null).map(itm => itm.props.key))

//          value.entries(e => e.update('desc'))

//          cnsole.log(value.src.get().map(v => ))

//          console.log(this.children.filter(itm => itm.index != null).map(itm => itm.index))
//          console.log(this.children.filter(itm => itm.index != null).map(itm => itm.props.key))
//          console.log(this.children.filter(itm => itm.index != null).map(itm => itm.options.key))
//          console.log(this.children.filter(itm => itm.index != null).map(itm => itm.sources[key].hashCode()))
          // console.log(this.children.filter(itm => itm.index != null).map(itm => itm.props.key))
          // console.log(this.children.filter(itm => itm.index != null).map(itm => itm.sources[key].id))

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
          const data = value.get()
          if (data) {
            for (let i in data) {
              if (o['$'+i]) {
                const s = data[i]
                if (s && !this['$'+i]) {
                  this.addComponent(i, s)
                  console.log('add component', i, s)
                }
                else if (s && this['$'+i]._destroying) {
                  // this['$'+i].destroy()
                  // this.addComponent(i, s)
                  delete this['$'+i]._destroying
                  delete this['$'+i]._sourcesToUnjoin
                  this['$'+i].tryInit()
//                  this.addComponent(i, s)
                  console.log('restore component', i, s)
                }
                else if (!s && this['$'+i]) {
                  if (this['$'+i].isInitializing) {
                    console.warn('try to destroy initializing component', this['$'+i])
                  }
                  this['$'+i].tryDestroy()
//                  this.removeComponent(i)
                  console.log('remove component', i)
                }
              }
            }
          }

//          let dynamicComponents = o.components
          // if (o.dynamic === true) {
          //   dynamicComponents = o.components
          // }
          // else if (o.dynamic && o.dynamic.constructor == Object) {
          //   for (let i in o.dynamic) {
          //     dynamicComponents[i] = o.components[i]
          //   }
          // }
//          let def = {...dynamicComponents}
//           const data = value.get()
// //          debugger
//           if (dynamicComponents) {
//             for (let i in dynamicComponents) {
// //          for (let i in data) {
//               if (dynamicComponents[i]) {
//                 const s = data[i]
//                 if (s && !this['$'+i]) {
//     //              debugger
//                   this.addComponent(i, dynamicComponents[i])
//                 }
//                 else if (!s && this['$'+i]) {
//     //              debugger
//                   this.removeComponent(i)
//                 }
// //                delete def[i]
//               }
//             }
//           }
          // for (let i in def) {
          //   if (this['$'+i]) {
          //     // пропускаем
          //   }
          //   else {
          //     this.addComponent(i, dynamicComponents[i])
          //   }
          // }

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
    else if (HTML_OPTIONS[name] === true) {
      this.props[name] = value
    }
    else if (HTML_OPTIONS[name]) {
      this.props[HTML_OPTIONS[name]] = value
    }
  }

    if (this.vnode && !this._dirty) {
      this.rerender()
    }
    return this
  }

  rerender() {
    if (!this._dirty) {
      this.context.projector.scheduleRender()
    }
    let c = this
    while (c && c.vnode && !c._dirty) {
      c._dirty = true
//      delete c.vnode
      c = c.parent
    }
  }

  addItem(o, i, key) {

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

    if (!itemOpts) {
      return
    }

    const item = defaultFactory(itemOpts, (typeof itemOpts === 'string') ? Text : Html, this.context)
    this.children.push(item)
    if (i == null) {
      i = 0
      // ищем максимальный индекс
      for (let j = this.children.length-1; j >= 0; j--) {
        let child = this.children[j]
        if (child.index != null) {
          i = child.index+1
          break
        }
      }
    }
    else {
      // если позиция указана явно, обновляем индексы
      for (let j = 0; j < this.children.length; j++) {
        let child = this.children[j]
        if (child.index >= i) {
          child.index++
        }
      }
    }
    item.props.key = item.options.key || key// 'item-'+i+'-'+Math.random().toString(16).slice(2)
    item.index = i
    item.parent = this

    // const ctx = this.sources
    // for (let i in ctx) {
    //   item.bind(ctx[i], i)
    // }

    if (this.vnode && !this._dirty) {
      this.rerender()
    }

    return item
  }

  addComponent(i, o) {
    if (this['$'+i]) {
      console.log('removing')
//      this['$'+i].destroy()
      this.removeComponent(i)
    }

    if ((this.options['$'+i] || this.options.defaultComponent) && typeof o === 'string') {
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
//    const dynamicComponent = this.options.dynamicComponents && this.options.dynamicComponents[i]
    const dataOpts = {sources: this.sources}
    var compOpts = new Options(dataOpts, this.options.defaultComponent, this.options['$'+i], o).build(DEFAULT_RULES)

    if (!compOpts) {
      return
    }
//    console.log('addComponent', o, compOpts)
    const comp = defaultFactory(compOpts, (typeof compOpts === 'string') ? Text : Html, this.context)
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

    if (this.vnode && !this._dirty) {
      this.rerender()
    }

    return comp
  }

  removeComponent(key) {

    let child = null

    if (typeof key === 'object') {
      child = key
      key = child.props.key
    }
    else {
      child = this['$'+key]
    }

    if (child) {
      const i = this.children.indexOf(child)
      this.children.splice(i, 1)

      delete this['$'+key]

      delete child.parent
//      child.destroy()

      if (this.vnode && !this._dirty) {
        this.rerender()
      }
    }
    else {
      console.warn('try to remove not existing component')
    }

    return child
  }

  removeItem(i) {

//    console.log('remove item', i)
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
      for (let j = 0; j < this.children.length; j++) {
        let c = this.children[j]
        if (c.index > child.index) {
          c.index--
        }
      }
      // for (let j = childIndex; j < this.children.length; j++) {
      //   let c = this.children[j]
      //   if (c.index != null) {
      //     c.index--
      //   }
      // }

      delete child.parent
//      child.destroy()

      if (this.vnode && !this._dirty) {
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

  moveItem(fromIdx, toIdx) {

    // let child = null
    // let fromChildIndex = -1
    // let toChildIndex = -1
    //
    // for (let j = 0; j < this.children.length; j++) {
    //   if (this.children[j].index == fromIdx) {
    //     child = this.children[j]
    //     fromChildIndex = j
    //   }
    //   if (this.children[j].index == toIdx) {
    //     toChildIndex = j
    //   }
    // }

    const items = this.items

    let movedItem = null

    for (let i = 0; i < items.length; i++) {
      const itm = items[i]
      if (fromIdx < toIdx) {
        // смещаем вправо
        if (itm.index > fromIdx && itm.index <= toIdx) {
          itm.index--
        }
      }
      else {
        // смещаем влево
        if (itm.index >= toIdx && itm.index < fromIdx) {
          itm.index++
        }
      }
      if (itm.index == fromIdx) {
        movedItem = itm
      }
    }

    movedItem.index = toIdx
  }


  walk(callback) {
    callback(this)
    this.children.forEach(c => c.walk && c.walk(callback))
  }

  climb (callback) {
    let c = this.parent
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

    if (this.sources[i]) {
      console.warn('rebinding domain', i)
//      return // TODO есть ли ситуация, когда нужно переписать домен?
    }

    let source = null

    const o = this.options

    let key = /*(o.dynamic && o.dynamic[i]) ? o.dynamic[i]['id'] :*/ o[i+'Id']

    if (o[i+'Ref']) {
      const ref = o[i+'Ref']
      if (!this.sources[ref]) {
        this.bind(this.options.sources[ref], ref)
      }
      v = this.sources[ref]
    }

    if (typeof v === 'function') {
      v = v(o)
    }

    // if (o.dynamic) {
    //   key = o.dynamic[i+'Id'] || (o.dynamic[i] && o.dynamic[i]['id'])
    // }

    if (key != null) {
      source = (v instanceof Source) ? v.entry(key) : new (this.context.sourceType || Source)(v, null, key)
    }
    else {
      source = (v instanceof Source) ? v : new (this.context.sourceType || Source)(v)
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

    if (o.binding || o[i+'Effects'] || o[i+'Events'] || o.effects || o.sourcesBound || o[i+'Changed'] || o[i+'Methods'] || o[i+'Computed']) {
      // TODO возможно, с эффектами придется поступить так же - вспомогательная функция
      source.join(this, this.changed, null, i/*, o[i+'Effects']*/)
      if (o[i+'Methods']) {
        source.on(o[i+'Methods'], this)
      }
      if (o[i+'Computed']) {
        source.comp(o[i+'Computed'], this)
      }
      if (o[i+'Effects']) {
        for (let j in o[i+'Effects']) {
          o[i+'Effects'][j](this, source, i)
        }
      }
      if (o[i+'Events']) {
        source.on(o[i+'Events'], this)
      }
    }

    if (this.sources[i] && this.sources[i] != source) {
      this.sources[i].unjoin(this)
    }

    // else {
    //   console.log('ignore join')
    // }

    this.sources[i] = source

    this.children.forEach(child => {if (child.sources[i] == null) child.bind(source, i)})

//    this.rebind(source.get(), i, source)
  }


  // unbind(key) {
  //   this.sources[key].unjoin(this)
  // }


  changed (v, key) {

    const o = this.options

//    console.log (v, key)

    if ((v.name == 'changed' || v.name == 'preinit') && !this._destroying) {



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

      if (this._binders) {
        for (let i in this._binders) {
          const binder = this._binders[i]
          if (binder.domain == key) {
            // FIXME получение проектированных значений должно быть проще
            const src = this.sources[key]
            let propVal = null
            if (src._properties && src._properties[binder.prop]) {
              // есть свойство в модели
              const prop = src._properties[binder.prop]
              propVal = prop.project ? src.entry(binder.prop).get() : v.data[binder.prop]
            }
            else {
              propVal = binder.prop ? v.data[binder.prop] : v.data
            }
            this.opt('$'+i, binder.format ? binder.format(propVal) : propVal)
          }
        }
      }

    }
    else if (v.name == 'destroy') {
      this.tryDestroy(this.sources[key])
    }
    else if (v.name == 'init' || v.name == 'init:cancel') {
      this.tryInit(this.sources[key])
    }
    else {
//      console.log('onChange', v)
      const handlerName = 'on'+v.name[1].toUpperCase()+v.name.substr(2)
      if (o[handlerName]) {
        o[handlerName].call(this, v, this.sources)
      }
    }

    // if (o[key+'Effects']) {
    //   o[key+'Effects'].call(this, v, key)
    // }

    // if (o[key+'Events']) {
    //   o[key+'Events'].call(this, v, key)
    // }

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



  // emit (name, event) {
  //
  // }
  //
  //
  // rise (name, event) {
  //   this.climb(c => {
  //     if (c[name]) {
  //       return c[name].call(c, event)
  //     }
  //     if (c.options[name]) {
  //       return c.options[name].call(c, event)
  //     }
  //   })
  // }



  on (name, callback, scope) {
    if (scope == 'dom') {
      if (!this._domListeners) {
        this._domListeners = []
      }

      const event = {name, callback, attached: false}

      if (this.vnode && this.vnode.domNode) {
        this.vnode.domNode.addEventListener(name, callback)
        event.domNode = this.vnode.domNode
        event.attached = true
      }
      else {
//        console.log('vnode', this.vnode)
        this.props.afterCreate = (el) => {
//          console.log('enter animation')
          if (this._domListeners) {
            this._domListeners.forEach(event => {
              if (!event.attached) {
                el.addEventListener(event.name, event.callback)
                event.domNode = el
                event.attached = true
              }
              if (event.domNode != el) {
                console.warn('Missing dom event', event)
              }
            })
          }
          delete this.props.afterCreate
        }
      }

      this._domListeners.push(event)

    }
    else {
      // TODO
    }
  }


  off (name, callback, scope) {
    if (scope == 'dom') {
      if (this._domListeners) {
        for (let i = this._domListeners.length-1; i >= 0; i--) {
          let listener = this._domListeners[i]
          if (listener.name == name && (listener.callback == callback || !callback)) {
            this._domListeners.splice(i, 1)
            listener.domNode.removeEventListener(listener.name, listener.callback)
          }
        }
      }
    }
  }


  get items () {
    return this.children.filter(itm => itm.index != null)
  }

  get domain () {
    return this.sources
  }

  // rebindOpts(o, key) {
  //   for (let i in o) {
  //     this.opt(i, o[i], key)
  //   }
  // }

  // tryInit (joiningSource) {
  //
  //   if (!joiningSource) {
  //     this._initializing = true
  //
  //     this._sourcesToJoin = {...this.sources}
  //     for (let i in this.sources) {
  //
  //     }
  //   }
  //   else {
  //
  //   }
  //
  // }

  destroy () {

    for (let i in this.sources) {
      this.sources[i].unjoin(this)
//      this.unbind(i)
    }

    delete this.sources

    if (this.parent) {
      if (this.index != null) {
        this.parent.removeItem(this)
      }
      else {
        this.parent.removeComponent(this)
      }
    }
    else {
      console.error('try to destroy detached child', this)
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].destroy();
    }

    delete this.children
    delete this.layout

    this._destroyed = true

//    console.log('destroyed')

  }

  tryDestroy(unjoinedSource) {

//    console.log('try destroy', unjoinedSource)

    if (unjoinedSource) {
      if (this.isDestroying) {
        for (let i in this.sources) {
          if (this.sources[i] == unjoinedSource) {
            delete this._sourcesToUnjoin[i]
            break
          }
        }
      }
    }
    else {

      if (this.isDestroying) {
        console.warn('already destroying', this)
      }

      this._sourcesToUnjoin = {...this.sources}

      this._destroying = true

      const opts = this.options

      for (let i in this.sources) {
        const src = this.sources[i]
        // FIXME определять наличие биндинга нужно другим способом
        if (opts[i+'Changed'] || opts[i+'Effects'] || opts[i+'Events'] || opts[i+'Effectors'] || this._binders || opts.sourcesBound) {
//          this._sourcesToUnjoin[i] = src
//          console.log('destroing...', i)
          src._destroy(this)
        }
        else {
          delete this._sourcesToUnjoin[i]
        }
      }
    }

    if (this.isDestroying && Object.keys(this._sourcesToUnjoin).length == 0 /*&& this._destroying*/ && !this._destroyed) {
      delete this._destroying
      delete this._sourcesToUnjoin
      this.destroy()
    }

  }

  tryInit (joinedSource) {

    if (joinedSource) {
      if (this.isInitializing) {
        for (let i in this.sources) {
          if (this.sources[i] == joinedSource) {
            delete this._sourcesToJoin[i]
            break
          }
        }
      }
    }
    else {

      if (this.isInitializing) {
        console.warn('already initializing', this)
      }

      this._sourcesToJoin = {}

      this._initializing = true

      const opts = this.options

      this._binding_chain = []
      for (let i in this.sources) {
        if (opts[i+'Changed'] || opts[i+'Effects'] || opts[i+'Events'] || opts[i+'Effectors'] || this._binders || opts.sourcesBound) {
          this._binding_chain.push(i)
          this._sourcesToJoin[i] = this.sources[i]
        }
      }
      while (this._binding_chain.length) {
        const i = this._binding_chain.shift()
        this.sources[i]._init(this)
      }
      delete this._binding_chain

    }

    if (this.isInitializing && Object.keys(this._sourcesToJoin).length == 0 /*&& this._initializing*/) {
      delete this._initializing
      delete this._sourcesToJoin
    }

  }

  get isInitializing () {
    return !!this._sourcesToJoin
  }

  get isDestroying () {
    return !!this._sourcesToUnjoin
  }

}


export default Html
