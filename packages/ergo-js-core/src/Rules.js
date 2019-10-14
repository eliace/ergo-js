import Options from './Options'
//import State from './State'

const Option = (x, y) => {
  return new Options(x, y)
}

//const State = (x, y) => {return new State(x, y)}

const OptionCollection = (x, y) => {

  if (y === false) {
    return false
  }

  let kv = {}
  if (x != null) {
    for (let i in x) {
      kv[i] = new Options(x[i])
    }
  }
  if (y != null) {
//    console.log('y', y)
    for (let i in y) {
      kv[i] = kv[i] ? kv[i].merge(y[i]) : new Options(y[i])
    }
  }
//  console.log(kv)
  return kv
}

const OptionArray = (x, y) => {
  // TODO
}

const StringArray = (x, y) => {
  let arr = []
  if (x != null) {
    arr = [].concat(x)
  }
  if (y != null) {
    arr = arr.concat(y)
  }
  return arr
}

const Overlap = (x, y) => {
  return y
}

export default {
  Option,
  OptionCollection,
  OptionArray,
  StringArray,
  Overlap
}
