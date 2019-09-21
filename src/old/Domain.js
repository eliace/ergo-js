import Source from './Source'
import Effect from './Effect'


class Domain extends Source {

  constructor (v, o, k) {
    super(v, o, k)

    if (this.options.methods) {
      for (let i in this.options.methods) {
        this.$method(i, this, this.options.methods[i])
      }
    }

    if (this.options.watchers) {
      for (let i in this.options.watchers) {
        this.$watch(this.options.watchers[i], this)//, i)
      }
    }

    if (this.options.listeners) {
      for (let i in this.options.listeners) {
        this.$listen(i, this, this.options.listeners[i])
      }
    }

    if (this.options.events) {
      for (let i in this.options.events) {
        this.$event(i, this)
      }
    }

    if (this.options.effects) {
      for (let i in this.options.effects) {
        this.$effect(this.options.effects[i], i, this)
      }
    }

    if (this.options.actions) {
      for (let i in this.options.actions) {
        this.$action(i, this, this.options.actions[i])
      }
    }

  }



  // use (name, ctor, context) {
  //   if (!this.effectors) {
  //     this.effectors = {}
  //   }
  //   this.effectors[name] = {ctor, context}
  // }
  //
  // unuse (name) {
  //   delete this.effectors[name]
  // }

//   init (target) {
// //    console.log('init', target)
//     this.observers.forEach(t => {
//       if (target == null || target == t.target) {
//         t.dataChanged.call(t.target, this.get(), t.key)
//       }
//     })
//   }

  // get snapshot() {
  //   let watching = []
  //   if (this._waiting) {
  //     watching = this._waiting.map(v => v.name || 'effector:'+v.effector)
  //   }
  //   let acting = []
  //   if (this._acting) {
  //     for (let i in this._acting) {
  //       const v = this._acting[i]
  //       acting.push(v.name || 'effector:'+v.effector)
  //     }
  //   }
  //   let events = []
  //   if (this._unresolved) {
  //     for (let i in this._unresolved) {
  //       const v = this._unresolved[i]
  //       events.push('@'+v.name)
  //     }
  //   }
  //   return deepClone({
  //     watching,
  //     acting,
  //     events
  //   })
  // }


