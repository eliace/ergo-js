import {defaultIdResolver} from './Utils'

// target
// reducer
class Event {
  constructor (name, data, options, owner) {
    this.name = name
    this.options = options || {}
    this.data = data
    this.owner = owner
  }
}

class Effect {
  constructor (name, promise, owner) {
    this.owner = owner
    this.name = name
    this.promise = promise
      .then(v => {
        if (!this.isFinal) {
          this.finalize(this.done, v)
        }
//        console.log('final', v)
        return v
      })
      .catch(v => {
        if (!this.isFinal) {
          this.finalize(this.fail, v)
        }
        return v
      })

    this.resolvers = []
    this.rejectors = []
  }

  // asPromise() {
  //   return this.promise
  // }

  then (resolve, reject) {
    resolve && this.resolvers.push(resolve)
    reject && this.rejectors.push(reject)
    return this
  }

  catch (reject) {
    reject && this.rejectors.push(reject)
    return this
  }

  get pending () {
    return this.name+':pending'
  }

  get init () {
    return this.name+':init'
  }

  get done () {
    return this.name+':done'
  }

  get fail () {
    return this.name+':fail'
  }

  get cancel () {
    return this.name+':cancel'
  }

  get finals () {
    return {[this.done]: true, [this.fail]: true, [this.cancel]: true}
  }

  get isFinal () {
    return this.state in this.finals
  }

  finalize (name, data) {
    this.state = name
    this.owner.$emit(name, data)
    if (name == this.done) {
      this.resolvers.forEach(resolve => resolve(data))
    }
    else if (name == this.fail || name == this.cancel) {
      this.rejectors.forEach(reject => reject(data))
    }
  }
}



class Stream {

  constructor (src, data, key, idResolver) {
    this.src = src
    this.data = data
    this.key = key
    this.idResolver = idResolver

    this._origin = []
    this._watchers = new Map()
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




  $emit (name, data, props) {

    const event = (name instanceof Event) ? name : new Event(name, data, props, this)

    event.origin = this._origin[0]

    this._origin.push(event)

    // уведомляем наблюдателей
    if (this._watchers) {
      let watchResults = []
      this._watchers.forEach((watchers, owner) => {
        watchers.forEach(watcher => {
          if (watcher.when(event)) {
            const result = watcher.action.call(this, event)
            if (result != null) {
              watchResults.push(result)
            }
          }
        })
      })
      // если есть требования ожидания
      if (watchResults.length > 0) {
        const promise = Promise.all(watchResults)
          .then((v) => {
            console.log('resume event', event, v)
            return this.$handle(event)
          })
          .catch((v) => {
            watchResults.forEach(result => {
              if (result instanceof Effect && !result.isFinal) {
                result.finalize(result.cancel, v)
              }
              else if (result instanceof Promise) {
                console.warn('Can\'t check if native promise is canceled', result)
              }
            })
            console.log('cancel event', event, v)
            effect.finalize(effect.cancel, v)
          })
        const effect = new Effect(event.name, promise, this)
        return effect
      }
    }

    const result = this.$handle(event)

    this._origin.pop()

    return result
  }


  $handle (event) {

    const handleResult = []

    if (this._handlers) {
      this._handlers.forEach((handlers, target) => {
        if (!event.target || target == this || event.target == target) {
          const handler = handlers[event.name]
          if (handler) {
            handler.forEach(h => {
              const result = event.options.method ? h.callback.apply(target, event.data) : h.callback.call(target, event.data)
              if (result != null) {
                handleResult.push(result)
              }
            })
          }
        }
      })
    }

    if (handleResult.length > 0) {
      const promise = Promise.all(handleResult)
        .then(a => {
//          console.log('reduce', a, a.reduce((acc, v) => v))
          return a.reduce((acc, v) => v)
        })
      // const reduce = event.reduce || ((a) => Promise.race(a))
      // const promise = reduce(handleResult)
      // TODO then + catch
      return new Effect(event.name, promise, this)
    }
    // else if (handleResult.length == 1) {
    //   return new Effect(event.name, Promise.resolve(handleResult[0]), this)
    // }
    // if (handleResult.length == 1) {
    //   return handleResult [0]
    // }
    // else if (handleResult.length > 1) {
    //   return handleResult
    // }
  }



  $on (name, callback, owner) {
    if (!this._handlers) {
      this._handlers = new Map()
    }
    const target = owner || this
    let h = this._handlers.get(target)
    if (!h) {
      h = {target}
      this._handlers.set(target, h)
    }
    if (!h[name]) {
      h[name] = []
    }
    h[name].push({callback})
  }

  $watch (when, action, owner) {
    const target = owner || this
    let w = this._watchers.get(target)
    if (!w) {
      w = []
      this._watchers.set(target, w)
    }
    w.push({when, action})
  }

  $effect (name, when, actions) {
    this.$watch(when, (e) => {
      return this.$emit(name, e.data)
    })
    for (let i in actions) {
      this.$on(name+':'+i, actions[i])
    }
  }

  $action (name, fn) {
    this.$on(name, fn)
    return this.$event(name, {method: true})
  }

  $event (name, options) {
    this[name] = (...args) => {
      return this.$emit(name, args, options)
    }
    return this[name]
  }

  $off (name, callback, owner) {
    // TODO
  }

  $once (name, callback, owner) {
    const f = function (...args) {
      this.$off(name, f, owner)
      return callback.apply(this, args)
    }
    this.$on(name, f, owner)
  }


}

Stream.Event = Event
Stream.Effect = Effect


export default Stream
