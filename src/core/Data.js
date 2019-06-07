import {deepClone} from './Utils'

class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, k) {
    this.id = k
    this.src = v
    this.entries = {}// Array.isArray(v) ? [] : {}
    this.observers = []
    this.isNested = v instanceof Source
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

      v = v[k]
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

    return v
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
      this.observers.forEach(t => {
        t.dataChanged.call(t.target, this.get(), t.key)
        // let v = this.get()
        // if (typeof t.dataChanged == 'function') {
        //   t.dataChanged.call(t.target, v, t.key)
        // }
        // else {
          // for (let i = 0; i < t.dataChanged.length; i++) {
          //   v = t.dataChanged[i].call(t.target, v, t.key)
          //   if (v === undefined) break // обеспечивает безусловное исполнение первого элемента цепочки
          // }
//        }
//        t.dataChanged.call(t.target, this.get()/*, this*/, t.key)
        // if (t.dataEffects) {
        //   t.dataEffects.call(t.target, 'done', this.get(), {event})
        // }
      })

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


  notify2 (event, data, target) {
    this.observers.forEach(t => {
      if (target == null || target == t.target) {
        if (t.dataEffects) {
          t.dataEffects.call(t.target, event, data, t.key)
        }
      }
    })
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

  init (target) {
//    console.log('init', target)
    this.observers.forEach(t => {
      if (target == null || target == t.target) {
        t.dataChanged.call(t.target, this.get(), t.key)
      }
    })
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

    if (this[event.name]) {
      this.tryResolve(event)
    }
    else {
//      console.log ('[do]-'+event.name, this.snapshot)
      this.observers.forEach(t => {
        if (event.target == null || event.target == t.target) {
          if (t.dataEffects) {
            t.dataEffects.call(t.target, event, t.key)
          }
        }
      })
      event.resolved = true
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

    let result = null

    if (effect.effector) {
      if (typeof effect.effector === 'function') {
        effect.resolver = effect.resolver || effect.effector        
      }
      else {
        const effector = this.effectors[effect.effector]
        effect.resolver = effect.resolver || effector.ctor
        effect.target = effect.target || effector.context
        effect.name = effect.name || effect.effector
      }
    }

    //  время решать эффект
    if (typeof effect.resolver == 'function') {
      result = effect.resolver.apply(effect.target, effect.params || event.params || [event.data])
    }
    else {
      result = effect.params || event.params || [event.data]
    }

    if (result instanceof Promise) {
      result
        .then(v => {
          // убираем эффект из списка активных
          delete this._acting[effect.id]
          this.emit(effect.name+':done', {data: v, originalKey: effect.eventKey, originalEvent: effect.originalEvent})
          if (v !== undefined) {
            effect.originalEvent.params = [v]
            effect.originalEvent.data = v
          }
          this.tryResolve(effect.originalEvent)
        })
    }
    else {
      delete this._acting[effect.id]
    }

    this.emit(effect.name, {data: result, originalKey: effect.eventKey, originalEvent: effect.originalEvent})
  }

  tryResolve (event) {

//    console.log('[try]-'+event.name, this.snapshot)

    if (this[event.name]) {
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

          this.observers.forEach(t => {
            if (event.target == null || event.target == t.target) {
              if (t.dataEffects) {
                t.dataEffects.call(t.target, event, t.key)
              }
            }
          })

          if (this._unresolved && this._unresolved[event.key]) {
            delete this._unresolved[event.key]
          }

//          console.log('[try]-'+event.name, 'OK')

          return result
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

}


export default Source
