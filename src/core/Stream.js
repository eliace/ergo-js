import {defaultIdResolver} from './Utils'

// target
// reducer
class Event {
  constructor (name, data, options, owner, channel) {
    this.name = name
    this.options = options || {}
    this.data = data
    this.owner = owner
    this.channel = channel

    Object.freeze(this)
  }

  get key () {
    return this.channel == CH_DEFAULT ? this.name : this.name+':'+this.channel
  }
}

class Effect {
  constructor (name, promise, options, owner) {
    this.owner = owner
    this.promise = promise
    this.name = name
    this.channels = ['done', 'cancel', 'fail']
    this.options = options

    this.resolvers = []
    this.rejectors = []

    if (!this.promise) {
      this.promise = new Promise(resolver => {
        this.resolver = resolver
      })
    }

//    this.owner.emit(this.name, null, null, 'wait')

    if (this.promise) {
      this.promise.then(
        (v) => {
          return this.finalize('done', event.data)// channel == 'done' ? event.data : this.emit(event.name, event.data, event.options, 'done')
        },
        (err) => {
          return this.finalize('fail', err)
        })
    }

    if (!this.isFinal) {
      if (this.owner.subscribers.filter(s => (s instanceof Effect) && s.name == this.name).length > 0) {
        console.error('Effect already running', this.name)
//        debugger
        return
      }

      this.subscriber = this.owner.subscribe(this)
    }
    else {
      debugger
    }
  }

  callback (e) {
//    console.log('!', e)
    this.owner.unsubscribe(this.subscriber)
    this.subscriber = null
    if (!this.isFinal) {
//      debugger

      if (this.resolver) {
        this.resolver(e.data)
        return this.promise
      }
//      const r = this.resolver(e.data)
//      return this.finalize(e.channel, e.data)
      // this.isFinal = true
//      return this.finalize(null, e.data)
    }
  }


  then (resolve, reject) {
    // if (this.promise) {
   this.promise = this.promise.then(resolve, reject)
    // }
    // else {
      // resolve && this.resolvers.push(resolve)
      // reject && this.rejectors.push(reject)
    // }
    return this
  }

  catch (reject) {
    // if (this.promise) {
    this.promise = this.promise.catch(reject)
    // }
//    reject && this.rejectors.push(reject)
    return this
  }

  finally (final) {
//    if (this.promise) {
      this.promise = this.promise.finally(final)
//    }
  }

  finalize (state, value) {
    if (!this.isFinal) {
      this.isFinal = true
      value = this.subscriber ? this.owner.emit(this.name, value, {}, state) : value
    }
    return value
  }

}



// function race (promisesAndEffects) {
//   return Promise.race(promisesAndEffects)
//     // .finally(() => {
//     //   promisesAndEffects.forEach(r => {
//     //     if (r instanceof Effect) {
//     //       r.finalize('cancel')
//     //     }
//     //   })
//     // })
// }
//
// function all (promisesAndEffects) {
//   return Promise.all(promisesAndEffects)
// }


const CH_DEFAULT = 'default'



class Stream {

  constructor (src, data, key, idResolver) {
    this.src = src
    this.data = data
    this.key = key
    this.idResolver = idResolver

    // this._origin = []
    // this._watchers = new Map()
    this.watchers = []
    this.subscribers = []
    this.effects = {}
    this.events = {}

  }

  // filter (f) {
  //   let d = this.data || this.src.get().map((v, i) => [v, i])
  //   return new Stream(this.src, d.filter((itm) => f(itm[0])), this.key)
  // }
  //
  // map (f) {
  //   let d = this.data || this.src.get().map((v, i) => [v, i])
  //   return new Stream(this.src, d.map(itm => [f(itm[0]), itm[1]]), this.key)
  // }
  //
  // forEach (f) {
  //   if (this.data) {
  //     this.data.forEach(itm => f(itm[0]))
  //   }
  //   else {
  //     this.src.get().forEach(f)
  //   }
  //   return this
  // }
  //
  // sort (f) {
  //   let d = this.data || this.src.get().map((v, i) => [v, i])
  //   return new Stream(this.src, [...d].sort((a, b) => f(a[0], b[0])), this.key)
  // }
  //
  // first () {
  //   let i = this.data ? this.data[0][1] : 0
  //   return this.src.entry(i)
  // }
  //
  // last () {
  //   let i = this.data ? this.data[this.data.length-1][1] : this.src.size()-1
  //   return this.src.entry(i)
  // }
  //
  // range (offset, limit) {
  //   let d = this.data || this.src.get().map((v, i) => [v, i])
  //   return new Stream(this.src, d.slice(offset, offset+limit), this.key)
  // }

