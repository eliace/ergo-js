const expect = require('chai').expect
import {Source} from '../../src'
import Stream from '../../src/core/Domain2'
//const jsdom = require('mocha-jsdom')

//const Stream = Source.Stream
const {Effect, Event} = Stream

const delay = function (t, result=true, msg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result ? resolve(msg) : reject(msg)
    }, t)
  })
}

const doAsync = function (callback, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(callback())
      }
      catch (err) {
        reject(err)
      }
    }, timeout || 1)
  })
}

const createWork = (callback) => (...args) => doAsyncAction(() => callback.apply(null, args))

function eventKey (e) {
  return e.channel == Stream.CH_DEFAULT ? e.name : e.name+':'+e.channel
}

describe ('Source', () => {
  it ('Should reconcile entries on calc', () => {

    const data = new Source({
      list: ['Alice', 'Bob', 'Charlie', 'Dave'],
      query: ''
    }, {
      properties: {
        filteredList: {
          calc: function (v) {
            return v.list.filter(s => s.toLowerCase().indexOf(v.query) != -1)
          }
        }
      }
    })

    const entriesBefore = []

    data.$entry('filteredList').$stream().entries((entry) => {
      entriesBefore.push(entry)
    })

    data.set('query', 'c')

    const entriesAfter = []

    data.$entry('filteredList').$stream().entries((entry) => {
      entriesAfter.push(entry)
    })

    expect(entriesAfter[0]).to.equal(entriesBefore[0])
    expect(entriesAfter[1]).to.equal(entriesBefore[2])

  })

  it('Should get and set props', () => {

    const data = new Source({
      a: 'Alice',
      b: 5
    }, {
      properties: {
        a: {},
        b: {}
      }
    })

    expect(data.props.a).to.equal('Alice')
    expect(data.props.b).to.equal(5)

    data.props.a = 'Bob'
    data.props.b++

    expect(data.props.a).to.equal('Bob')
    expect(data.props.b).to.equal(6)
    expect(data.get('a')).to.equal('Bob')
    expect(data.get('b')).to.equal(6)

  })


  describe ('Stream', () => {

    it ('Should create effect', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})


      function startOnEvent (name, use, options={}) {
        const subscriber = s.subscribe({
          name,
          callback: function (e) {
            s.unsubscribe(subscriber)
            out.push('start')
            return startOnExec(name, use, options)
            // return use(e)
            //   .then(v => {
            //     return v
            //   })
            //   .then((v) => {
            //     s.emit(name, v, null, 'done')
            //   }, (err) => {
            //     s.emit(name, err, null, 'fail')
            //   })
              .then(this.resolver, this.rejector)
          },
          channels: ['default'],
//          ...options,
        })
        return new Promise((resolve, reject) => {
          subscriber.resolver = resolve
          subscriber.rejector = reject
        })
      }

      function startOnExec (name, use, options={}) {
        const subscriber = s.subscribe({
          name,
          channels: ['done', 'cancel', 'fail'],
          callback: function (e) {
            s.unsubscribe(subscriber)
            return options[e.channel] && options[e.channel](e)
          }
        })
        out.push('start2')
        return use()
          .then((v) => {
            s.emit(name, v, null, 'done')
          }, (err) => {
            s.emit(name, err, null, 'fail')
          })
      }

      // function publishEffect (name, use, options={}) {
      //   const subscriber = s.subscribe({
      //     name,
      //     callback: function (e) {
      //       if (e.channel == 'default') {
      //       //   return use(options.method ? e.data : e)
      //       //     .then((v) => {
      //       //       s.emit(name, v, null, 'done')
      //       //       subscriber.resolvers.forEach(r => r(v))
      //       //       return v
      //       //     }, (err) => {
      //       //       s.emit(name, err, null, 'fail')
      //       //       return err
      //       //     })
      //       // }
      //       // else {
      //       //   s.unsubscribe(subscriber)
      //       //   if (options[e.channel]) {
      //       //     return options[e.channel](e)
      //       //   }
      //       //   return e.data
      //       }
      //     },
      //     channels: ['default', 'done', 'fail', 'cancel'],
      //     ...options,
      //     resolvers: [],
      //     rejectors: []
      //   })
      //   return {
      //     then: function (resolve, reject) {
      //       subscriber.resolvers.push(resolve)
      //       subscriber.rejectors.push(reject)
      //       return this
      //     }
      //   }
      // }


      startOnEvent('test', () => delay(10))

      // startOnExec('test2', () => delay(5), {
      //   done: (e) => {
      //     out.push('x')
      //   }
      // })

      // s.on('test', () => {
      //   return
      // })

      // publishEffect('eff', (v) =>  delay(v), {
      //   done: (e) => { out.push('done') },
      //   method: true
      // })

      // s.on('test2', () => {
      //   return delay(10)
      // })
      //
      // s.on('test', async () => {
      //   await publishEffect('x', () =>  delay(10))
      //   await s.emit('test2')
      // })


      // function createEffect (name, use, options) {
      //   return () => publishEffect(name, use, options)
      // }
      //
      // createEffect('eff', () => delay(10))

      return Promise.all([s.emit('test')]).then(() => {
        console.log(out)
      })
    })

    it ('Should handle same event in different channels', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', (e) => {
        return doAsync(() => {
          return 5
        })
      }, 'default')

      s.on('test', (e) => {
        return doAsync(() => {
          return 6
        })
      }, 'done')

      return s.emit('test').then(() => {
        console.log(out)
      })
    })

    it ('Should watch non default channel', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', (e) => {
        return doAsync(() => {
          return 5
        })
      }, 'default')

      s.watch(e => e.name == 'test' && e.channel == 'done', (e) => {
        return doAsync(() => {
          return 6
        })
      })

      return s.emit('test').then(() => {
        console.log(out)
      })
    })

    it ('Should watch event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const delayEff = s.createEffect('delay', () => delay(20))

      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, (e) => {
        return 5
      })
      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, (e) => {
        return delay(10)
      })
      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, (e) => {
        return delayEff()// new Effect('delay', delay(20), null, s)
      })

      s.emit('test')

      return doAsync(() => {
        expect(out).to.be.deep.equal(['test', 'delay:wait', 'delay:done'])
      }, 30)
    })

    it ('Should handle event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const delayEff = s.createEffect('delay', () => delay(20))

      s.on('test', (e) => {
        return 1
      })
      s.on('test', (e) => {
        return delay(10)
      })
      s.on('test', (e) => {
        return delayEff()// new Effect('delay', delay(20), null, s)
      })

      s.emit('test')

      return doAsync(() => {
        expect(out).to.be.deep.equal(['test', 'delay:wait', 'test:wait', 'delay:done', 'test:done'])
      }, 30)
    })

    it ('Should handle nested event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', (e) => {
        return s.emit('test2', {})
      })
      s.on('test2', (e) => {
        return s.emit('test3', {})
      })
      s.on('test3', (e) => {
        return s.emit('test4', {})
      })
      s.on('test4', (e) => {
        return 5
      })

      return s.emit('test').then(v => {
        expect(v).to.be.equal(5)
        expect(out).to.be.deep.equal(["test", "test2", "test3", "test4", 'test3:wait', 'test2:wait', 'test:wait', "test3:done", "test2:done", "test:done"])
      })
    })

    it ('Should watch and handle event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, (e) => {
        out.push('watch test')
      })
      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, (e) => {
        out.push('watch test 2')
        return delay(10)
      })
      s.on('test', (e) => {
        return 10
      })

      return s.emit('test').then((v) => {
        expect(v).to.be.equal(10)
        expect(out).to.be.deep.equal(['test', 'watch test', 'watch test 2'])
      })
    })

    it ('Should watch and stop event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.watch(e => e.name == 'test', (e) => {
        return new Event(null, null, null, null, Stream.CH_DEFAULT) // блокируем обработку события
      })
      s.on('test', () => {
        return 1
      })

      s.emit('test').then((v) => {
        expect(out).to.be.deep.equal(['test', null])
        expect(v).to.be.undefined
      })
    })

    it ('Should watch and replace event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.watch(e => e.name == 'test', (e) => {
        return new Event('test2', null, null, null, Stream.CH_DEFAULT) // подменяем событие
      })
      s.on('test', () => {
        return 1
      })
      s.on('test2', () => {
        return 2
      })

      s.emit('test').then((v) => {
        expect(out).to.be.deep.equal(['test', 'test2'])
        expect(v).to.be.equal(2)
      })
    })


    it ('Should execute async operation', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const sum = s.createEvent('sum', {method: true})
      s.on('sum', async () => {
        const x = await op(1)
        const y = await op(2)
        const z = await op(3)
        return x + y + z
      })

      const op = s.createEvent('op', {method: true})
      s.on('op', (v) => {
        return doAsync(() => v * 10)
      })

      return sum().then((v) => {
        expect(v).to.be.equal(60)
        expect(out).to.be.deep.equal(['sum', 'op', 'op:wait', 'sum:wait', 'op:done', 'op', 'op:wait', 'op:done', 'op', 'op:wait', 'op:done', 'sum:done'])
      })
    })

    it ('Should error during watch', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', () => {
        out.push('ok')
      })
      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, () => {
        throw new Error('Watch error')
      })

      s.on('test2', () => {
        out.push('ok2')
      })
      s.watch(e => e.name == 'test2' && e.channel == Stream.CH_DEFAULT, () => {
        doAsync(() => {
          throw new Error('Watch error (async) 2')
        })
      })

      s.on('test3', () => {
        out.push('ok3')
      })
      s.watch(e => e.name == 'test3' && e.channel == Stream.CH_DEFAULT, () => {
        return doAsync(() => {
          throw new Error('Watch error (async) 3')
        })
      })
      s.on('test3', () => {
        out.push('fail3')
      }, 'fail')

      try {
        s.emit('test')
      }
      catch (err) {
        out.push(err.message)
      }

      s.emit('test2')
      s.emit('test3')

      return doAsync(() => {
        expect(out).to.be.deep.equal(['test', 'Watch error', 'test2', 'ok2', 'test3', 'test3:fail', 'fail3'])
      }, 10)
    })

    it ('Should watch and handle async event', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const test = s.createAction('test', () => {
        return delay(10)
      })

      s.watch(e => e.name == 'test' && e.channel == Stream.CH_DEFAULT, () => {
        return delay(10)
      })

      return test().then(() => {

      })
    })


    it ('Should game', () => {

      const s = new Stream()

      const waitTimeout = s.createEffect('timeout', () => delay(1000))
      const checkWin = s.createEffect('WIN', () => {}) // бесконечное ожидание

      // const waitTimeout = s.createAction('timeout', () => {
      //   return s.createEffect('TO', delay(1000))
      // })
      // const checkWin = s.createAction('checkWin', () => {
      //   return s.createEffect('WIN')
      // })

      function race (effects) {
        if (Array.isArray(effects)) {
          return Promise.race(effects)
            .then((v) => {
              return effects.map(eff => eff.isFinal ? v : undefined)
            })
        }
      }

//      const waitEvent = s.$


//       const waitTimeout = s.$action('timeout', () => 'timeout')
//       const checkWin = s.$action('checkWin', () => 'checkWin')
//
//       s.$watch(e => e.name == 'timeout', () => {
//         return new Promise((resolve, reject) => {
//           setTimeout(resolve, 3000)
//         })
// //        return delay(3000)
//       })
//       s.$watch(e => e.name == 'checkWin', () => {
//         return new Promise((resolve, reject) => {
//           s.$once('WIN', resolve)
//         })
//       })

      setTimeout(() => {
        s.emit('WIN', true, null, 'done')
      }, 500)

      const startGame = s.createAction('startGame', async () => {
          const [timeout, winCondition] = await race([waitTimeout(), checkWin()])

        if (winCondition) {
          console.log("Yeee, you've just won!")
        } else {
          console.log("Oh, nooo! Time out")
        }
      })

      return startGame()
    })



    it ('Should reduce multiple results', () => {

      function race (...args) {
        return Promise.race(args)
      }

      function all () {

      }

      function isCancelable (obj) {
        return obj && typeof obj.cancel === 'function'
      }


      const s = new Stream()

      // s.on('test', (e) => 5 + e.data)
      // s.on('test2', (e) => {
      //   return doAsync(() => 10)
      // })
      //
      // s.emit('test', 2)
      //   .then((v) => {
      //       console.log('OUT', v)
      //   })
      // s.emit('test2')
      //   .then((v) => {
      //       console.log('OUT', v)
      //   })

      const getUser = s.createAction('getUser', (id) => {
        return doAsync(() => {
          return {username: 'luke', name: 'Luke Skywalker'}
        })
      })

      const getArticle = s.createAction('getArticle', (username) => {
        const articles = {
          'luke': 'Lorem ipsum'
        }
        return doAsync(() => {
          return articles[username]
        })
      })

      const getMessage = s.createAction('getMessage', (id) => {
        const messages = {
          'a': {text: 'A', delay: 100},
          'b': {text: 'B', delay: 200}
        }
        return doAsync(() => messages[id].text, messages[id].delay)
      })

      const foo = s.createAction('foo', async (id) => {
        const user = await getUser(id)

        console.log('USER', user)

        const article = await getArticle(user.username)

        console.log('ARTICLE', article)

        const msg = await race(getMessage('a'), getMessage('b'))

        console.log('MESSAGE', msg)
      })

      s.watch(e => e.name == 'getUser' && e.channel == 'done', (e) => {
        return delay(1500)
      })

      // s.watch(() => true, (e) => {
      //   console.log(e)
      // })


      return foo().then(v => {

      })
    })

    it ('Should handle targeted event', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const obj1 = {}
      const obj2 = {}

      s.subscribe('test', () => {
        out.push('obj1')
      }, Stream.CH_DEFAULT, obj1)
      s.subscribe('test', () => {
        out.push('obj2')
      }, Stream.CH_DEFAULT, obj2)

      s.emit('test', null, {target: obj1})

      return doAsync(() => {
        expect(out).to.be.deep.equal(['obj1'])
      }, 10)
    })


  })

})
