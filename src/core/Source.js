import {deepClone, hashCode, defaultKeyResolver, createPropsProto} from './Utils'
import Stream from './Stream'


class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, o, k) {
    this.$id = k
    this.src = v
    this.entries = {}// Array.isArray(v) ? [] : {}
    this.subscribers = []
    this.isNested = v instanceof Source
    this.options = o || {}

    // this.subscribers = []
    // this.effects = {}
    // this.events = {}

    // FIXME поменять на конфигурацию класса
    if (this.config) {
      this.options = {...this.config(), ...this.options}
    }

    const opts = this.options

    if (opts.initial && !this.isNested) {
      if (typeof opts.initial == 'function') {
        this.src = opts.initial.call(this, o)
      }
      else {
        this.src = opts.initial
      }
    }


    if (this.options && this.options.computed) {
      this.compute(this.get())
    }

    if (this.options && this.options.changed) {
      // FIXME костыль
      this.$observe(this, (evt) => {
        if (evt.name == 'changed' || evt.name == 'init') {
          this.options.changed.call(this, evt)
        }
      })
    }

    if (this.options && this.options.calc) {
      this.isCalc = true
    }

    if (this.options.properties) {
      for (let i in this.options.properties) {
        const p = this.options.properties[i]
        if (typeof p === 'function') {
          this.$prop(i, null, p) // TODO это нужно убрать
          this._properties[i] = {calc: p}
        }
        else {
          this.$prop(i, p.type, p.calc, p.idResolver)  // TODO это нужно убрать
          this._properties[i] = {...p}
        }

        if (this._properties[i].watch) {
          const name = i
          const callback = this._properties[i].watch
          this.subscribe({
            when: (e) => e.name == 'changed' && e.ids && (name in e.ids), 
            callback: (e) => callback.call(this, e.data[name], e.cache[name]), 
            target: this,
            channels: []
          })
        }

        if (this._properties[i].type) {
          Object.defineProperty(this, i, {
            get: () => this.$entry(i),
          })  
        }
        else {
          Object.defineProperty(this, i, {
            get: () => this.get(i),
            set: (v) => this.set(i, v)
          })  
        }
          
      }

    }



    if (this.options.init) {
      this.options.init.call(this)
    }