  entries (callback) {

    const value = this.src.get()
    const props = this.src._properties

    if (Array.isArray(value)) {
      // обходим элементы массива в порядке индексов
      for (let i = 0; i < value.length; i++) {
        callback(this.src.$entry(i), i, value[i], (this.idResolver || defaultIdResolver)(value[i]))
      }
    }
    else {
      const allProps = {...value, ...props}
      for (let k in value) {
        callback(this.src.$entry(k), k, value[k])
      }
      for (let k in props) {
        // TODO возможно, правильнее при коллизии использовать property
        if (!(k in value)) {
          const entry = this.src.$entry(k)
          callback(entry, k, entry.get())
        }
      }
    }

    // if (this.data) {
    //   this.data.forEach(itm => f(this.src.entry(itm[1]), itm[1]))
    // }
    // else {
    //   const v = this.src.get()
    //   for (let i in v) {
    //     f(this.src.entry(i), i, this.idResolver(v[i]))//idResolver ? idResolver(v[i]) : Keys.get(v[i]))
    //   }
    //   // if (this.src._removed) {
    //   //   for (let i = 0; i < this.src._removed.length; i++) {
    //   //     const entry = this.src._removed[i]
    //   //     f(entry, entry.id)
    //   //   }
    //   // }
    // }
  }

  name (k) {
    return new Stream(this.src, this.data, k, this.idResolver)
  }





  reduce (v, event) {
    if (Array.isArray(v) && v.length > 0) {
      const first = v[0]
      const reducer = event.options.reducer || ((acc, v) => v)
      return v.slice(1).reduce(reducer, first)
    }
    return v
  }


  put (event) {

    const result = this.channel(event.channel)
      .filter(s => s.name == event.name)
      .map(s => event.options.method ? s.callback.apply(event.owner, event.data) : s.callback(event))
      .filter(v => v !== undefined)

    const promises = result.filter(v => v.then && typeof v.then == 'function')

    let promise = null

    if (promises.length > 0) {

      const promise = Promise.all( result )
        .then((v) => {
          return this.reduce(v, event)
        })

      const effect = new Effect(event.name, promise, {}, this)

      return effect
    }
    else if (result.length > 0) {
      return Promise.resolve(this.reduce(result, event))
    }
    else {
      return Promise.resolve()
    }
  }


  emit (name, data, options, channel=CH_DEFAULT) {
    const event = (name instanceof Event) ? name : new Event(name, data, options, this, channel)

    const watchResult = this.watchers//.watcher(channel)
      .filter(w => w.when(event))
      .map(w => w.callback(event))
      .filter(v => v !== undefined)

    const watchEffects = watchResult.filter(v => v.then && typeof v.then == 'function')

    if (watchEffects.length > 0) {

      // обработка then добавлена здесь, чтобы отрабатывали в нужном порядке финализаторы эффекта
      const promise = Promise.all( watchResult )
        .then((v) => {
          const nextEvent = v.filter(r => r instanceof Event).reduce((acc, v) => v, event)
          return nextEvent == event ? this.put(event) : this.emit(nextEvent)
        })

      const effect = new Effect(event.name, promise, {}, this)

      return effect
    }
    else if (watchResult.length > 0) {
      const nextEvent = watchResult.filter(r => r instanceof Event).reduce((acc, v) => v, event)
      return nextEvent == event ? this.put(event) : this.emit(nextEvent)
    }
    else {
      return this.put(event)
    }

  }

  watch (when, callback, channel=CH_DEFAULT) {
    this.watchers.push({when, callback, channels: [].concat(channel)})
  }

  subscribe (name, callback, channel=CH_DEFAULT) {
    let subscriber = null
    if (arguments.length == 1) {
      subscriber = arguments[0]
    }
    else {
      subscriber = {name, callback, channels: [].concat(channel)}
    }
    this.subscribers.push(subscriber)
    return subscriber
  }

  unsubscribe (subscriber) {
    const i = this.subscribers.indexOf(subscriber)
    this.subscribers.splice(i, 1)
  }

  effect (name) {

  }

  channel (ch) {
    return this.subscribers.filter(s => s.channels.indexOf(ch) != -1)
  }

  watcher (ch) {
    return this.watchers.filter(s => s.channels.indexOf(ch) != -1)
  }

  action (name, callback) {
    this.event(name, {method: true})
    this.subscribe(name, callback)
    return this.events[name]
  }

  event (name, options) {
    this.events[name] = (...args) => {
      return this.emit(name, args, options)
    }
    return this.events[name]
  }

  on (name, callback) {
    return this.subscribe(name, callback)
  }

  off () {

  }

  once (name, callback) {
    const subscriber = this.subscribe(name, (e) => {
      this.unsubscribe(subscriber)
      return callback(e)
    })
  }

  // get channels () {
  //   return {[CH_DEFAULT]: true, 'done': true, 'cancel': true, 'fail': true}
  // }

}

Stream.Event = Event
Stream.Effect = Effect

Stream.CH_DEFAULT = CH_DEFAULT
Stream.ALL_CHANNELS = [CH_DEFAULT, 'done', 'fail', 'cancel', 'wait']


export default Stream
