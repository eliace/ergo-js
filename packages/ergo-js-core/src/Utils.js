

export const deepClone = (o) => {
  if (o != null) {
    if (o.constructor === Object) {
      const copy = {}
      for (let i in o) {
        copy[i] = deepClone(o[i])
      }
      o = copy
    }
    else if (o.constructor === Array) {
      const copy = []
      for (let i = 0; i < o.length; i++) {
        copy[i] = deepClone(o[i])
      }
      o = copy
    }
  }
  return o
//  return JSON.parse(JSON.stringify(o))
}



export const buildProp = (prop, nextProp, rule) => {

  if (rule) {
    prop = rule(prop, nextProp)
  }
  else {
    if (prop && (prop.constructor === Object || prop.constructor === Array)) {
      prop = buildOpts(prop, nextProp)
    }
    else if (nextProp !== undefined) {
      if (nextProp != null && (nextProp.constructor === Object || nextProp.constructor === Array)) {
        prop = deepClone(nextProp)
//        console.log('deep', nextProp, prop)
      }
      else {
        prop = nextProp
      }
    }
  }

  return prop
}




export const buildOpts = (opts, nextOpts, rules, path) => {

  if (typeof nextOpts == 'function') {
    nextOpts = nextOpts()
  }

  // если nextOpts является объектом
  if (nextOpts.constructor === Object) {
    for (let i in nextOpts) {
      // if (i[0] == '!') {
      //   opts[i.substr(1)] = nextOpts[i]
      // }
      // else if (i[0] == '+') {
      //   // TODO
      // }
      // else if (i[0] == '-') {
      //   // TODO
      // }
      // else {
        opts[i] = buildProp(opts[i], nextOpts[i], rules && (rules[i] || rules[i[0]]))
      // }
    }
  }
  // если nextOpts является массивом
  else if (nextOpts.constructor === Array) {
    for (let i = 0; i < nextOpts.length; i++) {
      opts[i] = buildProp(opts[i], nextOpts[i], rules && (rules[i] || rules[i[0]]))
    }
  }
  else if (nextOpts instanceof Promise) {
    return Promise.all([opts, nextOpts]).then(o => {
      return buildOpts(o[0], o[1], rules, path)
    })
  }
  else if (nextOpts !== undefined) {
    opts = nextOpts
  }

  return opts
}


export const defaultFactory = (item, context, defaultType) => {

  // if (item.as && item.base) {
  //   console.log(item)
  // }

  var ItemClass = null

//   if (typeof item === 'function') {
//     item = item()
// //    ItemClass = item
//   }
//
//   if (item instanceof Promise) {
//     return item.then((itm) => {
//       return defaultFactory(itm, defaultType, context)
//     })
//   }

  if (item) {
    ItemClass = item.base || defaultType
    if (typeof item.as === 'function') {
      ItemClass = item.as
    }
  }
  else {
    item = {}
    ItemClass = defaultType
  }

  if (typeof ItemClass === 'string') {
    ItemClass = alias(ItemClass)
  }

  return new ItemClass(item, context)
}


// export const ensure = (obj, path, value) => {
//
// }


