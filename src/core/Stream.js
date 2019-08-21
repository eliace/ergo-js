import {defaultIdResolver} from './Utils'


class Stream {

  constructor (src, data, key, idResolver) {
    this.src = src
    this.data = data
    this.key = key
    this.idResolver = idResolver
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
        callback(this.src.entry(i), i, value[i], (this.idResolver || defaultIdResolver)(value[i]))
      }
    }
    else {
      const allProps = {...value, ...props}
      for (let k in value) {
        callback(this.src.entry(k), k, value[k])
      }
      for (let k in props) {
        // TODO возможно, правильнее при коллизии использовать property
        if (!(k in value)) {
          const entry = this.src.entry(k)
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

}


export default Stream