  $emit (eventName, eventData) {
    try {

    const event = (eventName.constructor == Object) ? eventName : {name: eventName, source: this, ...eventData}

    const groups = event.name.split('.')
    groups.pop()
    event.ns = event.ns || groups.join('.')


    if (this.options.logEvents) {
      console.log(eventName, event)
    }

    if (this._watchers && event.state != 'resumed') {
      const promises = []
      const effects = []
      this._watchers.forEach((watchers, target) => {
        if (!event.target || target == this || event.target == this || event.target == target) {  // важно для локальных событий типа init/destroy
          watchers.forEach(watcher => {
            if (watcher.when(event, target)) {
              const result = watcher.callback.call(target, event)
              if (result instanceof Promise) {
                promises.push(result)
              }
              else if (result instanceof Effect) {
                if (result.source != this) {
                  console.warn('Shared effect', result)
                  result.shareWith(this)
                }
                effects.push(result)
              }
            }
          })
        }
      })
      // если есть промисы, то создаем эффект, который ждет их окончания
      if (promises.length > 0) {
        const effect = new Effect(event.name+'-suspend')
        effect.source = this
        Promise.all(promises)
          .then(data => {
            this.$emit(effect.done)
          })
          .catch(data => {
            this.$emit(effect.fail)
          })
          effects.push(effect)
          this._deferred.push(effect)
      }
      if (effects.length > 0) {
        event.state = 'suspended'
        event.all = effects
      }
    }

    if (event.state == 'suspended') {
      if (!this._suspended) {
        this._suspended = []
      }
      this._suspended.push(event)
      return // ?
    }

//    console.log(event.name, event)
    let result = this.resolve(event)


    if (this._deferred && this._deferred.length) {
      this._deferred.forEach(eff => {
        if (!eff.isFinal) {
          if (eff.parent && eff.parent.isFinal) {
//            console.log('finalize parent', eff)
            eff.finalize()
            this.$emit(eff.final, {target: eff.target}) // здесь было бы правильно анализировать статус родительского эффекта
          }
          else if (eff.done == event.name || eff.fail == event.name || eff.cancel == event.name) {
//            console.log('finalize self', eff)
            eff.finalize(event.name, event.data)
          }
        }
      })
      this._deferred = this._deferred.filter(eff => !eff.isFinal)
//      debugger
    }

    if (this._suspended && this._suspended.length) {
//      console.log('susp', event.name)
      this._suspended.forEach(evt => {
//        console.log(evt.name, evt.all, event)
        if (evt.state != 'suspended') {
          return // FIXME emit нужно вызывать только после удаления события из списка
        }
        if (evt.ns == event.ns && event.ns) {
//          evt.state = 'canceled'
          for (let i = evt.all.length-1; i >= 0; i--) {
//            evt.all[i].finalize(evt.all[i].cancel)
            this.$emit(evt.all[i].cancel, {data: '#canceled'})
          }
          console.log('event conflict', evt, event)
        }
        for (let i = evt.all.length-1; i >= 0; i--) {
          if (evt.all[i].isCanceled) {
//            debugger
            evt.state = 'canceled'
            break
          }
          if (evt.all[i].isFinal) {
            evt.all.splice(i, 1)
          }
        }
        if (evt.state == 'canceled') {
          this.$emit(new Effect(evt.name).cancel, {target: evt.target})
        }
        else if (evt.all.length == 0) {
          console.log('resume', evt)
          evt.state = 'resumed'
          this.$emit(evt)
        }
      })
      this._suspended = this._suspended.filter(evt => evt.state == 'suspended')
    }

    return result
    }
    catch (err) {
      console.error(err)
    }
  }

  resolve (event) {

    if (event.state == 'resumed') {
      console.log('resolve resumed', event)
    }

    if (this._deferred) {
      this._deferred.forEach(eff => {
        if (eff.name == event.name || (event.ns && eff.ns == event.ns)) {
          if (event.policy == 'abandon') {
            return this.$emit(new Effect(event.reject), {target: event.target})
          }
          else {
            // по умолчанию отменяем эффект
            this.$emit(eff.cancel, {data: '#canceled'})
//                      eff.finalize(eff.cancel)
          }
        }
      })
    }

    if (event.type != 'method') {
      this.observers.forEach(t => {
        if (event.target == null || event.target == t.target) {
          if (t.dataChanged) {
            t.dataChanged.call(t.target, event, t.key)
          }
        }
      })
    }

    const results = []

    if (this._listeners) {
      this._listeners.forEach((listeners, target) => {
        if (event.target == null || event.target == target) {
          const listener = listeners[event.name]
//          const policy = this._policices && this._policies[event.name]
          const key = listeners['key']
          if (listener) {

//            console.log('listener', listener.type)

            let result = null
            if (listener.type == 'method') {
              result = event.params
                ? listener.callback.apply(target, [...event.params, key])
                : listener.callback.call(target, event.data, key)
            }
            else {
              result = listener.callback.call(target, event, target)
            }


            if (result instanceof Promise) {
              // событие имеет отложенное исполнение
              const effect = new Effect(event.name)
              effect.source = this
              effect.target = target
              effect.policy = event.policy || listener.policy
//              effect.promise = result
              effect.ns = event.ns

              console.log('ns', event.ns)

//               if (this._deferred) {
//                 this._deferred.forEach(eff => {
//                   if (eff.name == effect.name || (effect.ns && eff.ns == effect.ns)) {
//                     if (effect.policy == 'abandon') {
//                       this.emit(effect.reject)
//                       effect.finalize(effect.reject)
//                     }
//                     else {
//                       // по умолчанию отменяем эффект
//                       this.emit(eff.cancel, {data: '#canceled'})
// //                      eff.finalize(eff.cancel)
//                     }
//                   }
//                 })
//               }

              if (!effect.isFinal) {

                result
                  .then(data => {
                    if (!effect.isFinal) {
//                      console.log('done', effect)
                      this.$emit(effect.done, {data, target})
                    }
                  })
                  .catch(data => {
                    if (!effect.isFinal) {
                      if (data instanceof Effect) {
                        if (data.isCanceled) {
                          this.$emit(effect.cancel, {data, target})
                        }
                        else {
                          debugger
                        }
                      }
                      else {
                        this.$emit(effect.fail, {data, target})
                      }
                    }
                  })

                if (!this._deferred) {
                  this._deferred = []
                }
                this._deferred.push(effect)
              }

              result = effect
            }
            else if (result instanceof Effect) {
              const effect = new Effect(event.name)
              effect.parent = result
              effect.target = event.target
              effect.ns = event.ns
              if (result.source != this) {
                console.warn('Shared effect', result)
                result.shareWith(this)
              }
      //        console.log('parent effect', result, event)
              // TODO здесь нужно связать эффекты, в т.ч. отмену
              this._deferred.push(effect)
            }
            else if (result != undefined) {
              const effect = new Effect(event.name)
              this.$emit(effect.done, {data: result, target: event.target})
            }

            results.push(result)
          }
        }
      })
    }

    if (results.length > 1) {
      console.warn('multiple results', results)
    }

    return results[0]
  }


