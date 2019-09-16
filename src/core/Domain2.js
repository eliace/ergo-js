import Source from './Source'
import Effect from './Effect2'
import Event from './Event2'

const CH_DEFAULT = 'default'


// const uuid = () => {
//   return Math.random().toString(36).substr(2, 9)
// }


class Domain extends Source {

  // constructor (src, name) {
  //   this.src = src || new Source()
  //   this.name = name
  // }
  constructor (v, o, k) {
    super(v, o, k)

//    this.watchers = []
    this.subscribers = []
    this.effects = {}
    this.events = {}
  }


  _channel (ch) {
    return this.subscribers.filter(s => s.channels.indexOf(ch) != -1)
  }

  // _watcher (ch) {
  //   return this.watchers.filter(s => s.channels.indexOf(ch) != -1)
  // }

  _reduce (v, event) {
    if (Array.isArray(v) && v.length > 0) {
      const first = v[0]
      const reducer = event.options.reducer || ((acc, v) => v)
      return v.slice(1).reduce(reducer, first)
    }
    return v
  }


  _put (event) {

    const result = this._channel(event.channel)
      .filter(s => !event.options.target || event.options.target == s.target)
      .filter(s => s.name == event.name)
      .map(s => event.options.method ? s.callback.apply(event.owner, event.data) : s.callback(event))
      .filter(v => v !== undefined)

    const promises = result.filter(v => v.then && typeof v.then == 'function')

    let promise = null

    if (promises.length > 0) {

      let effectName = event.name

      // if (event.channel != CH_DEFAULT) {
      //   effectName = event.name + '#' + uuid()
      // }

      const promise = Promise.all( result )

      const effect = (event.channel == CH_DEFAULT ? new Effect(effectName, promise, {event}, this) : promise)
        .then((v) => {
          return this._reduce(v, event)
        })

      return effect
    }
    else if (result.length > 0) {
      return Promise.resolve(this._reduce(result, event))
    }
    else {
      return Promise.resolve()
    }
  }


  emit (name, data, options, channel=CH_DEFAULT) {
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
      const promise = Promise.all( result )

      const effect = (event.channel == CH_DEFAULT ? new Effect(effectName, promise, {event}, this) : promise)
        .then((v) => {
          const nextEvent = v.filter(r => r instanceof Event).reduce((acc, v) => v, event)
          return nextEvent == event ? this._put(event) : this.emit(nextEvent)
        }, (err) => {
          return err
        })

      return effect
    }
    else if (result.length > 0) {
      const nextEvent = result.filter(r => r instanceof Event).reduce((acc, v) => v, event)
      return nextEvent == event ? this._put(event) : this.emit(nextEvent)
    }
    else {
      return this._put(event)
    }

  }

  subscribe (name, callback, channel=CH_DEFAULT, target) {
    let subscriber = null
    if (arguments.length == 1) {
      subscriber = arguments[0]
    }
    else {
      subscriber = {name, callback, channels: [].concat(channel), target}
    }
    this.subscribers.push(subscriber)
    return subscriber
  }

  unsubscribe (subscriber) {
    const i = this.subscribers.indexOf(subscriber)
    this.subscribers.splice(i, 1)
  }

  // emit (name, data, options, channel) {
  //   return this.src.emit(name, data, options, channel)
  // }



  // хелперы

  createAction (name, callback) {
    this.subscribe(name, callback)
    return this.createEvent(name, {method: true})
  }

  createEvent (name, options) {
    const e = (...args) => {
      return this.emit(name, args, options)
    }
    e.on = name//(evt) => evt.name == name && evt.channel == CH_DEFAULT
    e.done = name+':done'//(evt) => evt.name == name && evt.channel == 'done'
    e.fail = name+':fail'//(evt) => evt.name == name && evt.channel == 'fail'
    e.cancel = name+':cancel'//(evt) => evt.name == name && evt.channel == 'cancel'

    this.events[name] = e
    return e
  }

  createEffect (name, promiseCreator, options) {
    this.effects[name] = () => {
      return new Effect(name, promiseCreator(), options, this)
    }
    return this.effects[name]
  }

  on (name, callback, channel) {
    const [n, c] = name.split(':')
    return this.subscribe(n, callback, c || channel)
  }

  off (listener) {
    this.unsubscribe(listener)
  }

  watch (when, callback) {
    this.subscribe({when, callback, channels: []})
    //    this.watchers.push({when, callback, channels: [].concat(channel)})
  }

  once (name, callback) {
    const subscriber = this.subscribe(name, (e) => {
      this.unsubscribe(subscriber)
      return callback(e)
    })
  }

  unjoin(target) {
    super.unjoin(target)

    this.subscribers = this.subscribers.filter(s => s.target != target)
//    this.watchers = this.watchers.filter(s => s.target != target)
//    this.effects = this.effects.filter(s => s.target != target)

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

Domain.CH_DEFAULT = CH_DEFAULT
Domain.ALL_CHANNELS = [CH_DEFAULT, 'done', 'fail', 'cancel', 'wait']

export default Domain
