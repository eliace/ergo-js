import {deepClone} from './Utils'



class Stream {

  constructor (src, data, key) {
    this.src = src
    this.data = data
    this.key = key
  }

  filter (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.filter((itm) => f(itm[0])), this.key)
  }

  map (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.map(itm => [f(itm[0]), itm[1]]), this.key)
  }

  forEach (f) {
    if (this.data) {
      this.data.forEach(itm => f(itm[0]))
    }
    else {
      this.src.get().forEach(f)
    }
    return this
  }

  sort (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, [...d].sort((a, b) => f(a[0], b[0])), this.key)
  }

  first () {
    let i = this.data ? this.data[0][1] : 0
    return this.src.entry(i)
  }

  last () {
    let i = this.data ? this.data[this.data.length-1][1] : this.src.size()-1
    return this.src.entry(i)
  }

  range (offset, limit) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.slice(offset, offset+limit), this.key)
  }

  entries (f) {
    if (this.data) {
      this.data.forEach(itm => f(this.src.entry(itm[1]), itm[1]))
    }
    else {
      const v = this.src.get()
      for (let i in v) {
        f(this.src.entry(i), i)
      }
    }
  }

  name (k) {
    return new Stream(this.src, this.data, k)
  }
}






class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, k, o) {
    this.id = k
    this.src = v
    this.entries = {}// Array.isArray(v) ? [] : {}
    this.observers = []
    this.isNested = v instanceof Source
    this.options = o

