

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
      this.promise = new Promise((resolver, rejector) => {
        this.resolver = resolver
        this.rejector = rejector
      })
    }

//    this.owner.emit(this.name, null, null, 'wait')

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
//    }

//    if (!this.isFinal) {
//    debugger
    if (this.owner.subscribers.filter(s => (s instanceof Effect) && s.name == this.name/* && !s.isFinal*/).length > 0) {
      console.error('Effect already running', this.name)
//      debugger
//        debugger
//      return
    }

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
      this.finalize(e.channel, e.data)
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
//        this.owner.unsubscribe(this.subscriber)
//        this.subscriber = null
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

}


export default Effect
