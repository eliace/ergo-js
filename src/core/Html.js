import Options from './Options'
import {defaultFactory} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames'
import {h} from 'maquette'
import Source from './Data'


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
  _type: 'type'
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

    // привязка данных

    if (opts.data) {
      this.bind(opts.data)
    }

    // создание компонентов и элементов

    if (opts.components) {
      for (var i in opts.components) {
        this.addComponent(i, opts.components[i])
      }
    }

    if (opts.items) {
      for (var i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], i)
      }
    }


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
          this.$content.set('text', o)
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
        this.props[DEFAULT_EVENTS[i]] = (e) => o(e, this)
    //        Events.on(this, DEFAULT_EVENTS[i], o)
      }
    }



//    console.log('desc', this.constructor.optDesc)
//    console.log(opts)

  }



  render() {
    console.log('render', this)
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
        this.$content.set('text', String(v))
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
    const dataOpts = this.data == null ? null : {data: this.data}
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
    const dataOpts = this.data == null ? null : {data: this.data}
    var compOpts = new Options(this.options.defaultComponent, dataOpts, o).build(DEFAULT_RULES)
//    console.log('addComponent', o, compOpts)
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


  bind(v) {

    console.log('bind ['+this.props.key+']', v, this)

    const o = this.options

    if (o.dataId != null) {
      this.data = new Source(v, o.dataId)
    }
    else {
      this.data = (v instanceof Source) ? v : new Source(v)
    }

    this.data.join(this, this.rebind, this.unbind)

    if (this.options.dynamic) {

    }
    else {
      if (this.options.dataBinding) {
        console.log('binding', this.data.get())
        this.options.dataBinding.call(this, this.data.get(), this)
      }
    }
  }

  unbind() {
    delete this.data
  }

  rebind(v) {

    if (this.options.dynamic) {

    }
    else {
      if (this.options.dataBinding) {
        console.log('binding', this.data.get())
        this.options.dataBinding.call(this, this.data.get(), this)
      }
    }
  }

}


export default Html
