

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
    this.finallies = []

//    console.log(this.owner.subscribers.filter(s => (s instanceof Effect)))
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
        return err
      })

    this.owner.$emit(this.name, null, null, 'start')

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

  // для событий с method = true сюда приходит data
  callback (e) {
    console.log('resolve effect', this, e)
//    this.finalize(e.channel, e.data)
    if (!this.isFinal) {
//      this.finalize(e.channel, e.data)
      if (this.resolver) {
        this.resolver(e)
      }

      this.resolve(e)
      // else if (this[e.channel+'Resolver']) {
      //   this[e.channel+'Resolver'](e)
      // }

//      this.finalize(e.channel, e.data)
      // if (this.resolver) {
      //   this.resolver(e.data)
      //   return this.promise
      // }
    }
  }


  then (resolve, reject) {
    // if (this.promise) {
//   this.promise = this.promise.then(resolve, reject)

   resolve && this.resolvers.push(resolve)
   reject && this.rejectors.push(reject)
    // }
    // else {
      // resolve && this.resolvers.push(resolve)
      // reject && this.rejectors.push(reject)
    // }
    return this
  }

  catch (reject) {
    // if (this.promise) {
//    this.promise = this.promise.catch(reject)
    // }
//    reject && this.rejectors.push(reject)
    reject && this.rejectors.push(reject)

    return this
  }

  finally (final) {

    final && this.finallies.push(final)
//    if (this.promise) {
//      this.promise = this.promise.finally(final)
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

      this.owner.$emit(this.name, value, {}, state)


      if (state == 'done') {
        this.resolve(value)
      }
      else if (state == 'fail' || state == 'cancel') {
        this.reject(value)
        if (this.options.derived) {
          this.options.derived.forEach(eff => eff.finalize && eff.finalize('cancel'))
        }
      }

      this.finallies.forEach(callback => callback())

      delete this.resolvers
      delete this.rejectors
      delete this.finallies

      // if (state == 'done') {
      //   let result = value
      //   this.resolvers.forEach(resolver => {
      //     result = resolver(result)
      //     if (result && result.then) {
      //       console.error('Thenable result')
      //     }
      //   })
      // }
      // else if (state == 'cancel') {
      //   console.log('Canceling')
      // }

      // else {
      //   this.owner.unsubscribe(this)
      //   this.subscriber = false
      // }
//      value = this.subscriber ? this.owner.emit(this.name, value, {}, state) : value
    }
//    return value
  }

  resolveCollisions (collisions) {
    // по умолчанию коллизия игнорируется
  }


  resolve (value) {
    let result = value
    this.resolvers.forEach(callback => {
      result = callback(result)
      if (result && result.then) {
        console.error('Thenable result')
      }
    })
    return result
  }


  reject (value) {
    let result = value
    this.rejectors.forEach(callback => {
      result = callback(result)
      if (result && result.then) {
        console.error('Thenable result')
      }
    })
    return result
  }

}


export default Effect
