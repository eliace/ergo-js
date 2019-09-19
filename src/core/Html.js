import Options from './Options'
import {defaultFactory, deepClone, buildProp, hashCode, Binder, reconcile, createOptionsProto} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames/dedupe'
//import {h} from 'maquette'
//import Domain from './Domain'
import Source from './Source'
//import State from './State'
import Context from './Context'
import Config from './Config'

const ComponentRules = {
  defaultItem: rules.Option,
  defaultComponent: rules.Option,
  defaultComponents: rules.OptionCollection,
  // items: rules.OptionArray,
  components: rules.OptionCollection,
//  as: rules.StringArray,
  css: rules.StringArray,
//  data: rules.Overlap,
  '$': rules.Option
}



const ComponentOptions = {

  // настройка компонента
  base: true,
  options: true,
  mixins: true,

  // управление отрисовкой
  text: true,
  as: true,
  css: true,
  styles: true,
  classes: true,
  props: true,
  html: true,
  layout: true,
  render: true,

  // управление деревом компонентов
  components: {mutable: true},
  items: {mutable: true},

  // настройка подключения к данным
  sources: true,

  // производные опции
  itemFactory: true,
  componentFactory: true,
  defaultItem: true,
  defaultComponent: true,
  allBound: true,
  anyChanged: true,
  allJoined: true,
  use: true,
  join: true
}

// реакции вида *Changed
// события on*
// параметры *Id, *Ref


function initClassOpts (proto) {
  const chain = []
  const opts = []

  let cls = proto

  while (cls && cls.constructor !== Object) {
    // if (cls.config) {
    //   console.log('defaults', cls, cls.config())
    // }
    chain.push(cls.defaultOpts || cls.constructor.defaultOpts || (cls.config && cls.config()))
    opts.push((cls.options && cls.options()) || (cls.configOptions && cls.configOptions()))
    cls = Object.getPrototypeOf(cls)
  }

  let classOpts = new Options()

  for (let i = chain.length-1; i >= 0; i--) {
    // добавляем только в том случае, когда опции не наследуются
    if (chain[i] != chain[i+1]) {
      classOpts.merge(chain[i])
    }
  }

  proto.classDefaults = classOpts.build(ComponentRules)

  classOpts = {}

  for (let i = opts.length-1; i >= 0; i--) {
    // добавляем только в том случае, когда опции не наследуются
    if (opts[i] && opts[i] != opts[i+1]) {
      Object.assign(classOpts, opts[i])
    }
  }

  proto.classOptions = classOpts

  // создаем прототип для опций класса
  proto.classOptsProxy = createOptionsProto({...Config.HTML_OPTIONS, ...ComponentOptions, ...classOpts})
}




class Html{

//  static OPTIONS = {}

