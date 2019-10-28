import Options from './Options'
import {defaultFactory, deepClone, buildProp, hashCode, Binder, reconcile2, createOptionsProto} from './Utils'
import Layout from './Layout'
import Text from './Text'
import rules from './Rules'
import classNames from 'classnames/dedupe'
//import {h} from 'maquette'
//import Domain from './Domain'
import Source from './Source'
import {Joint} from './Joint'
//import State from './State'
//import Context from './Context'
import Config from './Config'

const ComponentRules = {
  defaultItem: rules.Option,
  defaultComponent: rules.Option,
//  defaultComponents: rules.OptionCollection,
  // items: rules.OptionArray,
  components: rules.OptionCollection,
//  as: rules.StringArray,
  css: rules.StringArray,
//  data: rules.Overlap,
  '$': rules.Option
}



const ComponentOptions = {

  // настройка компонента
//  base: true,
  options: true,
  properties: true,
  mixins: true,

  // управление отрисовкой
//  text: true,
  as: true,
  css: true,
//  styles: true,
//  classes: true,
//  props: true,
  html: true,
  layout: true,
  render: true,
  renderers: true,

  // управление деревом компонентов
  components: {mutable: true},
  items: {mutable: true},

  // настройка подключения к данным
  sources: true,
  scope: true,

  // производные опции
  itemFactory: true,
  componentFactory: true,
  defaultItem: true,
  defaultComponent: true,
  anyChanged: true,
  allJoined: true,
  use: true,
  join: true
}


const ComponentProperties = {

//  key: true,

  // управление отрисовкой
  text: true,
  styles: true,
  classes: true,
//  props: true,
  html: true,
  layout: true,
  render: true,
  height: true,
  width: true,

  // управление деревом компонентов
  components: {mutable: true},
  items: {mutable: true}
}


// реакции вида *Changed
// события on*
// параметры *Id, *Ref

/*
function initClassOpts (proto) {
  const chain = []
  const opts = []
  const props = []

  let cls = proto

  while (cls && cls.constructor !== Object) {
//    console.log('cls', cls)
    if (cls.hasOwnProperty('classProps')) {
      break
    }
    if (cls.hasOwnProperty('properties')) {
      props.push(cls)//[cls, cls.properties()])
    }
    cls = Object.getPrototypeOf(cls)
  }

  let classProps = {}
  props.reverse().forEach(p => {
    p.classProps = {...classProps, ...p.properties()}
    classProps = p.classProps
//    console.log(p, p.classProps)
  })

  cls = proto


  while (cls && cls.constructor !== Object) {
    // if (cls.config) {
    //   console.log('defaults', cls, cls.config())
    // }
    // const p = cls.properties && cls.properties()

    // if (p) {
    //   for (let i in p) {
    //     Object.defineProperty(cls, )
    //   }
    // }


//    console.log(cls.hasOwnProperty('properties'), cls)

    chain.push(cls.config && cls.config())
    opts.push((cls.options && cls.options()))
//    props.push(cls.properties && cls.properties())
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

//  prop

  // const classProps = {}

  // for (let i = props.length-1; i >= 0; i--) {
  //   // добавляем только в том случае, когда опции не наследуются
  //   if (props[i] && props[i] != props[i+1]) {
  //     Object.assign(classProps, props[i])
  //   }
  // }

  // proto.classProps = classProps

  // создаем прототип для опций класса
  proto.classOptsProxy = createOptionsProto({...Config.HTML_OPTIONS, ...ComponentOptions, ...classOpts})
}
*/



class Html {

//  static OPTIONS = {}

