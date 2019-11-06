import {weakKey} from './Utils'
import Effect from './Effect'


function defaultKeyResolver (v) {
  if (v === null || v === undefined || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
    return v
  }
  else if ('id' in v) {
    return v.id
  }
  else if ('name' in v) {
    return v.name
  }
  else {
    return weakKey(v)
  }
}


/*
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

*/

class Stream {

  constructor (src, data, key, target) {
    this.__target = src
    this.data = data
    this.key = key
    this.target = target
    this.__source = src
//    this.$props = src.$props
//    this.idResolver = idResolver

    // this._origin = []
    // this._watchers = new Map()
    // this.watchers = []
    // this.subscribers = []
    // this.effects = {}
    // this.events = {}

  }

  get src () {
    return this.__target
  }

  get $props () {
    return this.__source
  }

  // get $entries () {
  //   const e = {}
  //   if (this.__target._properties) {
  //     for (let i in this.__target._properties) {
  //       e[i] = this.__target.$entry(i)
  //     }
  //   }
  //   return e
  // }

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

  filter (filter) {
    this._filter = filter
    return this
  }

  map (map) {
    this._filter = map
    return this
  }

  entries (callback) {
    console.error('[Stream] Method entries deprecated. Use each')
    this.each(callback)
  }

  each (callback) {

    let value = this.src.$get()
    const props = this.src._properties
    const opts = this.src.options

    if (Array.isArray(value)) {
      const keyOf = opts.key || this.idResolver || defaultKeyResolver
      if (this._filter) {
        value = value.filter(this._filter)
      }
      if (this._map) {
        value = value.map(this._map)
      }
      // обходим элементы массива в порядке индексов
      for (let i = 0; i < value.length; i++) {
        callback(this.src.$entry(i), i, value[i], keyOf(value[i]))
      }
    }
    else {
//      const allProps = {...value, ...props}
      let i = 0
      for (let k in value) {
        callback(this.src.$entry(k), i++, value[k], k)
      }
      for (let k in props) {
        // TODO возможно, правильнее при коллизии использовать property
        if (!(k in value)) {
          const entry = this.src.$entry(k)
          callback(entry, i++, entry.$get(), k)
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

  // name (k) {
  //   return new Stream(this.src, this.data, k, this.idResolver)
  // }

  // snapshot () {
  //   const v = this.src.$get();
  //   const p = {}
  //   for (let i in this.src._properties) {
  //     p[i] = this.src.$entry(i).$get()
  //   }
  //   return Object.assign(p, v)
  // }

  // $streams () {
  //   const e = {}
  //   for (let i in this.__source._properties) {
  //     e[i] = this.__source.$entry(i).$stream(this.key)
  //   }
  //   return e
  // }

  // get $source () {
  //   return this.src
  // }

  // entry (key) {
  //   return this.src.$entry(key)
  // }
/*
  $substream (key) {
    return this.__source.$entry(key).$stream(this.key)
  }

  // get (key) {
  //   return this.src.get(key)
  // }



  // хелперы

  createAction (name, callback, options) {
    this.__target.subscribe(name, callback, undefined, this.target)
    return this.createEvent(name, {method: true, effect: Effect, ...options})
  }

  createEvent (name, options, channel) {
    const e = (...args) => {
      return this.__target.emit(name, args, options, channel)
    }
    e.on = name//(evt) => evt.name == name && evt.channel == CH_DEFAULT
    e.done = name+':done'//(evt) => evt.name == name && evt.channel == 'done'
    e.fail = name+':fail'//(evt) => evt.name == name && evt.channel == 'fail'
    e.cancel = name+':cancel'//(evt) => evt.name == name && evt.channel == 'cancel'

    if (this[name]) {
      console.error('Overriding domain method', name, this)
    }
    this[name] = e
    this.__target[name] = e
    return e
  }

  // createEffect (name, promiseCreator, options) {
  //   this.effects[name] = (promise) => {
  //     return new Effect(name, promise || promiseCreator(), options, this)
  //   }
  //   return this.effects[name]
  // }

  createWatcher (name, callback) {
    const {target, key} = this
    this.__target.subscribe({
      when: (e) => e.name == 'changed' && e.ids && (name in e.ids), 
      callback: (e) => callback.call(this, e.cache[name], e.data[name]), 
      target, 
      channels: [key]
    })
  }

  createProperty (name, options) {
    const src = this.__target
    if (!src._properties[name]) {
      src._properties[name] = options
      if (options.type) {
        Object.defineProperty(src, name, {
          get: () => src.$entry(name),
        })  
      }
      else {
        Object.defineProperty(src, name, {
          get: () => src.$get(name),
          set: (v) => src.$set(name, v)
        })
      }  
    }
  }

  watch (when, callback) {
    const {target} = this
    this.__target.subscribe({when, callback, target, channels: []})
    //    this.watchers.push({when, callback, channels: [].concat(channel)})
  }

  on (name, callback, channel) {
    const [n, c] = name.split(':')
    return this.__target.subscribe(n, callback, c || channel, this.target)
  }
*/
  get $entries () {
    return this.__target.$entries
  }

  // get $entries () {
  //   const e = {}
  //   if (this.__target._properties) {
  //     for (let i in this.__target._properties) {
  //       e[i] = this.__target.$entry(i)
  //     }
  //   }
  //   return e
  // }

  // get $value () {
  //   return this.__target.$get()
  // }


  // $remove () {
  //   this.__source.$remove()
  // }

}

// Stream.Event = Event
// Stream.Effect = Effect
//
// Stream.CH_DEFAULT = CH_DEFAULT
// Stream.ALL_CHANNELS = [CH_DEFAULT, 'done', 'fail', 'cancel', 'wait']


export default Stream
