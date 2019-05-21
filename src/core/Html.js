import Options from './Options'
import {defaultFactory} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames'
import {h} from 'maquette'


const DEFAULT_RULES = {
  defaultItem: rules.Option,
  defaultComponent: rules.Option,
  // items: rules.OptionArray,
  components: rules.OptionCollection,
  as: rules.StringArray
}

const DEFAULT_EVENTS = {
  onClick: 'onclick'
}

const Html = class {

  static OPTIONS = {}

  constructor(options={}) {

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

    this.props = opts.props || {}

    this.layout = opts.layout ? defaultFactory(opts.layout, Layout) : null

    this.state = {}

//    console.log(opts)

    // инициализация свойств

    for (var i in opts) {
      var o = opts[i]

      if (this.constructor.OPTIONS[i]) {
        const desc = this.constructor.OPTIONS[i]
        if (desc.init) {
          desc.init.call(this, opts[i], opts)
        }
      }
      else if (i == 'as') {
        if (o.length) {
          this.props['class'] = classNames(this.props['class'], o.join(' '))
        }
      }
      else if (i == 'text') {
        if (opts.components && opts.components.content) {
          console.log(opts)
          opts.components.content.merge({text: o})  //FIXME
        }
        else {
          this.text = o
    //      this.$content = new Text(o)
    //      this.children.push(this.$content)
        }
      }
      else if (i == 'styles') {
        this.props['styles'] = Object.assign(this.props['styles'] || {}, o)
      }
      else if (i == 'height') {
        this.props.styles = this.props.styles || {}
        this.props.styles.height = (typeof o === 'string') ? o : o+'px'
      }
      else if (DEFAULT_EVENTS[i]) {
        this.props[DEFAULT_EVENTS[i]] = (e) => o(e, this)
    //        Events.on(this, DEFAULT_EVENTS[i], o)
      }
    }


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

    // создание компонентов и элементов

    if (opts.components) {
      for (var i in opts.components) {
        this.addComponent(i, opts.components[i])
//         var compOpts = new Options(opts.defaultComponent, opts.components[i]).build(DEFAULT_RULES)
// //        console.log('compOpts', opts.components, compOpts)
//         const comp = defaultFactory(compOpts, Html)
//         comp.props.key = i
// //        comp.index = 0
//         comp.parent = this
//         this.children.push(comp)
//         this['$'+i] = comp
      }
    }

    if (opts.items) {
      for (var i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], i)
//         let itemOpts = new Options(opts.defaultItem, opts.items[i]).build(DEFAULT_RULES)
//         const item = defaultFactory(itemOpts, Html)
//         item.key = ''+i
// //        item.index = i
//         item.parent = this
//         this.children.push(item)
      }
    }




//    console.log('desc', this.constructor.optDesc)
//    console.log(opts)

  }



  render() {
//    console.log('render', this)
    if (this.children.length) {
      if (this.layout == null) {
        this.layout = defaultFactory(this.options.layout, Layout)
      }
      this.vnode = this.vnode || this.layout.render(this)
    }
    else {
      this.vnode = this.vnode || h(this.html, this.props, [this.text])
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

  opt(name, v) {

    if (this.options[name] == v) {
      return this
    }

    this.options[name] = v

    if (name == 'text') {
      if (this.$content) {
        this.$content.set('text', v)
      }
      else {
        this.text = v
        // this.$content = new Text(v)
        // this.children.push(this.$content)
      }
    }
    else if (name == 'html') {
      this.html = v
    }
    else if (this.constructor.descriptors[name]) {
      const desc = this.constructor.descriptors[name]
      if (desc.set) {
        desc.set.call(this, v)
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
    let itemOpts = new Options(this.options.defaultItem, o).build(DEFAULT_RULES)
//    console.log('add', o, itemOpts)
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
    item.props.key = 'item-'+i
    item.index = i
    item.parent = this

    if (this.vnode) {
      this.rerender()
    }

    return item
  }

  addComponent(i, o) {
    if (this['$'+i]) {
      this.removeComponent(i)
    }
    var compOpts = new Options(this.options.defaultComponent, o).build(DEFAULT_RULES)
//    console.log('set', o, compOpts)
    const comp = defaultFactory(compOpts, (typeof o === 'string') ? Text : Html)
    this.children.push(comp)
    comp.props.key = i
//        comp.index = 0
    comp.parent = this
    this['$'+i] = comp

    if (this.vnode) {
      this.rerender()
    }

    return comp
  }

  removeComponent(key) {
    let child = (typeof key === 'object') ? key : this['$'+key]

    if (child) {
      this.children.remove(child)
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

    if (this.vnode) {
      this.rerender()
    }

    return child
  }

  removeItem(i) {
    // TODO
  }


  set(i) {
    this.state[i] = true
//    this.props.class = classNames(this.props.class, i)
    this.props.classes = this.props.classes || {}
    this.props.classes[i] = true

    if (this.vnode) {
      this.rerender()
    }
  }

  unset(i) {
    delete this.state[i]
    this.props.class = classNames(this.props.class, {i: false})

    if (this.vnode) {
      this.rerender()
    }
  }

  toggle(i) {
    this.state[i] ? unset(i) : set(i)
  }

  is(i) {
    return this.state[i]
  }

}

Html.prototype.optDesc = {
  aaa: {}
}


export default Html