  constructor(options={}, context) {

    try {

    var proto = Object.getPrototypeOf(this)

    //  собираем опции класса, если они еще не собраны
    if (!proto.hasOwnProperty('classDefaults')) {
      initClassOpts(proto)
    }

    let opts = new Options(this.classDefaults, options).build(ComponentRules)

    this.html = opts.html || 'div'

    this.children = []

    this.props = opts.props || {}// {classes: {}, styles: {}}

    this.layout = opts.layout

    this.context = context || {}
//    this.context = context || new Context()

    // 1. Примешиваем опции

    const preparedOpts = new Options(opts)//, extOpts)

    // применяем опции этапа mix
    for (var i in opts) {
      if (this.classOptions[i]/* || this.constructor.OPTIONS[i]*/) {
        const desc = this.classOptions[i]/* || this.constructor.OPTIONS[i]*/
        if (desc.mix) {
          desc.mix.call(this, opts[i], preparedOpts)
        }
      }
    }

    // применяем примеси
    if (opts.mixins) {
//      for (let i = 0; i < opts.mixins.length; i++) {
      for (let i in opts.mixins) {
        let mixinOpts = opts.mixins[i].call(this, preparedOpts)
        if (mixinOpts) {
          preparedOpts.merge(mixinOpts)
        }
      }
    }

    // завершаем конструирование опций
    opts = preparedOpts.build(ComponentRules)

    // прокси-хелпер для опций
    this.opts = {__target: this}

    Object.setPrototypeOf(this.opts, this.classOptsProxy)

    if (opts.options) {
      const instOptProto = createOptionsProto(opts.options)
      Object.setPrototypeOf(instOptProto, this.classOptsProxy)
      Object.setPrototypeOf(this.opts, instOptProto)
    }

    this.options = opts

    this._internal = {
      html: this.html,
      props: this.props,
      children: this.children,
      options: this.options,
      context: this.context
    }

    // if (('base' in this.options) && this.options.base == null) {
    //   console.error('Missing base in', this.options)
    // }

    if (opts.dom) {
      for (let i in opts.dom) {
        this.use(opts.dom[i])
      }
    }

    // 2. Подключаем домены

    this.sources = {}

    const sources = {...this.context, ...opts.sources}

    if (sources) {
      for (let i in sources) {
    //        console.log('local', i)
        this.bind(sources[i], i)
      }
      if (opts.allBound || opts.allJoined) {
        for (let i in this.sources) {
          if (this.sources[i]._key) {
//            this.sources[i]._key.push(i)
            console.error('Simultaneous source joints', i, this.sources[i])
            throw new Error('Simultaneous source joints')
          }
//          else {
          this.sources[i]._key = i
//          }
        }
        (opts.allBound || opts.allJoined).call(this, this.sources)
        for (let i in this.sources) {
          delete this.sources[i]._key
        }
      }
    }



    // 3. Создаем статические компоненты и элементы

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
    }

    if (opts.items) {
      for (var i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], i)
      }
    }



    // 4. Применяем свойства этапа init

    for (var i in opts) {
      const o = opts[i]

      if (o instanceof Binder) {
        if (!this._binders) {
          this._binders = {}
        }
        this._binders[i] = o

        const source = this.sources[o.key]
        if (!source.observedBy(this)) {
          source.observe(this, this.changed, o.key)
        }
        continue
      }

      if (opts.options && opts.options[i]) {
        const desc = opts.options[i]
        if (desc.init) {
          desc.init.call(this, opts[i])
        }
        else if (desc.initOrSet) {
          desc.initOrSet.call(this, opts[i])
        }
      }
      else if (this.classOptions[i]/* || this.constructor.OPTIONS[i]*/) {
        const desc = this.classOptions[i]/* || this.constructor.OPTIONS[i]*/
        if (desc.init) {
          desc.init.call(this, opts[i])
        }
        else if (desc.initOrSet) {
          desc.initOrSet.call(this, opts[i])
        }
      }
      else if (i == 'css') {
        if (o.length) {
          this.props.className = classNames(this.props.className, o.join(' '))
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
      else if (i == 'height') {
        this.props.style = this.props.style || {}
        this.props.style.height = (typeof o === 'string') ? o : o+'px'
      }
      else if (i == 'width') {
        this.props.style = this.props.style || {}
        this.props.style.width = (typeof o === 'string') ? o : o+'px'
      }
      else if (i == 'styles') {
        this.props.style = this.props.style || {}
        Object.assign(this.props.style, o)
      }
      else if (i == 'classes') {
        this.props.className = classNames(this.props.className, o)
      }
      else if (Config.HTML_OPTIONS[i] === true) {
        this.props[i] = o
      }
      else if (Config.HTML_OPTIONS[i]) {
        this.props[Config.HTML_OPTIONS[i]] = o
      }
      else if (Config.HTML_EVENTS[i]) {
        this.props[Config.HTML_EVENTS[i]] = /*o.bind(this)*/ (e) => o.call(this, e, this.sources)
      }
    }

    // 5. Синхронизируем компонент с доменами

    this.tryInit()

    // - sources [i]
    // - allBound [i]
    // - anyChanged [i]
    // - use [i]

    // - base [i]
    // - options [i]
    // - mixins [i]

    // - components [i, s]
    // - items [i, s]
    // - layout [i, s]
    // - itemFactory [i, s]
    // - componentFactory [i, s]

    // - text [i, s]
    // - as [i, s]
    // - props [i, s]
    // - html [i, s]

    // defaultItem
    // defaultComponent
    // реакции вида *Changed
    // события on*
    // параметры *Id, *Ref

      if (Config.DEV) {
        this._internal.props._owner = this /*{
          type: this.constructor.name
        }*/
      }

    }
    catch (err) {
      console.error(err)
      throw err
    }
  }


  render() {

    const o = this.options

//    console.log('render', !!this.vnode, this.children.length, this)
    if ('render' in o) {
      let render = o.render
      if (typeof render === 'function') {
        render = render.call(this, o)
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

    if (this.children.length || this.layout) {
      let layout = this.layout
      if (this.layout == null || this.layout === true) {
        layout = Layout.sorted // или брать из Config?
      }
      if (this.text) {
        if (this._dirty || !this.vnode) {
          this.vnode = layout(this.html, deepClone(this.props), [...this.children, new Text(this.text)])
        }
      }
      else {
        if (this._dirty || !this.vnode) {
          this.vnode = layout(this.html, deepClone(this.props), [...this.children])
        }
      }
    }
    else if(this.text || this.props.value) {
      if (this._dirty || !this.vnode) {
        this.vnode = Config.Renderer.h(this.html, deepClone(this.props), this.text ? [this.text] : null)
      }
    }
    else if (o.renderIfEmpty !== false) {
      if (this._dirty || !this.vnode) {
        this.vnode = Config.Renderer.h(this.html, deepClone(this.props))
      }
    }

    delete this._dirty

    return this.vnode
  }

  // child(path) {
  //
  //   if (typeof path === 'string') {
  //     path = path.split('.')
  //   }
  //
  //   let key = path.shift()
  //   for (let i = 0; i < this.children.length; i++) {
  //     let c = this.children[i]
  //     if (c.props.key == key) {
  //       return path.length ? c.child(path) : c
  //     }
  //   }
  //
  //   return null
  // }
  //
  // item(index) {
  //   for (let i = 0; i < this.children.length; i++) {
  //     let c = this.children[i]
  //     if (c.index == index) {
  //       return c
  //     }
  //   }
  //   return null
  // }

  rerender() {
    if (!this._dirty && !Config.Renderer.scheduled) {
      Config.Renderer.schedule()
//      this.context.projector.scheduleRender()
    }
    let c = this
    while (c && c.vnode && !c._dirty) {
      c._dirty = true
//      delete c.vnode
      c = c.parent
    }
  }

  opt(name, value, key) {

    // GETTER
    if (arguments.length == 1) {
      // get
      if (this._binding_chain) {
        while (this._binding_chain.length) {
          const i = this._binding_chain.shift()
          this.sources[i]._init(this, i)
//          this.sources[i].emit('init', {target: this})//, null, this)
          // const o = this.options[i+'Changed'].call(this, this.sources[i].get(), this.sources[i], i)
          // for (let j in o) {
          //   this.opt(j, o[j])
          // }
        }
      }
      return this.options[name]
    }

    // SETTER

    let keys = [name]
    let values = value
    let isObject = false

    if (name instanceof Options) {
      name = name.build(ComponentRules)
    }

    if (name && typeof name === 'object'/*name.constructor === Object*/) {
      keys = Object.keys(name)
      isObject = true
      key = value
      values = name
    }

    for (let i = 0; i < keys.length; i++) {
      name = keys[i]
      value = isObject ? values[name] : values

      const oldValue = this.options[name]
      const o = this.options

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

    if (oldValue == value) {
      if (this.classOptions[name] && this.classOptions[name].mutable !== true) {
        console.warn('Ignore option ['+name+']', value)
        continue
      }
    }


//    console.log('opt', name, v)

//    if (name[0] != '$' && name[name.length-1] != '!') {
      // FIXME заменить нормальным слиянием
      if (value instanceof Source || value instanceof Source.Stream) {
        o[name] = value
      }
      else if (value && (value.constructor === Object || ComponentRules[name])) {
//        if (o[name] != null) {
//          o[name] = buildProp(o[name], value, ComponentRules[name]) //TODO ?
          const p = buildProp(null, value, ComponentRules[name]) // TODO
          o[name] = o[name] ? Object.assign(o[name], p) : p
//          value = o[name]
//          Object.assign(this.options[name], value)
//        }
//        else {
//          o[name] = value
//        }
      }
      else {
        o[name] = value
      }
    // }
    // else if (name[0] == '$') {
    //   name = name.substr(1)
    // }
    // else {
    //   name = name.substr(0, name.length-1)
    // }

    if (o.options && o.options[name]) {
      const desc = o.options[name]
      if (desc.set) {
        desc.set.call(this, value, oldValue)
      }
      else if (desc.initOrSet) {
        desc.initOrSet.call(this, value, oldValue)
      }
    }
    else if (this.classOptions[name]/* || this.constructor.OPTIONS[name]*/) {
      const desc = this.classOptions[name]/* || this.constructor.OPTIONS[name]*/
      if (desc.set) {
        desc.set.call(this, value, oldValue)
      }
      else if (desc.initOrSet) {
        desc.initOrSet.call(this, value, oldValue)
      }
    }
    else if (name == 'text') {
      if (this.$content) {
        this.$content.opt('text', value)
      }
      else {
        this.text = value != null ? String(value) : value
      }
//      this.options[name] = String(v)
    }
    else if (name == 'html') {
      this.html = value
    }
    else if (name == 'css') {
      if (value.length) {
        this.props['className'] = classNames(this.props['className'], value.join(' '))
      }
    }
    else if (name == 'classes') {
      this.props['className'] = classNames(this.props['className'], value)
    }
    else if (i == 'styles') {
      this.props.style = this.props.style || {}
      Object.assign(this.props.style, value)
    }
    else if (name == 'items') {
      if (this._modify_items) {
        console.warn('items overchange', value)
      }
      else {
        this._modify_items = true
        this.syncItems(value, key)
        delete this._modify_items
      }
    }
    else if (name == 'components') {
      if (this._modify_components) {
        console.warn('components overchange', value)
      }
      else {
        this._modify_components = true
        this.syncComponents(value, key)
        delete this._modify_components
      }
    }
    else if (Config.HTML_OPTIONS[name] === true) {
      this.props[name] = value
    }
    else if (Config.HTML_OPTIONS[name]) {
      this.props[Config.HTML_OPTIONS[name]] = value
    }
  }

    if (this.vnode && !this._dirty) {
      this.rerender()
    }
    return this
  }

  addItem(value, i, key) {

    const o = this.options

    if (o.defaultItem && typeof value === 'string') {
      value = {text: value}
    }
//     let dataOpts = this.data == null ? null : {data: this.data}
//     if (this.state) {
//       dataOpts = {...dataOpts, state: this.state}
// //      console.log(i, dataOpts)
//     }
//    const dataOpts = {sources: this.sources}
    let itemOpts = new Options(/*dataOpts,*/ o.defaultItem, value).build(ComponentRules)
//    console.log('addItem', o, itemOpts)

    if (!itemOpts) {
      return
    }

    const item = defaultFactory(itemOpts, (typeof itemOpts === 'string') ? Text : Html, this.sources)
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
    item.props.key = o.key || key// 'item-'+i+'-'+Math.random().toString(16).slice(2)
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

  addComponent(i, value, stream) {

    const o = this.options

    if (this['$'+i]) {
      console.log('removing', i)
//      this['$'+i].destroy()
      this.removeComponent(i)
    }

    let comp = value

    if (!(value instanceof Html)) {

      if ((o['$'+i] || o.defaultComponent) && typeof value === 'string') {
        value = {text: value}
      }

      // TODO сделать корректную обработку строковых опций

      // if ((this.options.defaultComponent || this.options.components[i]) && typeof o === 'string') {
      //   o = {text: o}
      // }

      const context = stream ? {...this.sources, ...stream} : this.sources

  //     let dataOpts = this.data == null ? null : {data: this.data}
  //     if (this.state) {
  //       dataOpts = {...dataOpts, state: this.state}
  // //      console.log(i, dataOpts)
  //     }
  //    const dynamicComponent = this.options.dynamicComponents && this.options.dynamicComponents[i]
      let compOpts = new Options(/*{sources: this.sources},*/ o.defaultComponent, o['$'+i], value).build(ComponentRules)

      if (!compOpts) {
        return
      }

      if (compOpts instanceof Promise) {
        compOpts.then(c => {
          this.addComponent(i, defaultFactory(c, (typeof c === 'string') ? Text : Html, context))
        })
        return
      }

  //    console.log('addComponent', o, compOpts)
      comp = defaultFactory(compOpts, (typeof compOpts === 'string') ? Text : Html, context)
    }

    this.children.push(comp)
    comp.props.key = i
//        comp.index = 0
    comp.parent = this
    this['$'+i] = comp

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

  removeAllComponents () {
    // TODO
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


  syncItems (value, key) {
//    const o = this.options.__raw

    if (typeof value == 'string') {
      key = value
      value = this.sources[key]
    }
    if (value instanceof Source) {
      value = value.$stream()
    }
    if (value instanceof Source.Stream) {

      key = value.key || key

//          const idResolver = o[key+'EntryId']

      let items = this.items//.filter(itm => !itm._destroying) //?
  //    console.log(items.length, this.children.length)
      let add = {}
      let update = []
      const entriesByKeys = {}

      const prevIds = this.items.map(itm => {return {i: itm.index, k: itm.props.key, itm}})
      const nextIds = []

      value.entries((entry, idx, v, k) => {
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
      })

//      console.log(prevIds, nextIds)

      const reconcileResult = reconcile(prevIds, nextIds)

//      console.log('reconcile', reconcileResult)

      reconcileResult.moves.forEach(move => {
        this.moveItem(move.i, move.to)
      })

      reconcileResult.updated.forEach(upd => {
        if (upd.itm.isDestroying) {
          delete upd.itm._destroying
          delete upd.itm._sourcesToUnjoin
          upd.itm.tryInit()
        }
      })

//      console.log('update items', update)
//      console.log('[reconcile] update items', reconcileResult.updated)

//      console.log('remove items', items)
//      console.log('[reconcile] remove items', reconcileResult.deleted)

//          items.forEach(item => this.removeItem(item))
      items.forEach(itm => {
        if (itm.isInitializing) {
          console.warn('try to destroy initializing item', itm)
        }
        if (!itm.isDestroying) {
          itm.tryDestroy()
        }
      })

//      console.log('add items', add)
//      console.log('[reconcile] add items', reconcileResult.added)

      Object.keys(add).forEach(k => {
        let entry = add[k]
        this.addItem({sources: {[key]: entry}}, Number(entry.id), k)
      })

//      console.log('result items', this.items)


    }
    else {
      this.removeAllItems()
      for (let i = 0; i < value.length; i++) {
        this.addItem(value[i])
      }
    }

  }



  syncComponents (value, key) {
    const o = this.options

    if (typeof value == 'string') {
      console.error('Invalid components value', value)
      key = value
      value = this.sources[key]
    }
    else if (typeof value == 'function') {
      console.error('Invalid components value', value)
      value = value()
    }

    if (value instanceof Source) {
      value = value.get()
    }

    if (value instanceof Source.Stream) {
      // const data = value.get()
      // if (data) {
      //   for (let i in data) {

      const k = value.key

      value.entries((entry, i, s) => {
//                console.log(i, s)
//        if (o['$'+i]) {
//                  const s = data[i]
          if (s && !this['$'+i]) {
            this.addComponent(i, {}, {[k]: entry})
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
          else if (s && this['$'+i]._internal.context[k] != entry) {
            console.warn('Child context overriding', this['$'+i]._internal.context[k], entry) // TODO может иммет смысл контекс копировать при создании компонента
            this['$'+i]._internal.context = {...this['$'+i]._internal.context, [k]: entry}
            this['$'+i].context = this['$'+i]._internal.context
            this['$'+i].bind(entry, k)
            this['$'+i].tryInit()
          }
          else if (!s && this['$'+i]) {
            if (this['$'+i].isInitializing) {
              console.warn('try to destroy initializing component', this['$'+i])
            }
            this['$'+i].tryDestroy()
//                  this.removeComponent(i)
            console.log('remove component', i)
          }
//        }
      })
//            }
//          }

    }
    else {
      for (let i in value) {
        if (o['$'+i]) {
          const s = value[i]
          if (s && !this['$'+i]) {
            this.addComponent(i, s)
          }
          else if (s && this['$'+i]) {
            this['$'+i].opt(s, null) // !!!
          }
          else if (!s && this['$'+i]) {
//            debugger
            this['$'+i].tryDestroy()
          }
        }
      }
      // this.components.forEach(c => {
      //   if () {//}!(c.props.key in value)) {
      //     this.removeComponent(c)
      //   }
      // })
    }
  }



  bind (v, i) {

//    console.log('bind', i, v)

    if (v == null) {
      return
    }

    if (this.sources[i]) {
      console.warn('rebinding source', i)
//      return // TODO есть ли ситуация, когда нужно переписать домен?
    }

    let source = null

    const o = this._internal.options

    let key = o[i+'Id']
    let ref = o[i+'Ref']

    if (typeof v === 'function') {
      v = v(o, this.context, i)
    }
    else if (ref) {
      if (!this.sources[ref]) {
        this.bind(o.sources[ref], ref)
      }
      v = this.sources[ref]
    }

    if (v == null) {
      console.warn('Source '+i+' ignored')
      return
    }


    if (key != null) {
      if (Array.isArray(key)) {
        if (v instanceof Source) {
          source = v
          for (let j = 0; j < key.length; j++) {
            source = source.$entry(key[j])
          }
        }
        else {
          console.log('Composite id not supported for non source value', key, v)
        }
      }
      else {
        source = (v instanceof Source) ? v.$entry(key) : new (Config.defaultSource)(v, null, key)
      }
    }
    else {
      source = (v instanceof Source) ? v : new (Config.defaultSource)(v)
    }


    // если домен уже подключен, повторно не подключаем
    if (source == this.sources[i]) {
      console.warn('Try to bind same source '+i)
      return
    }


    // решаем, подключаться ли к домену
    if (o.anyChanged || (o.join && o.join[i]) || o.allBound || o.allJoined || o[i+'Changed'] || o[i+'Bound'] || o[i+'Joined']) {
      // TODO возможно, с эффектами придется поступить так же - вспомогательная функция
      source.observe(this, this.changed, i/*, o[i+'Effects']*/)

      if (o.join && o.join[i]) {
        for (let j in o.join[i]) {
          o.join[i][j](source, this, i)
        }
      }

      if (o[i+'Bound'] || o[i+'Joined']) {
        (o[i+'Bound'] || o[i+'Joined']).call(this, source)
      }

    }

    if (this.sources[i]) {
      this.sources[i].unobserve(this)
    }

    // else {
    //   console.log('ignore join')
    // }

    const oldSource = this.sources[i]

    this.sources[i] = source

    this.children.forEach(child => {if (child.sources[i] == oldSource) child.bind(source, i)})

//    this.rebind(source.get(), i, source)
  }


  // unbind(key) {
  //   this.sources[key].unjoin(this)
  // }


  changed (v, subscription) {

    if (subscription.channels.length > 1) {
      console.warn('Multisubscription found', subscription)
    }

    const key = subscription.channels[0]

    const o = this.options

//    console.log (v, key)

    if ((v.name == 'changed'/* || v.name == 'preinit'*/) && !this._destroying) {

      if (o[key+'Changed']) {
        const dynOpts = o[key+'Changed'].call(this, v.data, key, this.sources[key])
        if (dynOpts) {
          this.opt(dynOpts, key)
          // for (let j in dynOpts) {
          //   this.opt(j, dynOpts[j], key)
          // }
        }
      }

      if (o.anyChanged) {
        v = {}
        for (let i in this.sources) {
          v[i] = /*this.sources[i].cache != null ? this.sources[i].cache :*/ this.sources[i].get()
        }
        const bindOpts = o.anyChanged.call(this, v, key)
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
          if (binder.key == key) {
            // FIXME получение проектированных значений должно быть проще
            const src = this.sources[key]
            let propVal = null
            if (src._properties && src._properties[binder.prop]) {
              // есть свойство в модели
              const prop = src._properties[binder.prop]
              propVal = prop.calc ? src.$entry(binder.prop).get() : v.data[binder.prop]
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
      const handlerName = 'on'+v.name[0].toUpperCase()+v.name.substr(1)
      if (o[handlerName]) {
        o[handlerName].call(this, v, this.sources)
      }
    }

  }



  on (name, callback, scope) {
    throw new Error('Deprecated method on')
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
    throw new Error('Deprecated method off')
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


  use (on) {
    const _in = this._internal
    if (!_in.uses) {
      _in.uses = []
    }
    //FIXME подключение к жц через ref специфично
    if (!_in.props.ref) {
      _in.props.ref = (el) => {
        if (el) {
          console.log('MOUNT')
          for (let i in _in.uses) {
            const u = _in.uses[i]
            if (!u.used) {
              u.off = u.on.call(this, el)
            }
          }
        }
        else {
          for (let i in _in.uses) {
            const u = _in.uses[i]
            if (u.off) {
              u.off.call(this)
            }
            delete u.used
          }
        }
        _in.el = el
      }
    }
    if (_in.el) {
      const off = on.call(this, _in.el)
      if (off) {
        _in.uses.push({off})
      }
    }
    else {
      _in.uses.push({on})
    }
  }


  eff (callback) {
    const _in = this._internal
    if (!_in.uses) {
      this.use(callback)
    }
    else {
      Config.Renderer.effect(() => {
        callback(_in.el)
      })
    }
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
      this.sources[i].unobserve(this)
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
    else if (this.parent !== false) {
      console.error('try to destroy detached child', this)
    }

//    const children = [...this.children]
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parent = false // мухлюем, т.к. нам не нужно удаление здорового компонента
      this.children[i].tryDestroy();
    }

    delete this.children
    delete this.layout

    this._destroyed = true

//    console.log('destroyed')

  }

  tryDestroy(unjoinedSource) {

//    console.log('try destroy', this)

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

//      const opts = this.options.__raw

      for (let i in this.sources) {
        const src = this.sources[i]
        // FIXME определять наличие биндинга нужно другим способом
        if (src.observedBy(this)) {//opts[i+'Changed'] || opts[i+'Effects'] || opts[i+'Events'] || opts[i+'Effectors'] || this._binders || opts.sourcesBound) {
//          this._sourcesToUnjoin[i] = src
//          console.log('destroing...', i)
          src._destroy(this, i)
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

//      const opts = this.options

      this._binding_chain = []
      for (let i in this.sources) {
        if (this.sources[i].observedBy(this)) {//opts[i+'Changed'] || opts[i+'Effects'] || opts[i+'Events'] || opts[i+'Effectors'] || this._binders || opts.sourcesBound) {
          this._binding_chain.push(i)
          this._sourcesToJoin[i] = this.sources[i]
        }
      }
      while (this._binding_chain.length) {
        const i = this._binding_chain.shift()
        this.sources[i]._init(this, i)
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



  get components () {
    return this.children ? this.children.filter(itm => itm.index == null) : []
  }

  get items () {
    return this.children ? this.children.filter(itm => itm.index != null) : []
  }

  get domains () {
    console.log('Using property domain is deprecated')
    return this.sources
  }

  walk(callback) {
    callback(this)
    this.children.forEach(c => c.walk && c.walk(callback))
  }

  // climb (callback) {
  //   let c = this.parent
  //   while (c) {
  //     if (callback(c) === false) {
  //       break
  //     }
  //     c = c.parent
  //   }
  // }

}


export default Html
