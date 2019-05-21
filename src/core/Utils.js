

const deepClone = (o) => {
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
      opts[i] = buildProp(opts[i], nextOpts[i], rules && rules[i])
    }
  }
  // если nextOpts является массивом
  else if (nextOpts.constructor === Array) {
    for (let i = 0; i < nextOpts.length; i++) {
      opts[i] = buildProp(opts[i], nextOpts[i], rules && rules[i])
    }
  }
  else if (nextOpts !== undefined) {
    opts = nextOpts
  }

  return opts
}


export const defaultFactory = (item, defaultType) => {

  var ItemClass = null

  if (typeof item === 'function') {
    ItemClass = item
  }
  else if (item) {
    ItemClass = item.type || item.alias || item.etype  || defaultType
  }
  else {
    item = {}
    ItemClass = defaultType
  }

  if (typeof ItemClass === 'string') {
    ItemClass = alias(ItemClass)
  }

  return new ItemClass(item)
}


export const ensure = (obj, path, value) => {

}