    // if (this.options && this.options.effectors) {
    //   for (let i in this.options.effectors) {
    //     this.use(i, this.options.effectors[i], this)
    //   }
    // }
//    this.effects = {}
//    this.isArray = Array.isArray(k == null ? v)
  }


  // get $props () {
  //   if (!this._props) {
  //     // ?
  //     // прокси-хелпер для опций
  //     this._props = {__target: this}

  //     const instOptProto = createPropsProto(this._properties || {})
  //     Object.setPrototypeOf(instOptProto, Stream.prototype)
  //     Object.setPrototypeOf(this._props, instOptProto)
  //     this._propsProto = instOptProto
  //   }
  //   return this._props
  // }

  // get $entries () {
  //   const e = {}
  //   if (this._properties) {
  //     for (let i in this._properties) {
  //       e[i] = this.$entry(i)
  //     }
  //   }
  //   return e
  // }

  $get (...args) {
    return this.get.apply(this, args)
  }

  $set (...args) {
    return this.set.apply(this, args)
  }
 
  get(k) {

    let v = null
    if (arguments.length == 0) {

      if (this.removed) {
        return this.cache
      }

      if (this.isCalc) {
        if (this.cache == null) {
//          console.log('calc', this.cache, this.$id)
          v = this.isNested ? this.src.get() : this.src
          v = this.options.calc.call(this, v, this.src.props)
        }
        else {
          v = this.cache
        }
//        console.log('projected', v, this.cache)
        // if (Object.keys(this.entries).length) {
        //   console.log('need reconcile projected entries')
        // }
        // v = this.isNested ? this.src.get() : this.src
        // v = this.options.project(v)
      }
      else if (this.$id == null) {
        v = this.src
      }
      else {
        v = this.isNested ? this.src.get() : this.src
        if (v && v[this.$id] === undefined && this.options.initial) {
          v[this.$id] = this.options.initial()
        }
        v = v && v[this.$id]
      }

      if (this.cache != null && this.cache != v) {
        console.warn('cached value is invalid', this.cache, v);
      }

      this.cache = v
    }
    else {
      if (this._properties && this._properties[k]) {
        return this.$entry(k).get()
      }

      v = this.get()

      if (this.cache != null && this.cache != v) {
        console.warn('cached value is invalid', this.cache, v);
      }

      this.cache = v

      v = v[k]

      // if (this.options && this.options.model && this.options.model[k] && this.options.model[k].get) {
      //   v = this.options.model[k].get.call(this, v)
      // }
      // else {
      // }
    }

//     if (this.cache != null && this.cache != v) {
//       console.warn('cached value is invalid', this.cache, v);
//     }
//     else if (this.cache != null) {
// //      console.log('cache hit')
//     }

    return v
  }

  set(k, v) {
    if (arguments.length == 1) {
      v = k
      if (this.$id == null) {
        this.src = v
      }
      else if (this.isNested) {
        this.src.get()[this.$id] = v
      }
      else {
        this.src[this.$id] = v
      }

      const cache = this.cache

//      delete this.cache

      this._updateEntries(v, cache)

      // if (Array.isArray(v)) {
      //   if (Object.keys(this.entries).length) {
      //     console.log('need to reshake entries')
      //     for (let i in this.entries) {
      //       const entry = this.entries[i]
      //       if (entry.isCalc) {
      //         continue
      //       }
      //       else if (entry.removed && Number(i) < v.length) {
      //         delete entry.removed
      //       }
      //       else if (!entry.removed && Number(i) >= v.length) {
      //         entry.removed = true
      //       }
      //     }
      //   }
      // }
      // else {
      //   if (Object.keys(v).length) {
      //     console.log('need to reshake entries')
      //   }
      // }

      //TODO возможно, сброс всех кэшей должен быть не здесь
      // for (let i in this.entries) {
      //
      // }

      //TODO удалить все entries
      this._update(null, 'set', {[this.$id]: true}, cache) // ?
    }
    else {

      // if (typeof v == 'function') {
      //   this.when(v()).emit('set', {params: [k]})
      //   return this
      // }

//      console.log('set', k, v)
      if (Array.isArray(k)) {
        // TODO k может быть массивом
      }
      else {
        if (this.entries[k]) {
          this.entries[k].set(v)
        }
        else {
          const cache = this.cache != null ? this.cache[k] : null

          if (this.$id == null) {
            this.src[k] = v
          }
          else if (this.isNested) {
            this.src.get()[this.$id][k] = v
          }
          else {
            this.src[this.$id][k] = v
          }
          // если дочерних элементов для ключа нет, то остальные обновлять не нужно
          this._update('asc', 'set', {[k]: true}, {[k]: cache})
        }

        // if (this.entries[k]) {
        //   delete this.entries[k].cache
        //   this.entries[k].update()
        // }
        // else {
//          this.update()
//        }
        // delete this.cache
        // this.$entry(k).update()
      }
    }

    return this
  }


  // toggle () {
  //   throw new Error('Method toggle not supported')
  // }

  $toggle(k) {
    if (arguments.length == 0) {
      if (this.$id == null) {
        this.src = !this.src
      }
      else {
        let v = this.isNested ? this.src.get() : this.src
        v[this.$id] = !v[this.$id]
      }
      delete this.cache

//      if (this.entries)

      if (Array.isArray(this.entries)) {
        if (this.entries.length) {
          console.warn('toggling object value')
        }
      }
      else {
        if (Object.keys(this.entries).length) {
          console.warn('toggling object value')
        }
      }

      this._update() // ?
    }
    else {
      if (this.entries[k]) {
        this.entries[k].$toggle()
      }
      else {
        if (this.$id == null) {
          this.src[k] = !this.src[k]
        }
        else {
          let v = this.isNested ? this.src.get()[this.$id] : this.src[this.$id]
          v[k] = !v[k]
        }
        this._update('asc')
      }
    }
  }




  // $observe (target, dataChanged, key) {
  //   this.join(target, dataChanged, null, key)
  // }
  //
  // $unobserve (target) {
  //   this.unjoin(target)
  // }
  //
  // join(target, dataChanged, dataRemoved, key, dataEffects) {
  //   this.observers.push({target, dataChanged, dataRemoved, key, dataEffects})
  //   if (!this._listeners) {
  //     this._listeners = new Map()
  //   }
  //   this._listeners.set(target, {key})
  // }
  //
  // unjoin(target) {
  //   for (let i = 0; i < this.observers.length; i++) {
  //     if (this.observers[i].target == target) {
  //       this.observers.splice(i, 1)
  //       break
  //     }
  //   }
  //
  //   // if (this.observers.length == 0 && this.isNested) {
  //   //   let n = Array.isArray(this.entries) ? this.entities.length : Object.keys(this.entries).length
  //   //   if (!n) {
  //   //     delete this.src.entries[this.$id]
  //   //   }
  //   // }
  // }


  _invalidate () {
    this._cacheInvalid = true
//    delete this.cache
    for (let i in this.entries) {
      if (!this.entries[i]._cacheInvalid) {
        this.entries[i]._invalidate()
      }
    }
  }


  _update(direction, event, ids, cache) {
    if (!this._updating && !this.removed) {
      this._updating = this
      try {

        const prevValue = cache || this.cache

        // if (!this._cacheInvalid) {
        //   this._invalidate()
        // }
        //
        // delete this._cacheInvalid
        delete this.cache

  //    delete this.cache
//      this.emit('beforeChanged')
        if (this.isNested && direction != 'desc' && direction != 'none') {
          this.src._update('asc', event, {[this.$id]: true}, {[this.$id]: prevValue})
        }

        if (this.options && this.options.computed) {
          this.compute(this.get())
        }

        // for (let i in this.entries) {
        //   const entry = this.entries[i]
        //   if (entry.isProj) {
        //     continue
        //   }
        //   else if (entry.removed && Number(i) < v.length) {
        //     delete entry.removed
        //   }
        //   else if (!entry.removed && Number(i) >= v.length) {
        //     entry.removed = true
        //   }
        // }

//        updateQueue.push({source: this, ids, cache})

        // this.observers.forEach(t => {
        //   t.dataChanged.call(t.target, this.get(), t.key)
        // })

        if (direction != 'asc' && direction != 'none') {
          for (let i in this.entries) {
//            console.log('entries', Object.keys(this.entries).length)
            this.entries[i]._update('desc', event);
          }
        }
        // ?
        else if (this._properties) {
          for (let i in this._properties) {
            if (this._properties[i].calc && this.entries[i]) {
              this.entries[i]._calc(this.get())
            }
          }
        }

        this.emit('changed', this.get(), {ids, cache: prevValue}, '*')

      }
      catch (err) {
        console.error(err)
      }
//      this.emit('afterChanged')
      delete this._updating
    }
  }


  entry () {
    throw new Error('Method entry not supported')
  }

  $entry(k) {
    let e = this.entries[k]
    if (e == null) {
      if (this._properties && this._properties[k]) {
        // здесь можно вызывать фабрику
        const prop = this._properties[k]
        if (typeof prop === 'object') {
          e = new Source(this, {...prop}, k)
        }
        else {
          e = new prop(this, null, k)
        }
      }
      else {
        e = new Source(this, null, k) // в качестве опций должны передаваться параметры модели
      }
      this.entries[k] = e
    }
    return e
  }

  remove () {
    throw 'method remove not supported'
  }
 
  $remove(k) {
    if (arguments.length == 0) {
      if (this.isNested) {
        this.src.remove(this.$id)
      }
    }
    else {

      let v = this.get()
      if (Array.isArray(v)) {
        v.splice(k, 1)
      }
      else {
        delete v[k]
      }

      if (this.entries[k]) {
        let entry = this.entries[k]


        delete this.entries[k].src
        delete this.entries[k].isNested
        delete this.entries[k].id
        delete this.entries[k]

        if (Array.isArray(v)) {
          Object.keys(this.entries).forEach(i => {
            if (i > k) {
              this.entries[i-1] = this.entries[i]
              this.entries[i-1].id = i-1
              delete this.entries[i]
//              delete this.entries[i].cache // кэш надо глубже почистить
//              delete this.entries[i]
            }
          })
//           this.entries.splice(k, 1)
// //          this.entries.pop() //TODO пробуем
//           // кэш надо глубже почистить
//           for (let i = k; i < this.entries.length; i++) {
//             this.entries[k].id = i
//             delete this.entries[k].cache
//           }
        }
/*
        if (!this._removed) {
          this._removed = []
        }
        this._removed.push(entry)
        // else {
        //   delete this.entries[k]
        // }
        entry.emit('destroy', {})//{ids: {[entry.id]: true}})
*/
        this._update(null, 'remove')
      }
      else {
        this._update('asc', 'remove')
      }

//      this.targets.forEach(t => t.dataChanged.call(t.target, v))
    }
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
  }

  $find (itemOrFilter) {
    const filter = (typeof itemOrFilter == 'function') ? itemOrFilter : (v) => v == itemOrFilter
    const v = this.get()
    for (let i in v) {
      if (filter(v[i])) {
        return this.$entry(i)
      }
    }
    return null
  }


  // destroy () {
  //
  //   if (this.isNested) {
  //     const i = this.src._removed.indexOf(this)
  //     this.src._removed.splice(i, 1)
  //   }
  //
  //   this.$update('asc')
  // }




  // stream(callback) {
  //
  //   const value = this.get()
  //   const props = this._properties
  //
  //   if (Array.isArray(value)) {
  //     // обходим элементы массива в порядке индексов
  //     for (let i = 0; i < v.length; i++) {
  //       callback.call(this, this.entry(i), i, value[i])
  //     }
  //   }
  //   else {
  //     const allProps = {...value, ...this._properties}
  //     for (let k in value) {
  //       callback.call(this, this.entry(k), k, value[k])
  //     }
  //     for (let k in this._properties) {
  //       // TODO возможно, правильнее при коллизии использовать property
  //       if (!(k in value)) {
  //         const entry = this.entry(k)
  //         callback.call(this, entry, k, entry.get())
  //       }
  //     }
  //   }
  // }

  // ?
  $each(callback) {

    let v = this.get()

    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        callback.call(this, this.$entry(i), i, v)
      }
    }
    else {
      for (let k in v) {
        callback.call(this, this.$entry(k), k, v)
      }
    }
  }

  walk(callback) {
    callback(this)
    for (let i in this.entries) {
      this.entries[i].walk(callback)
    }
  }

  $merge(v) {
    let oldVal = this.get()

    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i]._update('desc')
        }
      }
    }
    else {
      for (let i in v) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i]._update('desc')
        }
      }
    }

    this._update('asc')
  }

  add () {
    throw new 'method add not supported'
  }

  $add (v) {

    let arr = null

    if (this.$id == null) {
      arr = this.src
    }
    else if (this.isNested) {
      arr = this.src.get()[this.$id]
    }
    else {
      arr = this.src[this.$id]
    }

    if (v instanceof Source) {
      if (v.src instanceof Source) {
        console.warn('Changing parent of source', v)
      }
      const _v = v.get()
      this.entries[arr.length] = v
      v.src = this
      v.id = arr.length
      v.isNested = true
      v = _v
    }

    arr.push(v)

    //TODO удалить все entries
    this._update(null, 'add') // ?

    return this.$entry(arr.length-1) // недеемся, что при апдейте ничего добавилось :)
  }

  $insert (i, v) {

    let arr = null

    if (this.$id == null) {
      arr = this.src
    }
    else if (this.isNested) {
      arr = this.src.get()[this.$id]
    }
    else {
      arr = this.src[this.$id]
    }

    arr.splice(i, 0, v)

    for (let j = arr.length-1; j >= i; j--) {
      if (this.entries[j]) {
        this.entries[j].id++
        this.entries[j+1] = this.entries[j]
        delete this.entries[j]
      }
    }

    this._update(null, 'insert') // ?

    return this.$entry(i)
  }


  $firstOf (...args) {
    return this.get.apply(this, args)[0]
  }

  $lastOf (...args) {
    const v = this.get.apply(this, args)
    return v[v.length-1]
  }



  compute (v) {
    console.warn('Compute method is deprecated')
    if (this.options && this.options.computed) {
      for (let i in this.options.computed) {
        const computor = this.options.computed[i]
        v[i] = computor.call(this, v)
      }
      for (let i in this.options.computed) {
        if (this.entries[i]) {
//          this.entries[i].sync(v[i])
          this.entries[i]._update('none', 'compute')
        }
      }
    }
  }

  _updateEntries (nextValue, prevValue) {

    if (Array.isArray(prevValue)) {

      const prevByKey = {}
      for (let i = 0; i < prevValue.length; i++) {
        const key = (this.options.key || defaultKeyResolver)(prevValue[i])
        prevByKey[key] = this.entries[i]
      }

      const nextEntries = []

      for (let i = 0; i < nextValue.length; i++) {
        const key = (this.options.key || defaultKeyResolver)(nextValue[i])
//        if (this.entries[i]) {
//          const id = (this.options.key || defaultKeyResolver)(nextValue[i])
          if (prevByKey[key]) {
            nextEntries[i] = prevByKey[key]
            nextEntries[i].id = i
          }
//        }
      }

      this.entries = nextEntries
    }
  }


  _calc (v) {

    const prevValue = this.cache
    const nextValue = this.options.calc.call(this, v, this.src.$props)

    this._updateEntries(nextValue, prevValue)

//    console.log('recalc', this.entries)

    this._update('desc')

    this.cache = nextValue
  }



  $stream(name, target) {
    const p = this.$props
    if (this._propsProto) {
      const obj = Object.create(this._propsProto)
      obj.key = name
      obj.__target = this
      obj.__source = this
      obj.target = target
      return obj  
    }
    else {
      return new Stream(this, null, name, target)
    }
  }


  get $size () {
    const v = this.get()
    if (Array.isArray(v)) {
      return v.length
    }
    else {
      return Object.keys(v).length
    }
  }

  $isEmpty(...args) {
    const v = this.get.apply(this, args)
    if (v) {
      if (Array.isArray(v)) {
        return v.length == 0
      }
      else if (v.constructor == Object) {
        return Object.keys(v).length == 0
      }
      else {
        return false
      }
    }
    return true
  }

  // get $ () {
  //   if (!this._proxy) {
  //     this._proxy = new Proxy(this, {
  //       set: function (target, property, value) {
  //         target.entry(property).set(value)
  //       },
  //       get: function (target, property) {
  //         if (target.entries[property]) {
  //           return target.entry(property).get()
  //         }
  //         // if (this._properties && this._properties[property]) {
  //         //   return this.entry(property).get()
  //         // }
  //         // return target.get(property)
  //         return target.get(property) //target.entry(property).$
  //       }
  //     })
  //   }
  //   return this._proxy
  // }

  get source () {
    return this.src
  }


  // reg (i, target, event) {
  //   if (!this[i]) {
  //     this[i] = {target}
  //     this[i].done = '@'+i+':done'
  //     this[i].fail = '@'+i+':fail'
  //     this[i].init = '@'+i
  //     this[i].cancel = '@'+i+':cancel'
  //     this[i].n = 1
  //     this[i].ns = ns
  //   }
  //   else {
  //     console.warn('event ['+i+'] already exists')
  //     this[i].n++
  //   }
  // }
  //
  // unreg (i) {
  //   if (--this[i].n == 0) {
  //     delete this[i]
  //   }
  // }

  prop () {
    throw new Error('Unsupported method prop')
  }

  $prop (key, type, calc, idResolver) {
    if (!this._properties) {
      this._properties = {}
    }
    this._properties[key] = {type, calc, idResolver}
  }


  // emit () {
  //   throw new Error('Unsupported method emit')
  // }


  observe (target, callback, channel='') {
    const subscription = {name: '*', target, callback, channels: [channel]}
    this.subscribers.push(subscription)
  }

  unobserve (target) {
    this.subscribers = this.subscribers.filter(s => s.target != target)
  }

  subscribe (name, callback, channels='', target=this) {
    let subscriber = null
    if (arguments.length == 1) {
      subscriber = arguments[0]
    }
    else {
      subscriber = {name, callback, channels: [].concat(channels), target}
    }
    this.subscribers.push(subscriber)
    return subscriber
  }

  unsubscribe (subscriber) {
    const i = this.subscribers.indexOf(subscriber)
    this.subscribers.splice(i, 1)
  }


  emit (name, data, options, channel) {

    const event = (name.constructor == Object) ? name : {name, source: this, data, ...options, channel}

    return this.subscribers
      .filter(t => event.target == null || event.target == t.target)
      .filter(t => event.channel == '*' || t.channels.indexOf(channel) != -1)
      .map(t => t.callback.call(t.target, event, t))

    // this.subscribers.forEach(t => {
    //   if (event.target == null || event.target == t.target) {
    //     if (t.callback) {
    //       t.callback.call(t.target, event, t.key)
    //     }
    //   }
    // })
  }

  _init (target, ch) {


    // if (this.isNested && this.src._updating) {
    //   // пропускаем обновление
    // }
    // else {
//    }

    this.emit('init', null, {target}, ch)

    const data = this.get()
    this.emit('changed', data, {target}, ch)  //TODO нужно только в том случае, если в init не было изменений
  }

  _destroy (target, ch) {
    this.emit('destroy', null, {target}, ch)
  }



  observedBy (target) {
    for (let i = 0; i < this.subscribers.length; i++) {
      if (this.subscribers[i].target == target) {
        return true
      }
    }
    return false
  }




}

Source.Stream = Stream

export default Source
