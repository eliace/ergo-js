

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
      if (nextProp.constructor === Object || nextProp.constructor === Array) {
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

  // если nextOpts является объектом
  if (nextOpts.constructor === Object) {
    for (let i in nextOpts) {
      opts[i] = buildProp(opts[i], nextOpts[i], rules && (rules[i] || rules[i[0]]))
    }
  }
  // если nextOpts является массивом
  else if (nextOpts.constructor === Array) {
    for (let i = 0; i < nextOpts.length; i++) {
      opts[i] = buildProp(opts[i], nextOpts[i], rules && (rules[i] || rules[i[0]]))
    }
  }
  else if (nextOpts !== undefined) {
    opts = nextOpts
  }

  return opts
}


export const defaultFactory = (item, defaultType, context) => {

  var ItemClass = null

  if (typeof item === 'function') {
    ItemClass = item
  }
  else if (item) {
    ItemClass = item.type || item.alias || item.base || defaultType
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


export const ensure = (obj, path, value) => {

}


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
    this.domain = domain
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




//export Binder
