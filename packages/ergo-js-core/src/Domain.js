import Source from './Source'
import Effect from './Effect'
import Event from './Event'

//const CH_DEFAULT = 'default'


// const uuid = () => {
//   return Math.random().toString(36).substr(2, 9)
// }


class Domain extends Source {

  // constructor (src, name) {
  //   this.src = src || new Source()
  //   this.name = name
  // }
  constructor (v, options, k) {
    super(v, options, k)

//    this.watchers = []
//    this.subscribers = []
    this.effects = {}
    this.actions = {}

    const o = this.options

    if (o.actions) {
      for (let i in o.actions) {
        this.createAction(i, o.actions[i])
      }
    }

    if (o.effects) {
      for (let i in o.effects) {
        this.createEffect(i, o.effects[i])
      }
    }

    if (o.events) {
      for (let i in o.events) {
        this.createEvent(i, o.events[i], o.events[i].channel)
      }
    }

    // if (o.watchers) {
    //   for (let i in o.watchers) {
    //     const watcher = o.watchers[i]
    //     if (typeof watcher === 'function') {
    //       // слушатель изменения свойств
    //       this.createWatcher(i, watcher)
    //     }
    //   }
    // }

  }


  _channel (ch) {
    return this.subscribers.filter(s => /*!s.channels ||*/ ch == '*' || s.channels.indexOf(ch) != -1)
  }

  // _watcher (ch) {
  //   return this.watchers.filter(s => s.channels.indexOf(ch) != -1)
  // }

  _reduce (v, event) {
    if (Array.isArray(v) && v.length > 0 && event.options.reducer !== false) {
      const first = v[0]
      const reducer = event.options.reducer || ((acc, v) => v)
      return v.slice(1).reduce(reducer, first)
    }
    return v
  }


  _put (event) {

    const result = this._channel(event.channel)
      .filter(s => !event.options.target || event.options.target == s.target)
      .filter(s => s.name == '*' || s.name == event.name)
      .map(s => event.options.method ? s.callback.apply(s.target, event.data) : s.callback.call(s.target, event, s))
      .filter(v => v !== undefined)

    const promises = result.filter(v => v.then && typeof v.then == 'function')

    let promise = null

    if (promises.length > 0) {

//      let effectName = event.name

      // if (event.channel != CH_DEFAULT) {
      //   effectName = event.name + '#' + uuid()
      // }

      promise = Promise.all( result )

      if (event.effect) {
        promise = new (event.effect)(event.name, promise, {event}, this)
      }

//      promise = (event.channel == CH_DEFAULT ? new Effect(event.name, promise, {event}, this) : promise)
      return promise
        .then((v) => {
          return this._reduce(v, event)
        },
        (err) => {
          console.error(err)
//          throw err
        })

//      return effect
    }
    else if (result.length > 0) {
      return this._reduce(result, event)
      // return Promise.resolve(this._reduce(result, event))
    }
    // else {
    //   return Promise.resolve()
    // }

  }


  publish (...args) {
    return this.emit.apply(this, args)
  }


  emit (name, data, options, channel='') {
    const event = (name instanceof Event) ? name : new Event(name, data, options, this, channel)

    const result = this.subscribers.filter(s => !!s.when)
      .filter(s => !event.options.target || event.options.target == s.target)
      .filter(w => w.when(event))
      .map(w => w.callback(event))
      .filter(v => v !== undefined)

    const watchEffects = result.filter(v => v.then && typeof v.then == 'function')

    if (watchEffects.length > 0) {

      let effectName = event.name

      // if (event.channel != CH_DEFAULT) {
      //   effectName = event.name + '#' + uuid()
      // }

      // обработка then добавлена здесь, чтобы отрабатывали в нужном порядке финализаторы эффекта
      let promise = Promise.all( result )

      // if (event.channel == CH_DEFAULT && this.effects[event.name]) {
      //   promise = this.effects[event.name](promise, {event})
      // }

      return promise
        .then((v) => {
          const nextEvent = v.filter(r => r instanceof Event).reduce((acc, v) => v, event)
          return nextEvent == event ? this._put(event) : this.emit(nextEvent)
        }, (err) => {
          return this.emit(event.name, err, {}, 'fail')
        })

//      return effect
    }
    else if (result.length > 0) {
      const nextEvent = result.filter(r => r instanceof Event).reduce((acc, v) => v, event)
      return nextEvent == event ? this._put(event) : this.emit(nextEvent)
    }
    else {
      return this._put(event)
    }

  }


