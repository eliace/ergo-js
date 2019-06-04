

class Source {

  // возможные опции:
  // - кэширование get
  // - удаление свободных наблюдаемых объектов
  // - модель данных

  constructor(v, k) {
    this.id = k
    this.src = v
    this.entries = Array.isArray(v) ? [] : {}
    this.observers = []
    this.isNested = v instanceof Source
//    this.effects = {}
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
      this.update(null, 'set') // ?
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
          this.update('asc', 'set')
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

    return v
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

      if (this.entries)

      if (Array.isArray(this.entries)) {
        if (this.entries.length) {
          console.warn('toggling object value')
        }
      }
      else {
        if (Object.keys(this.entries).length) {
          console.warn('toggling object value')
        }
      }

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
        this.update('asc')
      }
    }
  }

  join(target, dataChanged, dataRemoved, key, dataEffects) {
    this.observers.push({target, dataChanged, dataRemoved, key, dataEffects})
  }

  unjoin(target) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i].target == target) {
        this.observers.splice(i, 1)
        break
      }
    }

    // if (this.observers.length == 0 && this.isNested) {
    //   let n = Array.isArray(this.entries) ? this.entities.length : Object.keys(this.entries).length
    //   if (!n) {
    //     delete this.src.entries[this.id]
    //   }
    // }
  }

  update(direction, event) {
    if (!this._updating) {
      this._updating = true
  //    delete this.cache
      if (this.isNested && direction != 'desc' && direction != 'none') {
        this.src.update('asc', event)
      }
      this.observers.forEach(t => {
        t.dataChanged.call(t.target, this.get(), t.key)
        // let v = this.get()
        // if (typeof t.dataChanged == 'function') {
        //   t.dataChanged.call(t.target, v, t.key)
        // }
        // else {
          // for (let i = 0; i < t.dataChanged.length; i++) {
          //   v = t.dataChanged[i].call(t.target, v, t.key)
          //   if (v === undefined) break // обеспечивает безусловное исполнение первого элемента цепочки
          // }
//        }
//        t.dataChanged.call(t.target, this.get()/*, this*/, t.key)
        // if (t.dataEffects) {
        //   t.dataEffects.call(t.target, 'done', this.get(), {event})
        // }
      })

      if (direction != 'asc' && direction != 'none') {
        for (let i in this.entries) {
          this.entries[i].update('desc', event);
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

    // TODO потоку не обязательно сразу же создавать вложенный observable

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

  // ?
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

  walk(callback) {
    callback(this)
    for (let i in this.entries) {
      this.entries[i].walk(callback)
    }
  }

  mergeWith(v) {
    let oldVal = this.get()

    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i].update('desc')
        }
      }
    }
    else {
      for (let i in v) {
        oldVal[i] = v[i]
        if (this.entries[i]) {
          delete this.entries[i].cache
          this.entries[i].update('desc')
        }
      }
    }

    this.update('asc')
  }


  notify (event, data, target) {
    this.observers.forEach(t => {
      if (target == null || target == t.target) {
        if (t.dataEffects) {
          t.dataEffects.call(t.target, event, data, t.key)
        }
      }
    })
  }

  // effect (effect) {
  //
  //   if (effect) {
  //
  //     effect = {...effect, event, data, target}
  //
  //     if (!this.effects) {
  //       this.effects = {}
  //       this.waiting = []
  //     }
  //
  //     if (effect.waitFor) {
  //       this.waiting.push(effect)
  //       effect = null
  //     }
  //   }
  //
  //   if (effect) {
  //     const id = window.performance.now()
  //
  //     this.effects[id] = effect
  //
  //     if (effect.resolver instanceof Promise) {
  //       effect.resolver
  //         .then(v => {
  //           const e = this.effects[id]
  //           delete this.effects[id]
  //           if (e) {
  //             this.emit(e.name+':'+'done', v, e.target)
  //           }
  //         })
  //         .catch(err => {
  //           const e = this.effects[id]
  //           delete this.effects[id]
  //           if (e) {
  //             this.emit(e.name+':'+'fail', err, e.target)
  //           }
  //         })
  // //        this.emit(effect.name+':'+'begin', null, target)
  //     }
  //     else {
  //       if (this[effect.event]) {
  //         this[effect.event](effect.data)
  //       }
  //       this.emit(effect.name+':'+'done', effect.data, effect.target)
  //     }
  //   }
  //
  //   return effect
  // }

  emit (event, data, target, effects) {

    if (effects) {

      if (!this.effects) {
        this.effects = {}
        this.waiting = []
      }

      if (!Array.isArray(effects)) {
        effects = [effects]
      }

      let isWaiting = false
      const active = []
      const delayed = []
      for (let i = 0; i < effects.length; i++) {
        let effect = effects[i]

        effect = {...effect, event, data, target}

        if (effect.waitFor) {
          delayed.push(effect)
//          this.emit(effect.name+':'+'wait', null, effect.target)
        }
        else {
          active.push(effect)
        }
      }

      if (active.length) {
        for (let i = 0; i < active.length; i++) {
          let effect = active[i]

          const id = window.performance.now()

          this.effects[id] = effect

          if (effect.resolver instanceof Promise) {
            effect.resolver
              .then(v => {
                const e = this.effects[id]
                delete this.effects[id]
                if (e) {
                  this.emit(e.name+':'+'done', v, e.target)
                }
              })
              .catch(err => {
                const e = this.effects[id]
                delete this.effects[id]
                if (e) {
                  this.emit(e.name+':'+'fail', err, e.target)
                }
              })
              this.emit(effect.name, null, target)
          }
          else {
            if (this[effect.event]) {
              this[effect.event](effect.data)
            }
            this.emit(effect.name+':'+'done', effect.data, effect.target)
          }

        }

        return
      }

      if (delayed.length) {
//        this.waiting.concat(delayed)

        if (this[event]) {
          this[event](data)
        }

        for (let i = 0; i < delayed.length; i++) {
          let effect = delayed[i]
          this.waiting.push(effect)
          this.notify(effect.name+':'+'wait', null, effect.target)
//          this.emit(effect.name+':'+'wait', null, effect.target)
        }

        return
      }

    }

//    if (effect) {

//       const id = window.performance.now()
//
//       this.effects[id] = effect
//
//       if (effect.resolver instanceof Promise) {
//         effect.resolver
//           .then(v => {
//             const e = this.effects[id]
//             delete this.effects[id]
//             if (e) {
//               this.emit(e.name+':'+'done', v, e.target)
//             }
//           })
//           .catch(err => {
//             const e = this.effects[id]
//             delete this.effects[id]
//             if (e) {
//               this.emit(e.name+':'+'fail', err, e.target)
//             }
//           })
// //        this.emit(effect.name+':'+'begin', null, target)
//       }
//       else {
//         if (this[event]) {
//           this[event](data)
//         }
//         this.emit(effect.name+':'+'done', data, target)
//       }


    // }
    // else {
    if (this[event]) {
      this[event](data)
    }
    else if (event == 'init') { // changed
      this.observers.forEach(t => {
        if (target == null || target == t.target) {
          t.dataChanged.call(t.target, this.get(), t.key)
        }
      })
    }
    this.notify(event, data, target)
//    }

    if (this.waiting && this.waiting.length) {
//      debugger
      for (let i = 0; i < this.waiting.length; i++) {
        const eff = this.waiting[i]
        for (let j = 0; j < eff.waitFor.length; j++) {
          if (eff.waitFor[j] == event) {
            eff.waitFor.splice(j, 1)
            break
          }
        }
        if (eff.waitFor.length == 0) {
          this.waiting.splice(i, 1)
          this.emit(eff.event, eff.data, eff.target, {...eff, waitFor: false, resolver: eff.use(data)})
          break
        }
      }
    }


  }



  emit2 (event, data, target, context) {

    if (this[event]) {
      if (data instanceof Promise) {

        if (!this.effects) {
          this.effects = {}
        }

        const id = window.performance.now()

        const e = {id, event, data, target, context, status: 'wait'}

        this.effects[id] = e

        this.notify(e)
//        this.emit('wait', data, e.target, e)
        // this.observers.forEach(t => {
        //   if (t.dataEffects) {
        //     t.dataEffects.call(t.target, 'wait', data, target)
        //   }
        // })

        data
        .then (value => {
          const eff = this.effects[id]
          if (eff) {
            delete this.effects[id]
            eff.status = 'done'
            this.emit(eff.event, value, eff.target, eff.context)
          }
        })
        .catch (err => {
          console.error(err)
          const eff = this.effects[id]
          if (eff) {
            delete this.effects[id]
            eff.data = err
            eff.status = 'error'
            this.notify(eff)
          }
        })

        return
//        debugger
      }
      else {
        const out = this[event](data)
        this.notify({status: 'done', event, data, target, context})
        return out
      }
    }


    if (event == 'init') {

      this.observers.forEach(t => {
        if (target == null || target == t.target) {
          t.dataChanged.call(t.target, this.get(), t.key)
          // let v = this.get()
          // // if (typeof t.dataChanged == 'function') {
          // //   t.dataChanged.call(t.target, v, t.key)
          // // }
          // // else {
          //   for (let i = 0; i < t.dataChanged.length; i++) {
          //     v = t.dataChanged[i].call(t.target, v, t.key)
          //     if (v === undefined) break // обеспечивает безусловное исполнение первого элемента цепочки
          //   }
//          }
//          t.dataChanged.call(t.target, this.get()/*, this*/, t.key)
          // if (t.dataEffects) {
          //   t.dataEffects.call(t.target, event, this.get(), t.target)
          // }
        }
        // else if (!target) {
        //
        // }
      })
      this.notify({status: 'done', event, target, context, data})
    }
    else {
      this.observers.forEach(t => {
        // if (target && target == t.target) {
        // }
        // else if (!target) {
        //
        // }
        if (target == null || target == t.target) {
          if (t.dataEffects) {
            t.dataEffects.call(t.target, event, data, target, context)
          }
        }
      })
    }

    // if (this[event]) {
    //   if (effect) {
    //     if (typeof effect === 'function') {
    //       const v = this[event](data)
    //       this.observers.forEach(watcher => {
    //         effect.call(watcher.target, v)
    //       })
    //     }
    //     else {
    //       this[event](data)
    //     }
    //   }
    //   else {
    //     this[event](data)
    //   }
    // }
  }

}


export default Source