  // computed (name, target, computor) {
  //   this.comp({[name]: computor}, target)
  // }
  //
  //
  //
  // comp (computors, target) {
  //   if (!this._computors) {
  //     this._computors = new Map()
  //   }
  //   this._computors[target] = computors
  //   if (!this.options.computed) {
  //     this.options.computed = {}
  //   }
  //   Object.assign(this.options.computed, computors)
  //   for (let i in computors) {
  //     this.options.computed[i] = computors[i].bind(target)
  //     this.compute(this.get())
  //   }
  // }
  //
  // uncomp (target) {
  //   if (this._computors) {
  //     const computors = this._computors.get(target)
  //     for (let i in computors) {
  //       delete this.options.computed[i]
  //     }
  //   }
  // }

  on (listeners={}, target, ns, type='method') {
    if (!this._listeners) {
      this._listeners = new Map()
    }
    let l = this._listeners.get(target)
    if (!l) {
      if (!this._key) {
        console.warn('Stream key not defined!', this)
      }
      l = {key: this._key}
    }
    for (let i in listeners) {
      const groups = i.split('.')
      const k = groups.pop()
      ns = ns || groups.join('.')

      // let effector = null
      // let g = this
      // for (let j in groups) {
      //   if (!g[j]) {
      //
      //   }
      // }
      if (!this[i]) {
        this[i] = (...args) => {
//          try {
            return this.$emit('@'+i, {params: [...args], type, ns/*, target*/})
          // }
          // catch (err) {
          //   console.error(err)
          // }
        }
        this[i].done = '@'+i+':done'
        this[i].fail = '@'+i+':fail'
        this[i].on = '@'+i
        this[i].cancel = '@'+i+':cancel'
        this[i].n = 1
        this[i].ns = ns

      }
      else {
        console.warn('method ['+i+'] already exists')
        this[i].n++
      }

      if (typeof listeners[i] == 'function') {
        l['@'+i] = {callback: listeners[i], type: 'method'}
      }
      else {
        if (listeners[i].on) {
          l['@'+i] = {callback: listeners[i].on, type: 'method', policy: listeners[i].policy}
        }
        if (listeners[i].done) {
          l['@'+i+':done'] = {callback: listeners[i].done, type: 'method'}
        }
        if (listeners[i].fail) {
          l['@'+i+':fail'] = {callback: listeners[i].fail, type: 'method'}
        }
      }

    }
    this._listeners.set(target, l)
  }

