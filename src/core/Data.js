

class Source {

  constructor(v, k) {
    this.id = k
    this.src = v
    this.entries = Array.isArray(v) ? [] : {}
    this.targets = []
    this.isNested = v instanceof Source
  }

  get() {
    if (this.id == null) {
      return this.src
    }
    else if (this.isNested) {
      return this.src.get()[this.id]
    }
    else {
      return this.src[this.id]
    }
  }

  set(k, v) {
    if (arguments.length == 1) {
      v = k
      if (this.id == null) {
        this.src = v
      }
      else if (this.isNested) {
        this.src.get()[this.id] = v
        // this.src._no_cascade = true
        // this.src.set(this.id, v)
        // this.src._no_cascade = false
      }
      else {
        this.src[this.id] = v
      }
      //TODO удалить все entries
      this.update(v)
    }
    else {
      if (Array.isArray(k)) {
        // TODO k может быть массивом
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
        this.entry(k).update(v)
      }
    }
  }

  join(target, dataChanged, dataRemoved) {
    this.targets.push({target, dataChanged, dataRemoved})
  }

  update(v) {
    if (this.isNested) {
      this.src.update(v)
    }
    this.targets.forEach(t => t.dataChanged.call(t.target, v))
  }

  entry(k) {
    const e = this.entries[k]
    if (e == null) {
      e = new Source(this, k)
      this.entries[k] = e
    }
    return e
  }

  remove(k) {
    // this.targets.forEach(t => t.dataRemoved(v))
    // if (this.isNested)
  }

}


export default Source
