

class Effect {
  constructor (name, promise, options={}, owner) {
    this.owner = owner
    this.promise = promise
    this.name = name
    this.channels = options.channels || ['']//['done', 'cancel', 'fail']
    this.options = options
    this.target = this
    this.group = options.group

    this.resolvers = []
    this.rejectors = []

    const collisions = this.owner.subscribers.filter(s => (s instanceof Effect) && s.group && s.group == this.group /*s.name == name/* && !s.isFinal*/)
    if (collisions.length > 0) {
//      debugger
      console.warn('Effect already running', this.group)
      this.resolveCollisions(collisions)
    }

    if (!this.promise) {
      this.promise = new Promise((resolver, rejector) => {
        this.resolver = resolver
        this.rejector = rejector
      })
//      debugger
    }

    this.subscriber = this.owner.subscribe(this)


//    if (this.promise) {
    this.promise = this.promise.then(
      (v) => {
        this.finalize('done', v)
        return v
      },
      (err) => {
        this.finalize('fail', err)
        throw err
      })

    this.owner.emit(this.name, null, null, 'start')

//    }

//    if (!this.isFinal) {
//    debugger

//    this.owner.emit(this.name, null, {}, 'wait')
//    this.subscriber = this.owner.subscribe(this)
    // }
    // else {
    //   debugger
    // }
  }

  callback (e) {
//    this.finalize(e.channel, e.data)
    if (!this.isFinal) {
//      this.finalize(e.channel, e.data)
      if (this.resolver) {
        this.resolver(e.data)
      }
      // if (this.resolver) {
      //   this.resolver(e.data)
      //   return this.promise
      // }
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
    return this
  }

  finalize (state, value) {
    if (!this.isFinal) {
      this.isFinal = true
      if (!this.subscriber) {
//        debugger
      }
      else {
//        this.subscriber = null
        this.owner.unsubscribe(this.subscriber)
      }
      // else {
      //   this.owner.unsubscribe(this)
      //   this.subscriber = false
      // }
      this.owner.emit(this.name, value, {}, state)
//      value = this.subscriber ? this.owner.emit(this.name, value, {}, state) : value
    }
//    return value
  }

  resolveCollisions (collisisons) {
    // по умолчанию коллизия игнорируется
  }

}


export default Effect
