import {deepClone, hashCode} from './Utils'
import Stream from './Stream'


let updateSet = null


class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, o, k) {
    this.id = k
    this.src = v
    this.entries = {}// Array.isArray(v) ? [] : {}
    this.observers = []
    this.isNested = v instanceof Source
    this.options = o || {}

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
      this.join(this, (evt) => {
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
        this.prop(i, p.type, p.calc)
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

  get(k) {

    let v = null
    if (arguments.length == 0) {

      if (this.removed) {
        return this.cache
      }

      if (this.isCalc) {
        if (this.cache == null) {
          console.log('calc', this.cache, this.id)
          v = this.isNested ? this.src.get() : this.src
          v = this.options.calc(v)
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
        return this.entry(k).get()
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

      if (Array.isArray(v)) {
        if (Object.keys(this.entries).length) {
          console.log('need to reshake entries')
          for (let i in this.entries) {
            const entry = this.entries[i]
            if (entry.isCalc) {
              continue
            }
            else if (entry.removed && Number(i) < v.length) {
              delete entry.removed
            }
            else if (!entry.removed && Number(i) >= v.length) {
              entry.removed = true
            }
          }
        }
      }
      else {
        if (Object.keys(v).length) {
          console.log('need to reshake entries')
        }
      }

      //TODO возможно, сброс всех кэшей должен быть не здесь
      // for (let i in this.entries) {
      //
      // }

      //TODO удалить все entries
      this.$update(null, 'set', {[this.id]: true}, cache) // ?
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
          this.$update('asc', 'set', {[k]: true}, {[k]: cache})
        }

        // if (this.entries[k]) {
        //   delete this.entries[k].cache
        //   this.entries[k].update()
        // }
        // else {
//          this.update()
//        }
        // delete this.cache
        // this.entry(k).update()
      }
    }

    return this
  }

  toggle(k) {
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

      this.$update() // ?
    }
    else {
      if (this.entries[k]) {
        this.entries[k].toggle()
      }
      else {
        if (this.id == null) {
          this.src[k] = !this.src[k]
        }
        else {
          let v = this.isNested ? this.src.get()[this.id] : this.src[this.id]
          v[k] = !v[k]
        }
        this.$update('asc')
      }
    }
  }

  join(target, dataChanged, dataRemoved, key, dataEffects) {
    this.observers.push({target, dataChanged, dataRemoved, key, dataEffects})
    if (!this._listeners) {
      this._listeners = new Map()
    }
    this._listeners.set(target, {key})
  }

  unjoin(target) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i].target == target) {
        this.observers.splice(i, 1)
        break
      }
    }

    // if (this.observers.length == 0 && this.isNested) {
    //   let n = Array.isArray(this.entries) ? this.entities.length : Object.keys(this.entries).length
    //   if (!n) {
    //     delete this.src.entries[this.id]
    //   }
    // }
  }


  $invalidate () {
    delete this.cache
    for (let i in this.entries) {
      if (this.entries[i].cache != null) {
        this.entries[i].$invalidate()
      }
    }
  }


  $update(direction, event, ids, cache) {
    if (!this._updating && !this.removed) {
      this._updating = this
      try {
  //    delete this.cache
//      this.emit('beforeChanged')
        if (this.isNested && direction != 'desc' && direction != 'none') {
          this.src.$update('asc', event, {[this.id]: true}, {[this.id]: cache})
        }

        if (this.cache != null) {
          this.$invalidate()
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

        this.emit('changed', {data: this.get(), ids, cache})

//        updateQueue.push({source: this, ids, cache})

        // this.observers.forEach(t => {
        //   t.dataChanged.call(t.target, this.get(), t.key)
        // })

        if (direction != 'asc' && direction != 'none') {
          for (let i in this.entries) {
            this.entries[i].$update('desc', event);
          }
        }
        // ?
        else if (this._properties) {
          for (let i in this._properties) {
            if (this._properties[i].calc && this.entries[i]) {
              this.entries[i].$calc(this.get())
            }
          }

        }
      }
      catch (err) {
        console.error(err)
      }
//      this.emit('afterChanged')
      delete this._updating
    }
  }

  entry(k) {
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
        this.$update(null, 'remove')
      }
      else {
        this.$update('asc', 'remove')
      }

//      this.targets.forEach(t => t.dataChanged.call(t.target, v))
    }
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
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




  stream(callback) {

    const value = this.get()
    const props = this._properties

    if (Array.isArray(value)) {
      // обходим элементы массива в порядке индексов
      for (let i = 0; i < v.length; i++) {
        callback.call(this, this.entry(i), i, value[i])
      }
    }
    else {
      const allProps = {...value, ...this._properties}
      for (let k in value) {
        callback.call(this, this.entry(k), k, value[k])
      }
      for (let k in this._properties) {
        // TODO возможно, правильнее при коллизии использовать property
        if (!(k in value)) {
          const entry = this.entry(k)
          callback.call(this, entry, k, entry.get())
        }
      }
    }
  }

  // ?
  $each(callback) {

    let v = this.get()

    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        callback.call(this, this.entry(i), i, v)
      }
    }
    else {
      for (let k in v) {
        callback.call(this, this.entry(k), k, v)
      }
    }
  }

  walk(callback) {
    callback(this)
    for (let i in this.entries) {
      this.entries[i].walk(callback)
    }
  }

  mergeWith(v) {
    let oldVal = this.get()

    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i].$update('desc')
        }
      }
    }
    else {
      for (let i in v) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i].$update('desc')
        }
      }
    }

    this.$update('asc')
  }


  add (v) {

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

    arr.push(v)

    //TODO удалить все entries
    this.$update(null, 'add') // ?

    return this.entry(arr.length-1) // недеемся, что при апдейте ничего добавилось :)
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

    this.$update(null, 'insert') // ?

    return this.entry(i)
  }


  $firstOf (...args) {
    return this.get.apply(this, args)[0]
  }

  $lastOf (...args) {
    const v = this.get.apply(this, args)
    return v[v.length-1]
  }



  compute (v) {
    if (this.options && this.options.computed) {
      for (let i in this.options.computed) {
        const computor = this.options.computed[i]
        v[i] = computor.call(this, v)
      }
      for (let i in this.options.computed) {
        if (this.entries[i]) {
//          this.entries[i].sync(v[i])
          this.entries[i].$update('none', 'compute')
        }
      }
    }
  }


  $calc (v) {
    v = this.cache = this.options.calc(v)

    if (Array.isArray(v)) {
      if (Object.keys(this.entries).length) {
        console.log('need to reshake entries')
        // for (let i in this.entries) {
        //   const entry = this.entries[i]
        //   if (entry.isCalc) {
        //     continue
        //   }
        //   else if (entry.removed && Number(i) < v.length) {
        //     delete entry.removed
        //   }
        //   else if (!entry.removed && Number(i) >= v.length) {
        //     entry.removed = true
        //   }
        // }
      }
    }

//    console.log('recalc', this.entries)

    this.$update('desc')
  }








  asStream(name) {
    return new Stream(this, null, name)
  }


  size () {
    const v = this.get()
    if (Array.isArray(v)) {
      return v.length
    }
    else {
      return Object.keys(v).length
    }
  }

  isEmpty(...args) {
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

  hashCode () {
    return hashCode(this.get())
  }

  get $ () {
    if (!this._proxy) {
      this._proxy = new Proxy(this, {
        set: function (target, property, value) {
          target.entry(property).set(value)
        },
        get: function (target, property) {
          if (target.entries[property]) {
            return target.entry(property).get()
          }
          // if (this._properties && this._properties[property]) {
          //   return this.entry(property).get()
          // }
          // return target.get(property)
          return target.get(property) //target.entry(property).$
        }
      })
    }
    return this._proxy
  }

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

  prop (key, type, calc) {
    if (!this._properties) {
      this._properties = {}
    }
    this._properties[key] = {type, calc}
  }



  emit (eventName, eventData) {

    const event = (eventName.constructor == Object) ? eventName : {name: eventName, source: this, ...eventData}

    this.observers.forEach(t => {
      if (event.target == null || event.target == t.target) {
        if (t.dataChanged) {
          t.dataChanged.call(t.target, event, t.key)
        }
      }
    })
  }

  _init (target) {

    const data = this.get()

    if (this.isNested && this.src._updating) {
      // пропускаем обновление
    }
    else {
      this.emit('changed', {target, data/*, ns: 'lc'*/})  // change?
    }

    this.emit('init', {target, data, ns: 'lc'})
  }

  _destroy (target) {
    this.emit('destroy', {target, ns: 'lc'})
  }



  hasListener (target) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i].target == target) {
        return true
      }
    }
    return false
  }




  // ns () {
  //   const keys = []
  //   let s = this
  //   while (s) {
  //     if (s.id) {
  //       keys.push(s.id)
  //     }
  //     s = s.src
  //   }
  //   return keys.join(':')
  // }

//  static Stream = Stream
}

Source.Stream = Stream

export default Source