  // emit (name, data, options, channel) {
  //   return this.src.emit(name, data, options, channel)
  // }



  // хелперы

  createAction (name, callback, target, options) {
    this.subscribe(name, callback, undefined, target)
    return this.createEvent(name, {method: true, effect: Effect, ...options})
  }

  createEvent (name, options, channel) {
    const e = (...args) => {
      return this.emit(name, args, options, channel)
    }
    e.on = name//(evt) => evt.name == name && evt.channel == CH_DEFAULT
    e.done = name+':done'//(evt) => evt.name == name && evt.channel == 'done'
    e.fail = name+':fail'//(evt) => evt.name == name && evt.channel == 'fail'
    e.cancel = name+':cancel'//(evt) => evt.name == name && evt.channel == 'cancel'

    this.actions[name] = e
    if (this[name]) {
      console.warn('Overriding domain method', name, this)
    }
    this[name] = e
    return e
  }

  createEffect (name, promiseCreator, options) {
    this.effects[name] = (promise) => {
      return new Effect(name, promise || promiseCreator(), options, this)
    }
    return this.effects[name]
  }

  createWatcher (name, callback, target) {
    this.subscribe({
      when: (e) => e.name == 'changed' && e.ids && (name in e.ids), 
      callback: (e) => callback.call(this, e.cache[name], e.data[name]), 
      target, channels: []})
  }

  createProperty (name, options={}) {
    if (!this._properties) {
      this._properties = {}
    }
    if (!this._properties[name]) {
      this._properties[name] = options
      if (options.type) {
        Object.defineProperty(this, name, {
          get: () => this.$entry(name),
        })  
      }
      else {
        Object.defineProperty(this, name, {
          get: () => this.get(name),
          set: (v) => this.set(name, v)
        })
      }  
    }
  }

  on (name, callback, target, channel) {
    const [n, c] = name.split(':')
    return this.subscribe(n, callback, c || channel, target)
  }

  off (listener) {
    this.unsubscribe(listener)
  }

  watch (when, callback, target) {
    this.subscribe({when, callback, target, channels: []})
    //    this.watchers.push({when, callback, channels: [].concat(channel)})
  }

  once (name, callback) {
    const subscriber = this.subscribe(name, (e) => {
      this.unsubscribe(subscriber)
      return callback(e)
    })
  }





//   unjoin(target) {
//     super.unjoin(target)
//
//     this.subscribers = this.subscribers.filter(s => s.target != target)
// //    this.watchers = this.watchers.filter(s => s.target != target)
// //    this.effects = this.effects.filter(s => s.target != target)
//
//   }

  $entry(k) {
    let e = this.entries[k]
    if (e == null) {
      if (this._properties && this._properties[k]) {
        // здесь можно вызывать фабрику
        const prop = this._properties[k]
        if (typeof prop === 'object') {
          e = new (prop.type || Domain)(this, {...prop}, k)
        }
        else {
          e = new prop(this, null, k)
        }
      }
      else if (this.options.entryOfType) {
        const prop = this.options.entryOfType
        if (typeof prop === 'object') {
          e = new (prop.type || Domain)(this, {...prop}, k)
        }
        else {
          e = new prop(this, null, k)
        }
      }
      else {
        e = new Domain(this, null, k) // в качестве опций должны передаваться параметры модели
      }
      this.entries[k] = e
    }
    return e
  }

  // get events () {
  //   return this.src.events
  // }
  //
  // get effects () {
  //   return this.src.effects
  // }

  // get subscribers () {
  //   return this.src.subscribers
  // }

}

Domain.Event = Event
Domain.Effect = Effect

//Domain.CH_DEFAULT = CH_DEFAULT
//Domain.ALL_CHANNELS = [CH_DEFAULT, 'done', 'fail', 'cancel', 'wait']

export default Domain
