import {deepClone, hashCode} from './Utils'
import Stream from './Stream'
import Effect from './Effect'




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

    if (this.options && this.options.project) {
      this.isProj = true
    }

    if (this.options.properties) {
      for (let i in this.options.properties) {
        const p = this.options.properties[i]
        this.prop(i, p.type, p.project)
      }
    }

    if (this.options.methods) {
      for (let i in this.options.methods) {
        this.effect(i, this, this.options.methods[i])
      }
    }

    if (this.options.watchers) {
      for (let i in this.options.watchers) {
        this.watch(this.options.watchers[i], this, i)
      }
    }

    if (this.options.effects) {
      for (let i in this.options.effects) {
        this.listen(i, this, this.options.effects[i])
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

      if (this.isProj) {
        v = this.isNested ? this.src.get() : this.src
        v = this.options.project(v)
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

      if (Array.isArray(this.entries)) {
        if (this.entries.length) {
          console.log('need reconcile entries')
        }
      }
      else {
        if (Object.keys(this.entries).length) {
          console.log('need reconcile entries')
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

      if (typeof v == 'function') {
        this.when(v()).emit('set', {params: [k]})
        return this
      }

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

  $update(direction, event, ids, cache) {
    if (!this._updating) {
      this._updating = this
      try {
  //    delete this.cache
//      this.emit('beforeChanged')
        if (this.isNested && direction != 'desc' && direction != 'none') {
          this.src.$update('asc', event, {[this.id]: true}, {[this.id]: cache})
        }

        delete this.cache

        if (this.options && this.options.computed) {
          this.compute(this.get())
        }

        this.emit('changed', {data: this.get(), ids, cache})

        // this.observers.forEach(t => {
        //   t.dataChanged.call(t.target, this.get(), t.key)
        // })

        if (direction != 'asc' && direction != 'none') {
          for (let i in this.entries) {
            this.entries[i].$update('desc', event);
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

  remove(k) {
    if (arguments.length == 0) {
      if (this.isNested) {
        this.src.remove(this.id)
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
              this.entries[i].id = i-1
              delete this.entries[i].cache // кэш надо глубже почистить
              delete this.entries[i]
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
        this.$update('desc', 'remove')
      }
      else {
        this.$update('asc', 'remove')
      }

//      this.targets.forEach(t => t.dataChanged.call(t.target, v))
    }
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
  }


  destroy () {

    if (this.isNested) {
      const i = this.src._removed.indexOf(this)
      this.src._removed.splice(i, 1)
    }

    this.$update('asc')
  }




  stream(callback, filter, sorter, pager) {

    // TODO filter + sorter + pager

    // TODO потоку не обязательно сразу же создавать вложенный observable

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

  // ?
  each(callback) {

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

  insert (i, v) {

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


  firstOf (...args) {
    return this.get.apply(this, args)[0]
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




  use (name, ctor, context) {
    if (!this.effectors) {
      this.effectors = {}
    }
    this.effectors[name] = {ctor, context}
  }

  unuse (name) {
    delete this.effectors[name]
  }

//   init (target) {
// //    console.log('init', target)
//     this.observers.forEach(t => {
//       if (target == null || target == t.target) {
//         t.dataChanged.call(t.target, this.get(), t.key)
//       }
//     })
//   }

  _init (target) {
    this.emit('init', {target, data: this.get(), ns: 'lc'})
  }

  _destroy (target) {
    this.emit('destroy', {target, ns: 'lc'})
  }


  // get snapshot() {
  //   let watching = []
  //   if (this._waiting) {
  //     watching = this._waiting.map(v => v.name || 'effector:'+v.effector)
  //   }
  //   let acting = []
  //   if (this._acting) {
  //     for (let i in this._acting) {
  //       const v = this._acting[i]
  //       acting.push(v.name || 'effector:'+v.effector)
  //     }
  //   }
  //   let events = []
  //   if (this._unresolved) {
  //     for (let i in this._unresolved) {
  //       const v = this._unresolved[i]
  //       events.push('@'+v.name)
  //     }
  //   }
  //   return deepClone({
  //     watching,
  //     acting,
  //     events
  //   })
  // }


  emit (eventName, eventData) {
    try {

    const event = (eventName.constructor == Object) ? eventName : {name: eventName, source: this, ...eventData}

    const groups = event.name.split('.')
    groups.pop()
    event.ns = event.ns || groups.join('.')


    if (this.options.logEvents) {
      console.log(eventName, event)
    }

    if (this._watchers && event.state != 'resumed') {
      const promises = []
      const effects = []
      this._watchers.forEach((watchers, target) => {
        if (true/*!event.target || event.target == target*/) {
          watchers.forEach(watcher => {
            if (watcher.when(event, target)) {
              const result = watcher.callback.call(target, event)
              if (result instanceof Promise) {
                promises.push(result)
              }
              else if (result instanceof Effect) {
                if (result.source != this) {
                  console.warn('Shared effect', result)
                  result.shareWith(this)
                }
                effects.push(result)
              }
            }
          })
        }
      })
      // если есть промисы, то создаем эффект, который ждет их окончания
      if (promises.length > 0) {
        const effect = new Effect(event.name+'-suspend')
        effect.source = this
        Promise.all(promises)
          .then(data => {
            this.emit(effect.done)
          })
          .catch(data => {
            this.emit(effect.fail)
          })
          effects.push(effect)
          this._deferred.push(effect)
      }
      if (effects.length > 0) {
        event.state = 'suspended'
        event.all = effects
      }
    }

    if (event.state == 'suspended') {
      if (!this._suspended) {
        this._suspended = []
      }
      this._suspended.push(event)
      return // ?
    }

    console.log(event.name, event)
    let result = this.resolve(event)


    if (this._deferred && this._deferred.length) {
      this._deferred.forEach(eff => {
        if (!eff.isFinal) {
          if (eff.parent && eff.parent.isFinal) {
//            console.log('finalize parent', eff)
            eff.finalize()
            this.emit(eff.final, {target: eff.target}) // здесь было бы правильно анализировать статус родительского эффекта
          }
          else if (eff.done == event.name || eff.fail == event.name || eff.cancel == event.name) {
//            console.log('finalize self', eff)
            eff.finalize(event.name, event.data)
          }
        }
      })
      this._deferred = this._deferred.filter(eff => !eff.isFinal)
//      debugger
    }

    if (this._suspended && this._suspended.length) {
//      console.log('susp', event.name)
      this._suspended.forEach(evt => {
//        console.log(evt.name, evt.all, event)
        if (evt.state != 'suspended') {
          return // FIXME emit нужно вызывать только после удаления события из списка
        }
        if (evt.ns == event.ns && event.ns) {
//          evt.state = 'canceled'
          for (let i = evt.all.length-1; i >= 0; i--) {
//            evt.all[i].finalize(evt.all[i].cancel)
            this.emit(evt.all[i].cancel, {data: '#canceled'})
          }
          console.log('event conflict', evt, event)
        }
        for (let i = evt.all.length-1; i >= 0; i--) {
          if (evt.all[i].isCanceled) {
//            debugger
            evt.state = 'canceled'
            break
          }
          if (evt.all[i].isFinal) {
            evt.all.splice(i, 1)
          }
        }
        if (evt.state == 'canceled') {
          this.emit(new Effect(evt.name).cancel, {target: evt.target})
        }
        else if (evt.all.length == 0) {
          console.log('resume', evt)
          evt.state = 'resumed'
          this.emit(evt)
        }
      })
      this._suspended = this._suspended.filter(evt => evt.state == 'suspended')
    }

    return result
    }
    catch (err) {
      console.error(err)
    }
  }

  resolve (event) {

    if (event.state == 'resumed') {
      console.log('resolve resumed', event)
    }

    this.observers.forEach(t => {
      if (event.target == null || event.target == t.target) {
        if (t.dataChanged) {
          t.dataChanged.call(t.target, event, t.key)
        }
      }
    })

    const results = []

    if (this._listeners) {
      this._listeners.forEach((listeners, target) => {
        if (event.target == null || event.target == target) {
          const listener = listeners[event.name]
//          const policy = this._policices && this._policies[event.name]
          const key = listeners['key']
          if (listener) {

//            console.log('listener', listener.type)

            let result = null
            if (listener.type == 'method') {
              result = event.params
                ? listener.callback.apply(target, [...event.params, key])
                : listener.callback.call(target, event.data, key)
            }
            else {
              result = listener.callback.call(target, event, target)
            }


            if (result instanceof Promise) {
              // событие имеет отложенное исполнение
              const effect = new Effect(event.name)
              effect.source = this
              effect.target = target
              effect.policy = event.policy || listener.policy
//              effect.promise = result
              effect.ns = event.ns

              console.log('ns', event.ns)

              if (this._deferred) {
                this._deferred.forEach(eff => {
                  if (eff.name == effect.name || (effect.ns && eff.ns == effect.ns)) {
                    if (effect.policy == 'abandon') {
                      this.emit(effect.reject)
                      effect.finalize(effect.reject)
                    }
                    else {
                      // по умолчанию отменяем эффект
                      this.emit(eff.cancel, {data: '#canceled'})
//                      eff.finalize(eff.cancel)
                    }
                  }
                })
              }

              if (!effect.isFinal) {

                result
                  .then(data => {
                    if (!effect.isFinal) {
//                      console.log('done', effect)
                      this.emit(effect.done, {data, target})
                    }
                  })
                  .catch(data => {
                    if (!effect.isFinal) {
                      if (data instanceof Effect) {
                        if (data.isCanceled) {
                          this.emit(effect.cancel, {data, target})
                        }
                        else {
                          debugger
                        }
                      }
                      else {
                        this.emit(effect.fail, {data, target})
                      }
                    }
                  })

                if (!this._deferred) {
                  this._deferred = []
                }
                this._deferred.push(effect)
              }

              result = effect
            }
            else if (result instanceof Effect) {
              const effect = new Effect(event.name)
              effect.parent = result
              effect.target = event.target
              effect.ns = event.ns
              if (result.source != this) {
                console.warn('Shared effect', result)
                result.shareWith(this)
              }
      //        console.log('parent effect', result, event)
              // TODO здесь нужно связать эффекты, в т.ч. отмену
              this._deferred.push(effect)
            }
            else if (result != undefined) {
              const effect = new Effect(event.name)
              this.emit(effect.done, {data: result, target: event.target})
            }

            results.push(result)
          }
        }
      })
    }

    if (results.length > 1) {
      console.warn('multiple results', results)
    }

    return results[0]
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
          target.set(property, value)
        },
        get: function (target, property) {
          // if (this._properties && this._properties[property]) {
          //   return this.entry(property).get()
          // }
          // return target.get(property)
          return target.entry(property).get()
        }
      })
    }
    return this._proxy
  }


  computed (name, target, computor) {
    this.comp({[name]: computor}, target)
  }



  comp (computors, target) {
    if (!this._computors) {
      this._computors = new Map()
    }
    this._computors[target] = computors
    if (!this.options.computed) {
      this.options.computed = {}
    }
    Object.assign(this.options.computed, computors)
    for (let i in computors) {
      this.options.computed[i] = computors[i].bind(target)
      this.compute(this.get())
    }
  }

  uncomp (target) {
    if (this._computors) {
      const computors = this._computors.get(target)
      for (let i in computors) {
        delete this.options.computed[i]
      }
    }
  }

  on (listeners={}, target) {
    if (!this._listeners) {
      this._listeners = new Map()
    }
    let l = this._listeners.get(target)
    if (!l) {
      if (!this._key) {
        console.warn('key not defined!')
      }
      l = {key: this._key}
    }
    for (let i in listeners) {
      const groups = i.split('.')
      const k = groups.pop()
      const ns = groups.join('.')

      // let effector = null
      // let g = this
      // for (let j in groups) {
      //   if (!g[j]) {
      //
      //   }
      // }
      if (!this[i]) {
        this[i] = (...args) => {
//          try {
            return this.emit('@'+i, {params: [...args], type: 'resolve'/*, target*/})
          // }
          // catch (err) {
          //   console.error(err)
          // }
        }
        this[i].done = '@'+i+':done'
        this[i].fail = '@'+i+':fail'
        this[i].init = '@'+i
        this[i].cancel = '@'+i+':cancel'
        this[i].n = 1
        this[i].ns = ns

        if (typeof listeners[i] == 'function') {
          l['@'+i] = {callback: listeners[i], type: 'method'}
        }
        else {
          if (listeners[i].init) {
            l['@'+i] = {callback: listeners[i].init, type: 'method', policy: listeners[i].policy}
          }
          if (listeners[i].done) {
            l['@'+i+':done'] = {callback: listeners[i].done, type: 'method'}
          }
          if (listeners[i].fail) {
            l['@'+i+':fail'] = {callback: listeners[i].fail, type: 'method'}
          }
        }

      }
      else {
        console.warn('method ['+i+'] already exists')
        this[i].n++
      }
    }
    this._listeners.set(target, l)
  }

  off (target) {
    if (this._listeners) {
      if (this._listeners.has(target)) {
        // поверяем, нужно ли удалить метод
        const l = this._listeners.get(target)
        for (let i in l) {
          const method = this[i.substr(1)]
          if (i != 'key' && method) {
            if (--method.n == 0) {
              console.log('delete method', i)
              delete this[i.substr(1)]
            }
          }
        }
        this._listeners.delete(target)
      }
    }
  }

  listen (name, target, callback, policy) {
    if (!this._listeners) {
      this._listeners = new Map()
    }
    let tl = this._listeners.get(target)
    if (!tl) {
      if (!this._key) {
        console.warn('key not defined!')
      }
      tl = {key: this._key}
      this._listeners.set(target, tl)
    }
    tl['@'+name] = {callback, policy}
  }

  unlisten (target) {
    if (this._listeners) {
      this._listeners.delete(target)
    }
  }

  effect (name, target, func) {
    this.on({[name]: func}, target)
    return this[name]
  }

  watch (when, target, callback) {
    if (!this._watchers) {
      this._watchers = new Map()
    }
    let watchers = this._watchers.get(target)
    if (!watchers) {
      watchers = []
      this._watchers.set(target, watchers)
    }

    const watcher = {when, callback}

    const i = callback

    if (typeof callback == 'string') {
      watcher.callback = (e) => {
        return this.emit('@'+i, {params: e.params, target: e.target, data: e.data})
      }
    }

    if (typeof when == 'string') {
      watcher.when = (e) => e.name == when
    }
    else if (when.constructor == Object) {
      const w = when
      if (w.init) {
        this.listen(i, target, w.init, w.policy)
      }
      if (w.done) {
        this.listen(i+':done', target, w.done)
      }
      if (w.fail) {
        this.listen(i+':fail', target, w.fail)
      }
      if (w.cancel) {
        this.listen(i+':cancel', target, w.cancel)
      }
      watcher.when = w.when
    }

    watchers.push(watcher)
  }

  unwatch (target) {
    if (this._watchers) {
      this._watchers.delete(target)
    }
  }


  prop (key, type, project) {
    if (!this._properties) {
      this._properties = {}
    }
    this._properties[key] = {type, project}
  }

  purge (target) {
    if (this._deferred) {
      this._deferred = this._deferred.filter(eff => eff.target != target)
    }
    if (this._suspended) {
      this._suspended = this._suspended.filter(evt => evt.target != target)
    }
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

  static Stream = Stream
}


export default Source
