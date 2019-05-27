

class Source {

  constructor(v, k) {
    this.id = k
    this.src = v
    this.entries = Array.isArray(v) ? [] : {}
    this.observers = []
    this.isNested = v instanceof Source
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
      this.update() // ?
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
          this.update('asc')
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
      }
    }
  }

  join(target, dataChanged, dataRemoved, key) {
    this.observers.push({target, dataChanged, dataRemoved, key})
  }

  unjoin(target) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i].target == target) {
        this.observers.splice(i, 1)
        break
      }
    }
  }

  update(direction) {
    if (!this._updating) {
      this._updating = true
  //    delete this.cache
      if (this.isNested && direction != 'desc') {
        this.src.update('asc')
      }
      this.observers.forEach(t => t.dataChanged.call(t.target, this.get(), t.key, this))

      if (direction != 'asc') {
        for (let i in this.entries) {
          this.entries[i].update('desc');
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
        let entry = this.entries[k]
        if (Array.isArray(this.entries)) {
          this.entries.splice(k, 1)
        }
        else {
          delete this.entries[k]
        }
        entry.targets.forEach(t => t.dataRemoved.call(t.target))
      }

//      this.targets.forEach(t => t.dataChanged.call(t.target, v))
    }
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
  }


  stream(callback, filter, sorter, pager) {

    // TODO filter + sorter + pager

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

}


export default Source