  off (target) {
    if (this._listeners) {
      if (this._listeners.has(target)) {
        // поверяем, нужно ли удалить метод
        const l = this._listeners.get(target)
        for (let i in l) {
          const method = this[i.substr(1)]
          if (i != 'key' && method) {
            if (--method.n == 0) {
              console.log('delete method', i)
              delete this[i.substr(1)]
            }
          }
        }
        this._listeners.delete(target)
      }
    }
  }


  $on (name, callback, target) {
    if (typeof name === 'function') {
      name = name.on.substr(1) // FIXME
    }
    this.$listen(name, target, callback)
  }

  $listen (name, target, callback, policy) {
    if (!this._listeners) {
      this._listeners = new Map()
    }
    let tl = this._listeners.get(target)
    if (!tl) {
      if (!this._key) {
        console.warn('key not defined!')
      }
      tl = {key: this._key}
      this._listeners.set(target, tl)
    }
    tl['@'+name] = {callback, policy}
  }

  $unlisten (target) {
    if (this._listeners) {
      this._listeners.delete(target)
    }
  }

  $effect (eff, name, target) {
    this.$watch(eff, target, name)
  }

  effect (name, target, func, ns) {
    throw new Error('Unsupported method effect')
    this.on({[name]: func}, target, ns)
    return this[name]
  }

  watch () {
    throw new Error('Unsupported method watch')
  }

  unwatch () {
    throw new Error('Unsupported method unwatch')
  }

  $watch (when, target, callback) {
    if (!this._watchers) {
      this._watchers = new Map()
    }
    let watchers = this._watchers.get(target)
    if (!watchers) {
      watchers = []
      this._watchers.set(target, watchers)
    }

    const watcher = {when, callback}

    const i = callback

    if (typeof callback == 'string') {
      watcher.callback = (e) => {
        return this.$emit('@'+i, {params: e.params, target: e.target, data: e.data, cache: e.cache})
      }
    }

    if (when.constructor == Object) {
      const w = when
      if (w.on) {
        this.$listen(i, target, w.on, w.policy)
      }
      if (w.done) {
        this.$listen(i+':done', target, w.done)
      }
      if (w.fail) {
        this.$listen(i+':fail', target, w.fail)
      }
      if (w.cancel) {
        this.$listen(i+':cancel', target, w.cancel)
      }
      if (w.callback) {
        watcher.callback = w.callback
      }
      watcher.when = w.when
    }

    if (typeof watcher.when == 'string') {
      const name = watcher.when
      watcher.when = (e) => e.name == name
    }

    watchers.push(watcher)
  }

  $unwatch (target) {
    if (this._watchers) {
      this._watchers.delete(target)
    }
  }

  $purge (target) {
    if (this._deferred) {
      this._deferred = this._deferred.filter(eff => eff.target != target)
    }
    if (this._suspended) {
      this._suspended = this._suspended.filter(evt => evt.target != target)
    }
  }

  unjoin(target) {
    super.unjoin(target)
    this.off(target)
//    this.uncomp(target)
    this.$unwatch(target)
    this.$purge(target)
  }

  $entry(k) {
    let e = this.entries[k]
    if (e == null) {
      if (this._properties && this._properties[k]) {
        // здесь можно вызывать фабрику
        const prop = this._properties[k]
        if (typeof prop === 'object') {
          e = new Domain(this, {...prop}, k)
        }
        else {
          e = new prop(this, null, k)
        }
      }
      else {
        e = new Domain(this, null, k) // в качестве опций должны передаваться параметры модели
      }
      this.entries[k] = e
    }
    return e
  }


  $event (name, target) {
    this.on({[name]: {}}, target, null, 'event')
    return this[name]
  }

  $method (name, target, listener, ns) {
    this.on({[name]: listener}, target, ns)
    return this[name]
  }

  $action (name, target, listener, ns) {
    this.on({[name]: listener}, target, ns)
    return this[name]
  }

  get actions () {
    return this
  }

}

export default Domain