  constructor(options={}, context) {

//    try {

//    console.log(this.constructor)
    const classDesc = Config.getClassDescriptor(this.constructor)//classes.get(this.constructor)
//    console.log(classDesc)

    // var proto = Object.getPrototypeOf(this)

    // //  собираем опции класса, если они еще не собраны
    // if (!proto.hasOwnProperty('classDefaults')) {
    //   initClassOpts(proto)
    // }

    let opts = classDesc.config

    let preparedOpts = new Options(classDesc.config)//, options).build(classDesc.rules)//ComponentRules)

    // применям примеси класса (FIXME надо отсюда убрать)
    let mixins = {}
    if (opts) {
      Object.assign(mixins, opts.mixins || opts.mix)
    }
    Object.assign(mixins, options.mixins || options.mix)

    for (let i in mixins) {
      let mixinOpts = mixins[i].call(this, preparedOpts)
      if (mixinOpts) {
        preparedOpts.merge(mixinOpts)
      }
    }

    // применяем примеси конфигурации

//    preparedOpts.mix(options)

    opts = preparedOpts.mix(options).build(classDesc.rules)
//    let opts = new Options(/*this.classDefaults*/classDesc.config, options).build(classDesc.rules)//ComponentRules)

//    this.context = context || new Context()

    // 1. Примешиваем опции

//    preparedOpts = new Options(opts, options)//, extOpts)

    // // применяем опции этапа mix
    // for (let i in opts) {
    //   if (classDesc.options[i]/*this.classOptions[i] || this.constructor.OPTIONS[i]*/) {
    //     const desc = classDesc.options[i]/*this.classOptions[i] || this.constructor.OPTIONS[i]*/
    //     if (desc.mix) {
    //       desc.mix.call(this, opts[i], preparedOpts)
    //     }
    //   }
    // }

    // // применяем примеси
    // if (opts.mixins || opts.mix) {
    //   const mixins = opts.mixins || opts.mix
    //   for (let i in mixins) {
    //     let mixinOpts = mixins[i].call(this, preparedOpts)
    //     if (mixinOpts) {
    //       preparedOpts.merge(mixinOpts)
    //     }
    //   }
    // }

    // завершаем конструирование опций
//    opts = preparedOpts.build(classDesc.rules)//ComponentRules)

    preparedOpts = new Options(opts)//, extOpts)

    // применяем опции этапа mix
    for (let i in opts) {
      if (classDesc.options[i]/*this.classOptions[i] || this.constructor.OPTIONS[i]*/) {
        const desc = classDesc.options[i]/*this.classOptions[i] || this.constructor.OPTIONS[i]*/
        if (desc.mix) {
          desc.mix.call(this, opts[i], preparedOpts)
        }
      }
    }

    opts = preparedOpts.build(classDesc.rules)


    this._html = opts.html || 'div'
    this.children = []
    this.props = opts.props || {}// {classes: {}, styles: {}}
    this._layout = opts.layout
    this.context = context || {}
    this.renderers = opts.renderers
    this.dom = {}


    this._internal = {
      html: this._html,
      props: this.props,
      children: this.children,
      options: opts,
      context: this.context
    }

    // // прокси-хелпер для опций
    // this.opts = {__target: this}

    // Object.setPrototypeOf(this.opts, this.classOptsProxy)

    // if (opts.options) {
    //   const instOptProto = createOptionsProto(opts.options)
    //   Object.setPrototypeOf(instOptProto, this.classOptsProxy)
    //   Object.setPrototypeOf(this.opts, instOptProto)
    // }

    this.options = opts

//    this.properties = opts.properties || {}

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

    const sources = {...this.context, ...opts.sources, ...opts.scope}

    let isJoined = false

    if (sources) {
//      for (let i in sources) {
    //        console.log('local', i)
        isJoined = !!this.bind(sources)//[i], i)
//      }

      if (opts.allJoined || (opts.join && opts.join['all'])) {
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
        if (!this.joints) {
          this.joints = {}
        }
        this.joints['all'] = [opts.allJoined].concat(opts.join && Object.values(opts.join['all'] || {}))
          .map(j => j && j.call(this, this.sources))
          .filter(j => j != null)
        // const unjoin = opts.allJoined.call(this, this.sources)
        // if (!this.joints) {
        //   this.joint = {}
        // }
        // this.joints['all'] = [unjoin]
        for (let i in this.sources) {
          delete this.sources[i]._key
        }

        isJoined = true
      }
    }


    // const defineComponent = (name) => {
    //   Object.defineProperty(this, '$$'+name, {
    //     get: () => {
    //       return this['$'+name] || {
    //         prop: (k, v) => {
    //           if (!this._propsCache) {
    //             this._propsCache = {}
    //           }
    //           if (!this._propsCache['$'+name]) {
    //             this._propsCache['$'+name] = []
    //           }
    //           this._propsCache['$'+name].push([k, v])
    //         }
    //       }
    //     },
    //     set: (c) => {
    //       this['$'+name] = c
    //     }
    //   })
    // }

    // 3. Создаем статические компоненты и элементы

    // for (let i in opts) {
    //   if (i[0] == '$') {
    //     defineComponent(i.substr(1))
    //   }
    // }

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
      for (let i = 0; i < opts.items.length; i++) {
        this.addItem(opts.items[i], null, i)
      }
    }

    // 4. Применяем свойства этапа init

