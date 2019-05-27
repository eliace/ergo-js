import Options from './Options'
import {defaultFactory, deepClone} from './Utils'
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
  // items: rules.OptionArray,
  components: rules.OptionCollection,
  as: rules.StringArray,
  data: rules.Overlap
}

const DEFAULT_EVENTS = {
  onClick: 'onclick'
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
  innerHTML: true,
  method: true,
  name: true,
  placeholder: true,
  readOnly: true,
  rel: true,
  spellcheck: true,
  src: true,
  srcset: true,
  styles: true,
  tabIndex: true,
  target: true,
  title: true,
  value: true,
  _type: 'type',
  key: true
}






const Html = class {

  static OPTIONS = {}

  constructor(options={}, context) {

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
        extOpts['components'][compKey] = o
      }
    }

    opts = new Options(opts, extOpts).build(DEFAULT_RULES)

    this.options = opts


    this.sources = {}

    // if (context) {
    //   for (let i in context) {
    //     console.log('global', i)
    //     this.bind(source, i)
    //   }
    // }

    if (opts.sources) {
      for (let i in opts.sources) {
//        console.log('local', i)
        this.bind(opts.sources[i], i)
      }
    }

    this.dynamicItems = false
    this.dynamicComponents = false
    for (let i in this.sources) {
      if (opts[i+'BindingItems']) {
        this.dynamicItems = true
      }
      if (opts[i+'BindingComponents']) {
        this.dynamicComponents = true
      }
    }
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

      if (this.constructor.OPTIONS[i]) {
        const desc = this.constructor.OPTIONS[i]
        if (desc.set) {
          desc.set.call(this, opts[i], this)
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


    // применяем биндинг элементов и компонентов
    for (let i in this.sources) {
      if (opts[i+'BindingItems'] || opts[i+'BindingComponents']) {
        this.rebind(this.sources[i].get(), i, this.sources[i])
      }
    }
    // применяем биндинг опций
    for (let i in this.sources) {
      if (opts[i+'Binding']) {
        this.rebind(this.sources[i].get(), i, this.sources[i])
      }
    }

//    console.log('desc', this.constructor.optDesc)
//    console.log(opts)

  }


  render() {
//    console.log('render', !!this.vnode, this.children.length, this)
    if (this.children.length) {
      if (this.layout == null) {
        this.layout = defaultFactory(this.options.layout, Layout)
      }
      this.vnode = this.vnode || this.layout.render(this.html, deepClone(this.props), this.children)
    }
    else {
      this.vnode = this.vnode || h(this.html, deepClone(this.props), [this.text])
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

  opt(name, v) {

    // if (name && name.constructor === Object) {
    //   this.options = {...this.options, ...name}
    // }

    if (this.options[name] == v) {
      return this
    }

//    console.log('opt', name, v)

    this.options[name] = v

    if (name == 'text') {
      if (this.$content) {
        this.$content.opt('text', String(v))
      }
      else {
        this.text = String(v)
      }
      this.options[name] = String(v)
    }
    else if (name == 'html') {
      this.html = v
    }
    else if (name == 'as') {
      if (v.length) {
        this.props['class'] = classNames(this.props['class'], v.join(' '))
      }
    }
    // else if (name == 'key') {
    //   this.props.key = v
    // }
    else if (this.constructor.OPTIONS[name]) {
      const desc = this.constructor.OPTIONS[name]
      if (desc.set) {
        desc.set.call(this, v)
      }
    }
    else if (HTML_OPTIONS[name] === true) {
      this.props[name] = v
    }
    else if (HTML_OPTIONS[name]) {
      this.props[HTML_OPTIONS[name]] = v
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
    let itemOpts = new Options(this.options.defaultItem, dataOpts, o).build(DEFAULT_RULES)
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
//     let dataOpts = this.data == null ? null : {data: this.data}
//     if (this.state) {
//       dataOpts = {...dataOpts, state: this.state}
// //      console.log(i, dataOpts)
//     }
    const dataOpts = {sources: this.sources}
    var compOpts = new Options(this.options.defaultComponent, dataOpts, o).build(DEFAULT_RULES)
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
    }
    else {
      let removed = false
      for(let i = 0; i < this.children.length; i++) {
        let c = this.children[i]
        if (c.index == key) {
          child = c
          this.children.remove(c)
          removed = true
        }
        else if (removed && c.index) {
          c.index--
        }
      }
    }

    delete this['$'+key]

    if (this.vnode) {
      this.rerender()
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
      this.sources[i].unjoin()
    }
    // if (this.data) {
    //   this.data.unjoin(this)
    // }
    // if (this.state) {
    //   this.state.unjoin(this)
    // }
  }

  // removeAllComponents() {
  //   for (let i = this.children.length-1; i >= 0; i--) {
  //     let child = this.children[i]
  //     if (child)
  //   }
  // }


//   set(i) {
//     this.state[i] = true
// //    this.props.class = classNames(this.props.class, i)
//     this.props.classes = this.props.classes || {}
//     this.props.classes[i] = true
//
//     if (this.vnode) {
//       this.rerender()
//     }
//   }
//
//   unset(i) {
//     delete this.state[i]
//     this.props.class = classNames(this.props.class, {i: false})
//
//     if (this.vnode) {
//       this.rerender()
//     }
//   }
//
//   toggle(i) {
//     this.state[i] ? unset(i) : set(i)
//   }
//
//   is(i) {
//     return this.state[i]
//   }


//   bind(v) {
//
// //    console.log('bind ['+this.props.key+']', v, this)
//
//     const o = this.options
//
//     if (o.dataId != null) {
//       this.data = new Source(v, o.dataId)
//     }
//     else {
//       this.data = (v instanceof Source) ? v : new Source(v)
//     }
//
//     this.data.join(this, this.rebind, this.unbind)
//
//     this.children.forEach(child => {if (child.data == null) child.bind(this.data)})
//
//     this.rebind()
//
// //     if (this.options.dynamic) {
// //       this.data.stream((entry, i) => {
// // //        console.log(i, entry)
// //         this.addItem({data: entry}, i)
// //       })
// //     }
// //     else {
// //       if (this.options.dataBinding) {
// // //        console.log('binding', this.data.get())
// //         this.options.dataBinding.call(this, this.data.get(), this)
// //       }
// //     }
//   }
//
//   unbind() {
//     delete this.data
//   }
//
//   rebind(v) {
//
//     const o = this.options
//
//     if (o.dynamic) {
//         this.data.stream((entry, i) => {
//           this.addItem({data: entry}, i)
//         })
//     }
//     else {
//       if (o.bindings && o.bindings.data) {
// //        console.log('binding', this.data.get())
//         o.bindings.data.call(this, this.data.get(), this)
//       }
//     }
//   }
//
//
//   bindState(v) {
//
//     if (v == null) {
//       return
//     }
//
//     const o = this.options
//
//     if (o.stateId != null) {
//       this.state = new Source(v, o.stateId)
//     }
//     else {
//       this.state = (v instanceof Source) ? v : new Source(v)
//     }
//
//     this.state.join(this, this.rebindState)
//
//     this.children.forEach(child => {if (!child.state) child.bindState(this.state)})
//
//     this.rebindState()
//   }
//
//   rebindState(newState) {
//
// //    console.log('rebind state', this.options, this.state.get())
//
//     const o = this.options
//
//     if (o.dynamic) {
//       this.removeAllItems()
//       this.state.each((entry, i) => {
// //        console.log(i, entry.get(), o.items)
//         if (Array.isArray(this.state.get())) {
// //          console.log('array', i, entry.get())
//           if (o.items && o.items[i]) {
//             const s = entry.get()
// //            console.log(i, s)
//             if (s) {
//             }
//             this.addItem(new Options({state: entry}, o.items[i]), i)
//           }
//         }
//         else {
//           if (o.components && o.components[i]) {
//             const s = entry.get()
//   //          console.log('substate', i, s)
//             if (s && !this['$'+i]) {
//               this.addComponent(i, new Options({state: entry}, o.components[i]))
//             }
//             else if (!s && this['$'+i]) {
//               this.removeComponent(i)
//             }
//           }
//         }
//       })
//
// //       const state = newState
// //       for (let i in state) {
// //         if (o.components && o.components[i]) {
// //           if (state[i] && !this['$'+i]) {
// // //            const subState = new State(state[i], this.state.parent || this.state)
// // //            console.log('sub state', state[i])//, this.state.parent || this.state)
// //             this.addComponent(i, new Options(new State(state[i]), o.components[i]))
// //           }
// //          else if (!state[i] && this['$'+i]) {
// //            this.removeComponent(i)
// //          }
// //         }
// //       }
//     }
//     else {
//       if (o.stateBinding) {
// //        console.log('state binding', this.options, this.state.get())
//
// //        let state = (o.stateId != null) ? newState[o.stateId] : newState
// //        console.log('state', newState)
//         o.stateBinding.call(this, this.state.get(), this)
//       }
//     }
//   }


  bind(v, i) {

//    console.log('bind', i, v)

    if (v == null) {
      return
    }

    let source = null

    const o = this.options

    const key = i+'Id'

    if (o[key] != null) {
      source = (v instanceof Source) ? v.entry(o[key]) : new Source(v, o[key])
    }
    else {
      source = (v instanceof Source) ? v : new Source(v)
    }

    if (o[i+'Id'] || o[i+'Binding'] || o[i+'BindingItems'] || o[i+'BindingComponents'] || o.binding) {
      source.join(this, this.rebind, this.unbind, i)
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

  rebind(v, key, source) {
    const o = this.options

//    console.log('rebind', v, key, source)
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
      if (o[key+'BindingItems']) {
        o[key+'BindingItems'].call(this, v, key, source)
      }
      if (o[key+'BindingComponents']) {
        o[key+'BindingComponents'].call(this, v, key, source)
      }
      if (o[key+'Binding']) {
        o[key+'Binding'].call(this, v, key, source)
      }
      if (o.binding) {
        o.binding.call(this)
      }
//    }

  }

  unbind() {

  }

}


export default Html
