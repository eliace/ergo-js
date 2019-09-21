import Options from './Options'


const Bindings = {

  Items2: function(v, key, source) {

    const items = []
    source.stream((entry, i) => {
      items.push({sources: {[key]: entry}})
    })

    return items
  },



  Items: function(v, key, source) {
    const o = this._inner.options
    let items = this.children.filter(child => child.index != null)
//    console.log(items.length, this.children.length)
    let add = {}
    let update = []

    // if (source.id == 'comments') {
    //   debugger
    // }

//    let del = []
    source.stream((entry, i) => {
//      console.log(entry.get())
      let found = null
      for (let j = 0; j < items.length; j++) {
        const item = items[j]
        if (item.options.sources[key] == entry) {
          update.push(item)
          found = item
          break
        }
      }
      if (!found) {
        add[i] = entry
//        console.log('to add', entry, update.length, this)
      }
      else {
        items.splice(items.indexOf(found), 1)
      }
    })

//    console.log('reconcile', Object.keys(add).length, update.length, items.length)

    items.forEach(item => this.removeItem(item))

    Object.keys(add).forEach(i => {
      let entry = add[i]
      this.addItem(new Options({sources: {[key]: entry}}, o.items ? o.items[i] : null), Number(i)/*, {...this.sources, ...{[key]: entry}}*/)
    })

    update.forEach(item => {
      let src = item.sources[key]
      item.rebind(src.get(), key, src)
    })

//    console.log('rebind items', v)
    // this.removeAllItems()
    // source.stream((entry, i) => {
    //   this.addItem(new Options({sources: {[key]: entry}}, o.items ? o.items[i] : null), i/*, {...this.sources, ...{[key]: entry}}*/)
    // })
  },

  Components: function(v, key, source) {
    const o = this.options

    let def = {...o.components}

    // if (source.src.id == 'posts') {
    //   debugger
    // }

    source.each((entry, i) => {
//      console.log(v, key)
      if (o.components && o.components[i]) {
        const s = entry.get()
        if (s !== false && !this['$'+i]) {
          // debugger
          // console.log(i, this)//'substate', i, s)
//          if (i == 'mainMenu') debugger
          this.addComponent(i, o.components[i]/*new Options({sources: {[key]: entry}}, o.components[i])*//*, {...this.sources, ...{[key]: entry}}*/)
//          delete def[i]
        }
        else if (s === false && this['$'+i]) {
          this.removeComponent(i)
        }
        delete def[i]
      }
    })

//    console.log('default', def)
    for (let i in def) {
      this.addComponent(i, o.components[i])
    }
  },

  Text: function(v) {
    this.opt('text', v)
  }

}


export default Bindings