export const hashCode = (v) => {

  if (v == null) {
    return 0
  }

  const s = (typeof v == 'string') ? v : JSON.stringify(v)

  var hash = 0;
  if (s.length == 0) {
      return hash;
  }
  for (var i = 0; i < s.length; i++) {
      var char = s.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}


export class Binder {//extends Function {
  constructor (domain, prop, format) {
    this.key = domain
    this.prop = prop
    this.format = format
    // const f = function () {
    //   return {domain: f._domain, prop: f._prop}
    // }
    // Object.setPrototypeOf(f, new.target.prototype)
    // f._domain = domain
    // f._prop = prop
    // return f
  }
}


export const bindDomain = new Proxy({}, {
  get: function (target, domain) {
    return (prop, format) => {
//      console.log('new binder', domain, prop)
      return new Binder(domain, prop, format)
    }
  }
})



export function reconcile2 (prev, next, temp) {
  const prevKeys = {}
  const nextKeys = {}
  prev.forEach(itm => prevKeys[itm.k] = itm)
  next.forEach(itm => nextKeys[itm.k] = itm)

  const deleted = {}
  const added = {...nextKeys}
  const updated = {}

  for (let i in prevKeys) {
    if (i in nextKeys) {
      updated[i] = {...prevKeys[i], next: nextKeys[i]}
      delete added[i]
    }
    else {
      deleted[i] = prevKeys[i]
    }
  }  

  return {
    added: Object.values(added), // next
    deleted: Object.values(deleted), // prev
    updated: Object.values(updated) // prev + next
  }
}


export const reconcile = function (list_a, list_b) {
  const hash_a = {}
  const hash_b = {}
  list_a.forEach(itm => hash_a[itm.k] = itm)
  list_b.forEach(itm => hash_b[itm.k] = itm)

  const deleted = {}
  const added = {...hash_b}
  const updated = []
  const moves = []

  for (let i in hash_a) {
    if (i in hash_b) {
      updated.push(hash_a[i])
//      updated[i] = hash_a[i]
      delete added[i]
    }
    else {
      deleted[i] = hash_a[i]
    }
  }

  let list_c = []
  for (let i = 0; i < list_b.length; i++) {
    const a = hash_a[list_b[i].k]
    if (a) {
      list_c.push(a)// || {i, k: list_b[i].k})
    }
    // if (!(list_a[i].k in deleted)) {
    //   list_c.push(list_a[i])
    // }
  }

  for (let i = 0; i < list_c.length; i++) {
    const c = list_c[i]
    let n = 0
    for (let j in deleted) {
      if (c.i > deleted[j].i) {
        n--
      }
    }
    c.i += n
  }

  // for (let j in added) {
  //   for (let i = 0; i < list_c.length; i++) {
  //     const c = list_c[i]
  //     if (added[j].i != i && c.i > added[j].i) {
  //       c.i--
  //     }
  //   }
  // }

  // for (let i = 0; i < list_c.length; i++) {
  //   const c = list_c[i]
  //   let n = 0
  //   for (let j in added) {
  //     if (c.i > added[j].i) {
  //       n++
  //     }
  //   }
  //   c.i += n
  // }

  // for (let i in added) {
  //   list_c.push(added[i])
  // }

//  console.log(list_c, list_b)

let maxIdx = -1

  for (let x = 0; x < list_c.length*2; x++) {

  const diffs = []
  for (let i = 0; i < list_c.length; i++) {
    diffs[i] = i - list_c[i].i
  }

//  console.log(diffs)

//  debugger

  // // считаем смещения
  // const diffs = []
  // const list_c = {...updated}
  // for (let i in updated) {
  //   const d = hash_b[i] - hash_a[i]
  //   if (d != 0) {
  //     diffs.push({i, d})
  //   }
  // }
  // ищем максимальное смещение
  maxIdx = -1
  let maxd = 0
  for (let i = 0; i < diffs.length; i++) {
    if (Math.abs(diffs[i]) > maxd) {
      maxd = Math.abs(diffs[i])
      maxIdx = i
    }
  }

//  console.log('max', maxd, maxIdx)

  if (maxIdx > -1) {
    const c = list_c[maxIdx]
    moves.push({...c, to: maxIdx})
    if (diffs[maxIdx] > 0) {
      // смещаем вправо
      for (let i = 0; i < list_c.length; i++) {
        if (list_c[i].i > c.i && list_c[i].i <= maxIdx) {
          list_c[i].i--
        }
      }
    }
    else {
      // смещаем влево
      for (let i = 0; i < list_c.length; i++) {
        if (list_c[i].i >= maxIdx && list_c[i].i < c.i) {
          list_c[i].i++
        }
      }
    }
    c.i = maxIdx
  }
  else {
    break
  }

//  console.log(list_c)
}

if (maxIdx > -1) {
  console.error('Reconcile error', list_a, list_b);
}


  return {
    added,
    deleted,
    updated,
    moves
  }
}



export function defaultCompare (a, b) {
  const w1 = a.options.weight || 0
  const w2 = b.options.weight || 0
  if (w1 == w2) {
    const i1 = a.index || 0
    const i2 = b.index || 0
    return i1 - i2
  }
  return w1 - w2
}

export function defaultRender (child) {
  return child.render ? child.render() : child
}



export function createOptionsProto (descriptors) {
  const proxy = {}
  const names = Object.keys(descriptors)
  for (let i in names) {
    const setter = function (v) {
      return this.__target.opt(names[i], v)
    }
    const getter = function () {
      return this.__target.opt(names[i])
    }
    Object.defineProperty(proxy, names[i], {
      set: setter,
      get: getter
    })
  }
  return proxy
}


export function createPropsProto (descriptors) {
  const proxy = {}
  const names = Object.keys(descriptors)
  for (let i in names) {
    const setter = function (v) {
      return this.__target.set(names[i], v)
    }
    const getter = function () {
      return this.__target.get(names[i])
    }
    Object.defineProperty(proxy, names[i], {
      set: setter,
      get: getter
    })
  }
  return proxy
}



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

export function defaultIdResolver (v) {
  return Keys.get(v)
}

export function weakKey (v) {
  return Keys.get(v)
}

export function defaultKeyResolver (v) {
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


//export Binder