    for (let i in opts) {
      const o = opts[i]

      const desc = (opts.options && opts.options[i]) || classDesc.options[i] || Config.HTML_EVENTS[i]// this.classOptions[i] 

      if (!desc) {
        continue
      }

      // if (i == 'text') {
      //   continue
      // }

      // if (o instanceof Joint) {
      //   o.join(this, i) // добавялем joint в подписчики source
      //   opts[i] = null
      //   continue // связанные опции будут обновлены при init
      // }


      // if (o instanceof Binder) {
      //   if (!this._binders) {
      //     this._binders = {}
      //   }
      //   this._binders[i] = o

      //   const source = this.sources[o.key]
      //   if (!source.observedBy(this)) {
      //     source.observe(this, this.changed, o.key)
      //   }
      //   continue
      // }

      if (desc.init) {
        desc.init.call(this, opts[i])
      }
      else if (desc.mix) {
        //
      }
      else if (i == 'css') {
        if (o.length) {
          this.props.className = classNames(this.props.className, o.join(' '))
        }
      }
      // else if (Config.HTML_OPTIONS[i] === true) {
      //   this.props[i] = o
      // }
      // else if (Config.HTML_OPTIONS[i]) {
      //   this.props[Config.HTML_OPTIONS[i]] = o
      // }
      else if (Config.HTML_EVENTS[i]) {
        this.props[Config.HTML_EVENTS[i]] =  (e) => o.call(this, e, this.sources)
      }

      
    }



    const batch = []