    if (this.options && this.options.computed) {
      this.compute(this.get())
    }
//    this.effects = {}
//    this.isArray = Array.isArray(k == null ? v)
  }

  get(k) {

    let v = null
    if (arguments.length == 0) {
      if (this.id == null) {
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

      // if (this.options && this.options.model && this.options.model[k] && this.options.model[k].get) {
      //   v = this.options.model[k].get.call(this, v)
      // }
      // else {
        v = v[k]
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
      delete this.cache

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
      //TODO удалить все entries
      this.update(null, 'set') // ?
    }
    else {
//      console.log('set', k, v)
      if (Array.isArray(k)) {
        // TODO k может быть массивом
      }
      else {
        if (this.entries[k]) {
          this.entries[k].set(v)
        }
        else {
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
          this.update('asc', 'set')
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

      this.update() // ?
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
        this.update('asc')
      }
    }
  }

  join(target, dataChanged, dataRemoved, key, dataEffects) {
    this.observers.push({target, dataChanged, dataRemoved, key, dataEffects})
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

  update(direction, event) {
    if (!this._updating) {
      this._updating = true
  //    delete this.cache
      if (this.isNested && direction != 'desc' && direction != 'none') {
        this.src.update('asc', event)
      }

      if (this.options && this.options.computed) {
        this.compute(this.get())
      }

      this.emit('changed', {data: this.get()})
      // this.observers.forEach(t => {
      //   t.dataChanged.call(t.target, this.get(), t.key)
      // })

      if (direction != 'asc' && direction != 'none') {
        for (let i in this.entries) {
          this.entries[i].update('desc', event);
        }
      }
      this._updating = false
    }
  }

  entry(k) {
    let e = this.entries[k]
    if (e == null) {
      e = new Source(this, k)
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
//        let entry = this.entries[k]
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
        else {
          delete this.entries[k]
        }
        this.update(null, 'remove')
      }

//      this.targets.forEach(t => t.dataChanged.call(t.target, v))
    }
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
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
          this.entries[i].update('desc')
        }
      }
    }
    else {
      for (let i in v) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i].update('desc')
        }
      }
    }

    this.update('asc')
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
    this.update(null, 'add') // ?

    return this.entry(arr.length-1) // недеемся, что при апдейте ничего добавилось :)
  }

  compute (v) {
    if (this.options && this.options.computed) {
      for (let i in this.options.computed) {
        const computor = this.options.computed[i]
        v[i] = computor.call(this, v)
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
  this.emit('init', {target, data: this.get()})
}


  get snapshot() {
    let watching = []
    if (this._waiting) {
      watching = this._waiting.map(v => v.name || 'effector:'+v.effector)
    }
    let acting = []
    if (this._acting) {
      for (let i in this._acting) {
        const v = this._acting[i]
        acting.push(v.name || 'effector:'+v.effector)
      }
    }
    let events = []
    if (this._unresolved) {
      for (let i in this._unresolved) {
        const v = this._unresolved[i]
        events.push('@'+v.name)
      }
    }
    return deepClone({
      watching,
      acting,
      events
    })
  }


  emit (eventName, eventData, eventTarget) {

    const pre = []
    const post = []


    // генерирем ключ события
    let eventKey = '_' + Math.random().toString(16).slice(2)

    // обрабатываемое событие
    let event = {name: eventName, key: eventKey, target: eventTarget, ...eventData}

//    console.log (event.name, this.snapshot)

    // после появления события, необходимо проверить, есть ли готовые к активации эффекты
    if (this._waiting) {
      for (let i = this._waiting.length-1; i >= 0; i--) {
        let eff = this._waiting[i]
        if (eff.watch) {
          if (eff.watch.call(this, event, this)) {
            // если эффект начал работу, убираем его из списка на ожидании
            this._waiting.splice(i, 1)
            // активируем эффект
            const activated = this.activate(eff)
            if (activated.mode == 'pre') {
              pre.push(activated)
            }
            else {
              post.push(activated)
            }
          }
        }
        else {
          // если эффект начал работу, убираем его из списка на ожидании
          this._waiting.splice(i, 1)
          // эффекты, у которых нет наблюдения, активируются после первого события
          const activated = this.activate(eff)
          if (activated.mode == 'pre') {
            pre.push(activated)
          }
          else {
            post.push(activated)
          }
        }
      }
    }

    // Пре-эффекты
    for (let i = 0; i < pre.length; i++) {
      this.prepare(pre[i], event)
    }

    if (this._acting && Object.keys(this._acting).length) {//this[event.name]) {

      this.tryResolve(event)

      if (this._acting[event.effectId]) {
        const baseEffect = this._acting[event.effectId]
        if (baseEffect[event.effectStage]) {
          baseEffect[event.effectStage].call(baseEffect.target, event.data)
        }
      }

    }
    else {
      event.resolved = true
//      console.log ('[do]-'+event.name, this.snapshot)
      this.observers.forEach(t => {
        if (event.target == null || event.target == t.target) {
          if (t.dataChanged) {
            t.dataChanged.call(t.target, event, t.key)
          }
        }
      })

//      event.resolved = true
    }

    // Пре-эффекты
    for (let i = 0; i < post.length; i++) {
      this.prepare(post[i], event)
    }


    // пробуем сохранить оригинальное сообщение
    if (!event.resolved) {
      if (!this._unresolved) {
        this._unresolved = {}
      }
      if (!this._unresolved[event.key]) {
        this._unresolved[event.key] = event
      }
    }

    return this
  }

  activate (effect) {

    if (!this._acting) {
      this._acting = {}
    }

    let activated = null

    if (typeof effect == 'string') {
      // ищем эффектор
      activated = {name: effect}
    }
    else {
      activated = effect
    }

    activated.id = '_' + Math.random().toString(16).slice(2)

    this._acting[activated.id] = activated

    return activated
  }

  prepare (effect, event) {

    // помечаем эффект ключем вызвавшего его события
    effect.eventKey = event.originalKey || event.key
    effect.originalEvent = event.originalEvent || event

    let result = effect.params || event.params || [event.data]

    if (effect.effector) {
      if (typeof effect.effector === 'function') {
        effect.resolver = effect.resolver || effect.effector
      }
      else {
        const effector = this.effectors[effect.effector]
        effect.target = effect.target || effector.context
        effect.name = effect.name || effect.effector
        effect.source = this
        const defaultEffect = effector.ctor.apply(effect.target, result)
        if (defaultEffect.constructor == Object) {
          effect = {...defaultEffect, ...effect}
        }
        else {
          result = defaultEffect
//          effect.resolver = effect.resolver || defaultEffect
        }
//        effect.resolver = effect.resolver || effector.ctor
      }
    }

    //  время решать эффект
    if (typeof effect.resolver == 'function') {
      result = effect.resolver.apply(effect.target, result)//effect.params || event.params || [event.data])
    }

    // else {
    //   result = effect.resolver
    // }
    // else {
    //   result = effect.params || event.params || [event.data]
    // }

    if (result instanceof Promise) {
      result
        .then(v => {
          // убираем эффект из списка активных
          delete this._acting[effect.id]
          this.emit(effect.name+':done', {data: v, originalKey: effect.eventKey, originalEvent: effect.originalEvent})

          if (effect.done) {
            effect.done.call(effect.target, v)
          }

          if (v !== undefined) {
            effect.originalEvent.params = [v]
            effect.originalEvent.data = v
          }

          this.tryResolve(effect.originalEvent)

        })
        .catch(err => {
          console.error(err);
        })

        if (result.active) {
          result.active(v => {
            this.emit(effect.name+':active', {data: v, originalKey: effect.eventKey, originalEvent: effect.originalEvent})

            if (effect.active) {
              effect.active.call(effect.target, v)
            }

          })
        }
    }
    else {
      delete this._acting[effect.id]
    }

    this.emit(effect.name, {data: result, originalKey: effect.eventKey, originalEvent: effect.originalEvent})

    if (effect.ready) {
      effect.ready.call(effect.target, result)
    }


    // if (typeof effect.animation == 'function') {
    //   requestAnimationFrame(() => {
    //     effect.animation.call(effect.target)
    //     this.emit(effect.name+':active', {data: result})
    //     if (effect.active) {
    //       effect.active.call(effect.target, result)
    //     }
    //   })
    // }


  }

  tryResolve (event) {

//    console.log('[try]-'+event.name, this.snapshot)

//    if (this[event.name]) {
    let readyToResolve = true
    if (this._acting) {
//        console.log('tryResolve', this._acting, event)
      for (let i in this._acting) {
        if (this._acting[i].eventKey == event.key) {
          readyToResolve = false
          break
        }
      }
    }
    if (readyToResolve) {
      if (event.resolved) {
        console.warn('Event already resolved', event)
      }
      else {
        event.resolved = true

        if (this[event.name]) {

          let result = null
          // if (event.name != 'init') {
          //   debugger
          // }

//          console.log('result', event, result)

          if ('params' in event) {
            result = this[event.name].apply(this, event.params)
          }
          else if ('data' in event) {
            result = this[event.name](event.data)
          }
          else {
            result = this[event.name]()
          }

//          console.log('[try]-'+event.name, 'OK')

//          return result
        }

        this.observers.forEach(t => {
          if (event.target == null || event.target == t.target) {
            if (t.dataChanged) {
              t.dataChanged.call(t.target, event, t.key)
            }
          }
        })

        if (this._unresolved && this._unresolved[event.key]) {
          delete this._unresolved[event.key]
        }

      }
    }

//    console.log('[try]-'+event.name, 'BAD')
  }


  wait (effects) {

    if (!this._waiting) {
      this._waiting = []
    }

    for (let i = 0; i < effects.length; i++) {
      this._waiting.push(effects[i])
    }

    return this
  }

  when(effects) {
    return this.wait(effects)
  }

  then (effects) {
    return this.wait(effects).emit('_')
  }

  and() {
    return this
  }



  asStream() {
    return new Stream(this)
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
