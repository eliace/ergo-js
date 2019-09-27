import {deepClone, hashCode, defaultIdResolver, createPropsProto} from './Utils'
import Stream from './Stream'


class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, o, k) {
    this.id = k
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

    if (opts.initial) {
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
          this.$prop(i, null, p)
        }
        else {
          this.$prop(i, p.type, p.calc, p.idResolver)
        }
      }

      // ?
      // прокси-хелпер для опций
      this.props = {__target: this}

      const instOptProto = createPropsProto(this.options.properties)
      Object.setPrototypeOf(this.props, instOptProto)
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

  get(k) {

    let v = null
    if (arguments.length == 0) {

      if (this.removed) {
        return this.cache
      }

      if (this.isCalc) {
        if (this.cache == null) {
//          console.log('calc', this.cache, this.id)
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
      else if (this.id == null) {
        v = this.src
      }
      else if (this.isNested) {
        v = this.src.get()
        v = v && v[this.id]
      }
      else {
        v = this.src[this.id]
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
      if (this.id == null) {
        this.src = v
      }
      else if (this.isNested) {
        this.src.get()[this.id] = v
      }
      else {
        this.src[this.id] = v
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
      this._update(null, 'set', {[this.id]: true}, cache) // ?
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

          if (this.id == null) {
            this.src[k] = v
          }
          else if (this.isNested) {
            this.src.get()[this.id][k] = v
          }
          else {
            this.src[this.id][k] = v
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
      if (this.id == null) {
        this.src = !this.src
      }
      else {
        let v = this.isNested ? this.src.get() : this.src
        v[this.id] = !v[this.id]
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
        if (this.id == null) {
          this.src[k] = !this.src[k]
        }
        else {
          let v = this.isNested ? this.src.get()[this.id] : this.src[this.id]
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
  //   //     delete this.src.entries[this.id]
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
          this.src._update('asc', event, {[this.id]: true}, {[this.id]: prevValue})
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

  $remove(k) {
    if (arguments.length == 0) {
      if (this.isNested) {
        this.src.$remove(this.id)
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

  find (itemOrFilter) {
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


  $add (v) {

    let arr = null

    if (this.id == null) {
      arr = this.src
    }
    else if (this.isNested) {
      arr = this.src.get()[this.id]
    }
    else {
      arr = this.src[this.id]
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

    if (this.id == null) {
      arr = this.src
    }
    else if (this.isNested) {
      arr = this.src.get()[this.id]
    }
    else {
      arr = this.src[this.id]
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

      const entriesByKey = {}
      for (let i = 0; i < prevValue.length; i++) {
        const id = (this.options.idResolver || defaultIdResolver)(prevValue[i])
        entriesByKey[id] = this.entries[i]
      }

      const nextEntries = []

      for (let i = 0; i < nextValue.length; i++) {
        if (this.entries[i]) {
          const id = (this.options.idResolver || defaultIdResolver)(nextValue[i])
          if (entriesByKey[id]) {
            nextEntries[i] = entriesByKey[id]
            nextEntries[i].id = i
          }
        }
      }

      this.entries = nextEntries
    }
  }


  _calc (v) {

    const prevValue = this.cache
    const nextValue = this.options.calc.call(this, v, this.src.props)

    this._updateEntries(nextValue, prevValue)

    this.cache = nextValue
//    console.log('recalc', this.entries)

    this._update('desc')
  }



  $stream(name) {
    return new Stream(this, null, name, this.options.idResolver)
  }


  $size () {
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

  get $source () {
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

    this.emit('init', null, {target, ns: 'lc'}, ch)

    const data = this.get()
    this.emit('changed', data, {target/*, ns: 'lc'*/}, ch)  //TODO нужно только в том случае, если в init не было изменений
  }

  _destroy (target, ch) {
    this.emit('destroy', null, {target, ns: 'lc'}, ch)
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