    for (let i in opts) {
      const o = opts[i]

      let desc = (opts.properties && opts.properties[i]) || classDesc.properties[i] || Config.HTML_OPTIONS[i]

      const opt = classDesc.options[i] || (opts.options && opts.options[i]) || Config.HTML_EVENTS[i]
//      console.log(i, opt)
      if (opt && opt.set) {
        desc = opt
      }

//      const desc = (opts.properties && opts.properties[i]) || (opts.options && opts.options[i] && opts.options[i].set && opts.options[i]) || classDesc.properties[i] || Config.HTML_OPTIONS[i]// this.classProps[i]

      if (!desc) {
        continue
      }

      if (!this._propsCache) {
        this._propsCache = {}
      }

      this._propsCache[i] = o

      if (o instanceof Joint) {
        const joint = o.join(this, i) // добавялем joint в подписчики source
        opts[i] = null
//        debugger
//        console.log('joint', i)
        for (let ch in joint.channels) {
          joint.source._change(this, joint.channels[ch])
        } 
//        this.sources[joint]
//        isJoined = true
        continue // связанные опции будут обновлены при init
      }

      if (opt && !opt.set) {//(opts.options && opts.options[i] && !opts.options[i].set) || classDesc.options[i] || Config.HTML_EVENTS[i]) {
        continue
      }


      // if (opts.properties && opts.properties[i] && opts.properties[i].set) {
      //   const desc = opts.properties[i]
      //   if (desc.set) {
      //     desc.set.call(this, opts[i])
      //   }
      // }
      // else if (this.classProps[i] && this.classProps[i].set) {
      //   const desc = this.classProps[i]
      //   if (desc.set) {
      //     desc.set.call(this, opts[i])
      //   }
      // }
      if (desc.set) {
//        desc.set.call(this, o)
        batch.push([desc.set, o])
      }
      // else if (i == 'key') {
      //   this._internal.key = o
      //   this._internal.props.key = o
      // }
      else if (i == 'text') {
        if (opts.$content) {
          batch.push([(v) => {
            const content = this.opt('components').content
//            console.log('content', content, v)
            if (content) {
              content.opt('text', v)
            }
            else {
              this._internal.text = v
            }
          }, o])
        }
        else {
          this._internal.text = o
        }
      }
      else if (i == 'css') {
        if (o.length) {
          this.props.className = classNames(this.props.className, o.join(' '))
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
      else {
//        console.log('unused property', i)
      }
    }

    if (batch.length > 0) {
      this._batchQueue = batch
      while (this._batchQueue.length > 0) {
        const p = this._batchQueue.shift()
        p[0].call(this, p[1])
      }
      delete this._batchQueue
    }

    // 5. Синхронизируем компонент с доменами

    isJoined && this.tryInit()

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

    // }
    // catch (err) {
    //   console.error(err)
    //   throw err
    // }
  }



  options () {
    return ComponentOptions
  }

  properties () {
    return ComponentProperties
  }

  rules () {
    return ComponentRules
  }


  // Собственные свойства компонента

  get text () {
    return this._propsCache.text != null ? String(this._propsCache.text) : null
  }

  get key () {
    return this._propsCache.key//._internal.props.key
  }

  get classes () {
    console.error('getter not supported yet', 'classes')
  }

  get styles () {
    console.error('getter not supported yet', 'styles')
  }

  get css () {
    console.error('getter not supported yet', 'css')
  }

  get height () {
    console.error('getter not supported yet', 'height')
  }

  get width () {
    console.error('getter not supported yet', 'width')
  }

  get components () {
    const c = {}
    if (this.children) {
      this.children.forEach(child => {
        if (child.index == null) {
          c[child.props.key] = child
        }
      })
    }
    return c
//    this.children ? this.children.filter(itm => itm.index == null) : []
  }

  get items () {
    return this.children ? this.children.filter(itm => itm.index != null) : []
  }


  // get text () {
  //   return this.opt('text')
  // }

  // set text (v) {
  //   this.opt('text', v)
  // } 


  // setClasses (value) {
  //   this._internal.props['className'] = classNames(this._internal.props['className'], value)
  // }

  // setStyles (value) {
  //   Object.assign(this._internal.props['styles'], value)
  // }




  render (channel='*') {

    const renderers = this._internal.options.renderers

    if (renderers && renderers[channel] && renderers[channel].render) {
      this.vnode = renderers[channel].render.call(this)
      delete this._dirty
      return this.vnode  
    }

    const o = this.options

//    console.log('render', !!this.vnode, this.children.length, this)
    if ('render' in o) {
      let render = o.render
      if (typeof render === 'function') {
        render = render.call(this, o)
      }
      // if (!render) {
      //   return null
      // }
      return render
    }
    const _in = this._internal

    // if (this.options.render === false) {
    //   return null
    //   // if (!this.options.rendering.call(this, h)) {
    //   //   return null
    //   // }
    // }

    const h = Config.Renderer.h

    if (this.children.length || this._layout) {
      let layout = this._layout
      if (layout == null || layout === true) {
        layout = Layout.sorted // или брать из Config?
      }
      if (_in.text) {
        if (this._dirty || !this.vnode) {
          this.vnode = layout(this._html, deepClone(this.props), [...this.children, new Text(_in.text)])
        }
      }
      else {
        if (this._dirty || !this.vnode) {
          this.vnode = layout(this._html, deepClone(this.props), [...this.children])
        }
      }
    }
    else if(_in.text || this.props.value) {
      if (this._dirty || !this.vnode) {
        this.vnode = h(this._html, deepClone(this.props), _in.text ? [_in.text] : null)
      }
    }
    else if (o.renderIfEmpty !== false) {
      if (this._dirty || !this.vnode) {
        this.vnode = h(this._html, deepClone(this.props))
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
    if (this._dirty || !this.vnode) {
      return
    }
    if (this.options.onDirty) {
      if (this.notify('onDirty') === false) {
        return
      }
    }
    // if (this.renderers /*&& isDefault !== false*/) {      
    //   for (let i in this.renderers) {
    //     this.renderers[i].update.call(this)
    //   }
    //   return
    // }
    if (!this._dirty && !Config.Renderer.scheduled) {
      Config.Renderer.schedule()
//      this.context.projector.scheduleRender()
    }
    this._dirty = true
    if (this.parent) {
      this.parent.rerender()
    }
    // let c = this
    // while (c && c.vnode && !c._dirty) {
    //   c._dirty = true
    //   c = c.parent
    // }
  }


  // $set (name, value) {
  //   const prevValue = this._internal[name]
  //   const p = this._properties[name]
  //   if (prevValue == value) {
  //     return
  //   }
  //   this._internal[name] = value
  //   p.set.call(this, value)
  // }

  prop (name, value) {
    if (arguments.length == 1) {
      // getter
      return this._propsCache[name]
    }
    else {
      // setter
      return this.opt(name, value)
    }
  }

  opt (name, value, key) {

    const classDesc = Config.getClassDescriptor(this.constructor)

    // GETTER
    if (arguments.length == 1 && name && name.constructor != Object) {
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
      if (this._batchQueue) {
        while (this._batchQueue.length > 0) {
          const p = this._batchQueue.shift()
          p[0].call(this, p[1])
        }
      }

      if (classDesc.properties[name]) {
        return this[name]  
      }
      else if (classDesc.options[name]) {
        return this.options[name]
      }
      return this._propsCache[name]// this._propsCache[name]// this[name]//._propsCache[name]//this.options[name]
    }

    // SETTER
//    console.log('opt', name, value)


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

    let markDirty = false

    for (let i = 0; i < keys.length; i++) {
      name = keys[i]
      value = isObject ? values[name] : values

      // if (!(name in this.classProps) && !(name in this.properties)) {
      //   console.warn(`[Html] Property not defined`, name, this.constructor)
      // }

      const oldValue = this._propsCache && this._propsCache[name] //this.options[name]
      const o = this.options

      // const desc = (o.options && o.options[name]) 
      //   || this.classOptions[name] 
      //   || ComponentOptions[name] 
      //   || this.classDesc.properties[name] 
      //   || this.properties[name]

      let desc = (o.properties && o.properties[name]) || classDesc.properties[name] || Config.HTML_OPTIONS[name]

      const opt = classDesc.options[name] || (o.options && o.options[name])
      if (opt && opt.set) {
        desc = opt
      }

      if (!desc) {
        console.warn(`[${this.constructor.name}] Property not defined`, name)
        continue
      }

      const isMutable = desc && desc.mutable === true // ignore value equal check
      const isClean = desc && desc.clean === true     // no dirty mark

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
        if (!isMutable) {
//          console.warn('Ignore option ['+name+']', value)
          continue
        }
      }

      if (!isClean) {
        markDirty = true
      }


      if (!this._propsCache) {
        this._propsCache = {}
      }

      this._propsCache[name] = value


//      console.log('set opt', name, value, desc)


//    console.log('opt', name, v)

//    if (name[0] != '$' && name[name.length-1] != '!') {
      // FIXME заменить нормальным слиянием
/*      
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
*/
    // }
    // else if (name[0] == '$') {
    //   name = name.substr(1)
    // }
    // else {
    //   name = name.substr(0, name.length-1)
    // }

      if (desc.set) {
        desc.set.call(this, value, oldValue)
      }
      // if (this.properties[name] && this.properties[name].set) {
      //   const desc = this.properties[name]
      //   if (desc.set) {
      //     desc.set.call(this, value, oldValue)
      //   }
      // }
      // else if (classDesc.properties[name] && classDesc.properties[name].set) {
      //   const desc = classDesc.properties[name]
      //   if (desc.set) {
      //     desc.set.call(this, value, oldValue)
      //   }
      // }
      // else if (o.options && o.options[name]) {
      //   const desc = o.options[name]
      //   if (desc.set) {
      //     desc.set.call(this, value, oldValue)
      //   }
      //   else if (desc.initOrSet) {
      //     desc.initOrSet.call(this, value, oldValue)
      //   }
      // }
      // else if (this.classOptions[name]/* || this.constructor.OPTIONS[name]*/) {
      //   const desc = this.classOptions[name]/* || this.constructor.OPTIONS[name]*/
      //   if (desc.set) {
      //     desc.set.call(this, value, oldValue)
      //   }
      //   else if (desc.initOrSet) {
      //     desc.initOrSet.call(this, value, oldValue)
      //   }
      // }
      else if (name == 'text') {
        if (this.$content) {
          this.$content.opt('text', value)
        }
        else {
          this._internal.text = value != null ? String(value) : value
        }
  //      this.options[name] = String(v)
      }
      // else if (i == 'key') {
      //   this._internal.key = o
      //   this._internal.props.key = o
      // }
      else if (name == 'html') {
        this._html = value
      }
      else if (name == 'css') {
        if (value.length) {
          this.props['className'] = classNames(this.props['className'], value.join(' '))
        }
      }
      else if (name == 'classes') {
        this.props['className'] = classNames(this.props['className'], value)
      }
      else if (name == 'styles') {
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

    if (this.vnode && !this._dirty && markDirty) {
      this.rerender()
    }
    return this
  }

  addItem (value, i, key, extraSources) {

    const o = this.options

    if (o.defaultItem && (typeof value === 'string' || typeof value == 'number')) {
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

    const item = (o.itemFactory || defaultFactory)(
      itemOpts, 
      extraSources ? {...this.sources, ...extraSources} : this.sources, 
      (typeof itemOpts === 'string') ? Text : Html
      )
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

//    console.log(item, i, o.key, key)    
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

      if ((o['$'+i] || o.defaultComponent) && (typeof value === 'string' || typeof value == 'number')) {
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
          this.addComponent(i, (o.componentFactory || defaultFactory)(c, context, (typeof c === 'string') ? Text : Html))
        })
        return
      }

  //    console.log('addComponent', o, compOpts)
      comp = (o.componentFactory || defaultFactory)(compOpts, context, (typeof compOpts === 'string') ? Text : Html)
    }

    this.children.push(comp)
    comp.props.key = i
//        comp.index = 0
    comp.parent = this
    this['$'+i] = comp

    if (this.vnode && !this._dirty) {
      this.rerender()
    }

    // if (this._propsCache && this._propsCache['$'+i]) {
    //   this._propsCache['$'+i].forEach(p => comp.prop(p[0], p[1]))
    //   delete this._propsCache['$'+i]
    // }

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

/*  
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
*/

  syncItems (value, key) {
//    const o = this.options.__raw

    if (typeof value == 'string') {
      key = value
      value = this.sources[key]
    }
    if (value instanceof Source) {
      value = value.get()
    }
    if (value instanceof Source.Stream) {

      key = value.key || key

//          const idResolver = o[key+'EntryId']

//      let items = this.items//.filter(itm => !itm._destroying) //?
  //    console.log(items.length, this.children.length)
//      let add = {}
//      let update = []
//      const entriesByKeys = {}

      const prevIds = this.items.map(itm => {return {i: itm.index, k: itm.props.key, itm, entry: itm.sources[key]}})
      const nextIds = []

      // let isModified = false
      // let j = 0

      value.entries((entry, idx, v, k) => {
        nextIds.push({i: idx/*Number(idx)*/, k, entry})

        // const prev = prevIds[j++]
        // if (!isModified) {
        //   if (prev == null || (prev.i != Number(idx) || prev.k != k)) {
        //     isModified = true
        //   }
        // }
      })

//      console.log('isModified', isModified)

      if ((nextIds.length == 0 && prevIds.length == 0)/* || !isModified*/) {
        return
      }



      const prevByKeys = {}
      const nextByKeys = {}
      const prevByIds = []
      const nextByIds = []
      prevIds.forEach(prev => {prevByKeys[prev.k] = prev; prevByIds[prev.i] = prev})
      nextIds.forEach(next => {nextByKeys[next.k] = next; nextByIds[next.i] = next})
      prevByIds.forEach((prev, i) => {
        prev.after = prevByIds[i+1]; 
        prev.before = prevByIds[i-1]
      })
      nextByIds.forEach((next, i) => {
        next.after2 = nextByIds[i+1]; 
        next.before2 = nextByIds[i-1]; 
      })

//      let tail = prevByIds[prevByIds.length-1]
      let merges = 0

      nextByIds.forEach(next => {
        let prev = prevByKeys[next.k]
        let prev2 = next.after2 && prevByKeys[next.after2.k]
        if (prev) {
          if (next.before2) {
            next.before2.after2 = prev
//            prev.before2 = next.before2
          }
          else {
            // голова
            //next.before2 = prev.before2

            // if (!prev.before2) {
            //   prev.before2 = prev.before
            // }
            // else {
            //   debugger
            // }
          }
          prev.after2 = prev2 || next.after2
          if (prev.after2) {
            prev.after2.before2 = prev
          }
          prev.merged = true
          next.prev = prev
          merges++
        }
        // else if (!next.before2) {
        //   if (tail) {
        //     tail.after2 = next
        //     next.before2 = tail
        //   }
        //   tail = next
        // }

      })

      if (merges == 0) {
        if (nextByIds.length && prevByIds.length) {
          prevByIds[prevByIds.length-1].after2 = nextByIds[0]
          nextByIds[0].before2 = prevByIds[prevByIds.length-1]
        }
      }

//      if (prevIds.length > 0 && !prevIds[0].before2)
      let head = nextByIds.length == 0 ? prevByIds[0] : (nextByIds[0].prev || nextByIds[0])//||  prevByIds.length > 0 ? prevByIds[0] : nextByIds[0]
      let current = head.before2 || head.before
      while (current) {
        head = current
        current = current.before2 || (!current.merged && current.before)
        // if (!current && !head.merged) {
        //   current = head.before
        // }
      }

      // const head = (prevByIds.length > 0 && !prevByIds[0].before2) ? prevByIds[0] : nextByIds[0]
      // let current = head

//      console.log('head' ,head)

      current = head

//      let i = 0
      const result = []
      while(current) {
        result.push(current)
        if (!current.itm) {
          current.state = '+'
        }
        else if (!current.merged) {
          current.state = '-'
        }
        else if (current.after != current.after2) {
          let deleted = current.after
          while (deleted && !deleted.after2 && !deleted.before2) {
            deleted.state = '-'
            result.push(deleted)
            deleted = deleted.after
          }
        }
        current = current.after2 || (!current.merged && current.after)

      }

      // console.log(this)
      // console.log(result)
      // console.log(prevByIds)
      // console.log(nextByIds)

//      return

      result.forEach(r => {
        if (r.state == '-') {
          const del = r
          const itm = del.itm
          if (itm.isInitializing) {
            console.warn('try to destroy initializing item', itm)
          }
          if (!itm.isDestroying) {
            itm.tryDestroy()
          }  
        }
        else if (r.state == '+') {
          const add = r
          const entry = add.entry
          const k = add.k
  //        console.log('add', k, entry)
          // имитируем setItem
          const itm = this.addItem({}, null, k, {[key]: entry})
          add._itm = add.itm
          add.itm = itm
        }
        else {
//          debugger
          const upd = r
          if (upd.itm.isDestroying) {
            delete upd.itm._destroying
            delete upd.itm._sourcesToUnjoin
            upd.itm.tryInit()
          }  
        }
      })


      let i = 0
      result.forEach(r => {
        if (!r.itm._destroyed) {
          r.itm.index = i
//          r.itm.props.key = i
          i++
        }
        else {
          console.log('destroyed')
        }
      })



/*
      const {added, deleted, updated} = reconcile2(prevIds, nextIds, destroyingIds)

      // reconcileResult.moves.forEach(move => {
      //   this.moveItem(move.i, move.to)
      // })

      deleted.forEach(del => {
        const itm = del.itm
        if (itm.isInitializing) {
          console.warn('try to destroy initializing item', itm)
        }
        if (!itm.isDestroying) {
          itm.tryDestroy()
        }
      })

      updated.forEach(upd => {
//        console.log('----', upd.itm.index, upd.i, upd.entry.id, upd.next)
        upd.itm.index = upd.next.entry.id
        if (upd.itm.isDestroying) {
          delete upd.itm._destroying
          delete upd.itm._sourcesToUnjoin
          upd.itm.tryInit()
        }
      })

      added.forEach(add => {
        const entry = add.entry
        const k = add.k
//        console.log('add', k, entry)
        // имитируем setItem
        const itm = this.addItem({sources: {[key]: entry}}, null, k)
        itm.index = Number(entry.id)
      })
      // добавляем новые элементы
      // Object.keys(add).forEach(k => {
      //   let entry = add[k]
      //   this.addItem({sources: {[key]: entry}}, Number(entry.id), k)
      // })
*/
//      console.log('items', this.items)

    }
    else {
      this.destroyAllItems()
      for (let i = 0; i < value.length; i++) {
        this.addItem(value[i], i)
      }
    }

  }


  syncComponents (value, key) {
    const o = this.options

    if (typeof value == 'string') {
      console.warn('String components value. Converting to {text: value}', value)
      value = {text: value}
//      key = value
//      value = this.sources[key]
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
            console.warn('Child context overriding', this['$'+i]._internal.context[k], entry) // TODO может иммет смысл контекст копировать при создании компонента
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
          const c = this['$'+i]
          if (s && !c) {
            this.addComponent(i, s)
          }
          else if (s && c) {
            if (s !== true) {
              c.opt(s, null) // !!!
            }
            if (c._destroying) {
              delete c._destroying
              delete c._sourcesToUnjoin
              c.tryInit()
              console.log('restore component', i, s)  
            }
          }
          else if (!s && c) {
//            debugger
            c.tryDestroy()
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

  destroyAllItems () {
    for (let i = this.children.length-1; i >= 0; i--) {
      let child = this.children[i]
      if (child.index != null) {
        child.tryDestroy()
      }
    }
  }



  bind (sources) {

//    console.count('bind')

    if (arguments.length == 2) {
      sources = {}
      sources[arguments[1]] = arguments[0]
    }

    let isJoined = false

    for (let i in sources) {

      let v = sources[i]


//    console.log('bind', i, v)

    if (v === undefined) {
      continue
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
      v = v(this.context, o, i)
    }
    else if (ref) {
      if (!this.sources[ref]) {
        this.bind(o.sources[ref], ref)
      }
      v = this.sources[ref]
    }

    if (v === undefined) {
      console.warn('Source '+i+' ignored')
      continue
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
      continue
    }

    // решаем, подключаться ли к домену
    if (o.anyChanged || (o.join && o.join[i]) || o.allJoined || o[i+'Changed'] || o[i+'Joined']) {
      // TODO возможно, с эффектами придется поступить так же - вспомогательная функция
      source.observe(this, this.changed, i/*, o[i+'Effects']*/)

      if (!this.joints) {
        this.joints = {}
      }

      this.joints[i] = []//source.$stream(i, this)

      if (o.join && o.join[i]) {
        const srcJoin = o.join[i]
        for (let j in srcJoin) {
          const unjoin = srcJoin[j].call(this, source, i) // TODO результатом является функция для unjoin
          unjoin && this.joints[i].push(unjoin)
        }
      }

      if (o[i+'Joined']) {
        const unjoin = o[i+'Joined'].call(this, source)
        unjoin && this.joints[i].push(unjoin)
      }

      isJoined = true
    }

    if (this.sources[i]) {
      this.sources[i].unobserve(this)
    }

    // else {
    //   console.log('ignore join')
    // }

    const oldSource = this.sources[i]

    this.sources[i] = source

    this.children.forEach(child => {
      if (child.sources[i] == oldSource) {
        child.bind(source, i)
      }
    })

  }

    return isJoined
//    this.rebind(source.get(), i, source)
  }


  // unbind(key) {
  //   this.sources[key].unjoin(this)
  // }


  changed (v, subscription) {

    if (subscription.channels.length > 1) {
      console.warn('Multisubscription found', subscription)
    }

    if (this._destroyed) {
      console.warn('Try to change destroyed component', this)
      return
    }

    const key = subscription.channels[0]

    const o = this.options

//    console.log (v, key)

    if ((v.name == 'changed'/* || v.name == 'preinit'*/) && !this._destroying) {

      if (!this.streams) {
        this.streams = {}
      }

      if (o[key+'Changed']) {
//        this.streams[key] = this.streams[key] || this.sources[key].$stream(key, this)
        const dynOpts = o[key+'Changed'].call(this, v.data, this.sources[key]/*this.streams[key]*/, key, v.ids)
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
        // TODO здесь нужно проинициализировать потоки
        const bindOpts = o.anyChanged.call(this, v, this.sources/*this.streams*/, this.sources)
        if (bindOpts) {
          this.opt(bindOpts, key)
          // for (let j in bindOpts) {
          //   this.opt(j, bindOpts[j], key)
          // }
        }
      }

      // if (!this._optJoints) {
      //   this._optJoints = {}
      //   for (let i in o) {
      //     if (o[i] instanceof Source.Joint) {
      //       this._optJoints[i] = o[i]
      //     }
      //   }
      // }

      // for (let i in this._optJoints) {
      //   const joint = this._optJoints[i]
      //   if (joint.key == key) {
      //     this.opt(i, joint.source.$get())
      //   }
      // }

      // if (this._binders) {
      //   for (let i in this._binders) {
      //     const binder = this._binders[i]
      //     if (binder.key == key) {
      //       // FIXME получение проектированных значений должно быть проще
      //       const src = this.sources[key]
      //       let propVal = null
      //       if (src._properties && src._properties[binder.prop]) {
      //         // есть свойство в модели
      //         const prop = src._properties[binder.prop]
      //         propVal = prop.calc ? src.$entry(binder.prop).get() : v.data[binder.prop]
      //       }
      //       else {
      //         propVal = binder.prop ? v.data[binder.prop] : v.data
      //       }
      //       this.opt('$'+i, binder.format ? binder.format(propVal) : propVal)
      //     }
      //   }
      // }

    }
    else if (v.name == 'destroy') {
      this.tryDestroy(key)//this.sources[key])
    }
    else if (v.name == 'init' || v.name == 'init:cancel') {
      this.tryInit(key)//this.sources[key])
    }
    else {
//      console.log('on', v)
      const handlerName = 'on'+v.name[0].toUpperCase()+v.name.substr(1)
      if (o[handlerName]) {
        o[handlerName].call(this, v, this.sources)
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

      // если элемент уже отрисован, то надо обновить компоновку
      if (this.vnode && !this._dirty) {
        this.rerender()
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

  syncDom (callback) {
    return this.eff(callback)
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

    if (this.joints && this.joints['all']) {
      while(this.joints['all'].length > 0) {
        const unjoin = this.joints['all'].pop()
        unjoin && unjoin(this.sources)
      }
    }

    for (let i in this.sources) {
      if (this.joints && this.joints[i]) {
        while(this.joints[i].length > 0) {
          const unjoin = this.joints[i].pop()
          unjoin && unjoin(this.sources[i])
        }
      }
//      this.unbind(i)
      this.sources[i].unobserve(this)
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
    delete this._layout

    this._destroyed = true

//    console.log('destroyed')

  }

  tryDestroy(unjoinedSource) {

//    console.log('try destroy', this)

    if (unjoinedSource) {
      if (this.isDestroying) {
        unjoinedSource = this.sources[unjoinedSource]
        for (let i in this.sources) {
          if (this.sources[i] == unjoinedSource) {
            delete this._sourcesToUnjoin[i]
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
        joinedSource = this.sources[joinedSource]
        for (let i in this.sources) {
          if (this.sources[i] == joinedSource) {
            delete this._sourcesToJoin[i]
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

  get scope () {
    return this.sources
  }



  // get domains () {
  //   console.log('Using property domain is deprecated')
  //   return this.sources
  // }

  walk (callback) {
    callback(this)
    this.children.forEach(c => c.walk && c.walk(callback))
  }

  notify (name, event) {
//    const handlerName = 'on'+name[0].toUpperCase() + name.substr(1)
    if (this._internal.options[name]) {
      return this._internal.options[name].call(this, event, this.sources)
    }
  }

  fire (name, event) {
    return this.notify(name, event)
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

Html.Text = Text


export default Html
