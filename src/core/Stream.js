
const Keys = {
  m: new WeakMap(),
  c: 1,
  get: function (v) {
    if (typeof v === 'string' || typeof v === 'number') {
      return v
    }
    if (this.m.has(v)) {
      return this.m.get(v)
    }
    this.m.set(v, this.c++)
    return this.c - 1
  }
}



class Stream {

  constructor (src, data, key) {
    this.src = src
    this.data = data
    this.key = key
  }

  filter (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.filter((itm) => f(itm[0])), this.key)
  }

  map (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.map(itm => [f(itm[0]), itm[1]]), this.key)
  }

  forEach (f) {
    if (this.data) {
      this.data.forEach(itm => f(itm[0]))
    }
    else {
      this.src.get().forEach(f)
    }
    return this
  }

  sort (f) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, [...d].sort((a, b) => f(a[0], b[0])), this.key)
  }

  first () {
    let i = this.data ? this.data[0][1] : 0
    return this.src.entry(i)
  }

  last () {
    let i = this.data ? this.data[this.data.length-1][1] : this.src.size()-1
    return this.src.entry(i)
  }

  range (offset, limit) {
    let d = this.data || this.src.get().map((v, i) => [v, i])
    return new Stream(this.src, d.slice(offset, offset+limit), this.key)
  }

  entries (f, idResolver) {
    if (this.data) {
      this.data.forEach(itm => f(this.src.entry(itm[1]), itm[1]))
    }
    else {
      const v = this.src.get()
      for (let i in v) {
        f(this.src.entry(i), i, idResolver ? idResolver(v[i]) : Keys.get(v[i]))
      }
      // if (this.src._removed) {
      //   for (let i = 0; i < this.src._removed.length; i++) {
      //     const entry = this.src._removed[i]
      //     f(entry, entry.id)
      //   }
      // }
    }
  }

  name (k) {
    return new Stream(this.src, this.data, k)
  }

}


export default Stream
