
class Effect {
  constructor (name) {
    this.name = name
  }

  get done () {
    return this.name+':done'
  }

  get fail () {
    return this.name+':fail'
  }

  get init () {
    return this.name
  }

  get cancel () {
    return this.name+':cancel'
  }

  get reject () {
    return this.name+':reject'
  }

  get final () {
    return this.name+':final'
  }

  get isCanceled () {
    return this.finalEvent == this.cancel
  }

  get isFailed () {
    return this.finalEvent == this.fail
  }

  shareWith (source) {
    if (!this._shares) {
      this._shares = []
    }
    this._shares.push(source)
  }

  finalize (finalEvent, finalData) {
    this.finalEvent = finalEvent
    this.isFinal = true
    if (this._shares) {
      this._shares.forEach(source => {
        source.emit(this.final, {data: finalData})
      })
    }
    if (this._callbacks) {
//      console.log('final data', finalData)
      this._callbacks.forEach(resolve => resolve(finalData))
    }
    if (this._callback) {
      if (this.isCanceled) {
        this._callback.reject(this)
      }
      else {
        this._callback.resolve()
      }
//      console.log(this._callback)
    }
  }

  // asPromise () {
  //   if (this.promise) {
  //     return
  //   }
  //   return this.promise
  // }

  then (callback) {
    if (!this._callbacks) {
      this._callbacks = []
    }
    this._callbacks.push(callback)
//    console.log('thenable', callback)
  }

  asPromise () {
    const callback = {}
    callback.promise = new Promise(function (resolve, reject) {
      callback.resolve = resolve
      callback.reject = reject
    })
    this._callback = callback
    return callback.promise
  }

}

export default Effect
