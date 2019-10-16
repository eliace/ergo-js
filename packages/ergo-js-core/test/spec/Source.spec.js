const expect = require('chai').expect
import {Source, Domain as Stream} from '../../src'
//import Stream from '../../src/core/Domain'
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
  return !e.channel? e.name : e.name+':'+e.channel
}


function stream (src, channel) {
  return src.$stream(channel)
}



describe ('Source', () => {

  describe ('Basic operations', () => {

    it ('Should self $remove (array)', () => {
      const s = new Source([1,2,3])
      s.$entry(0)

      expect(s.$size).to.be.eq(3)
      expect(Object.values(s.entries).length).to.be.eq(1)

      s.$entry(0).$remove()

      expect(s.$size).to.be.eq(2)
      expect(Object.values(s.entries).length).to.be.eq(0)
    })

    it ('Should self $remove by id (array)', () => {
      const s = new Source([1,2,3])
      s.$entry(1)

      expect(s.$size).to.be.eq(3)
      expect(Object.values(s.entries).length).to.be.eq(1)

      s.$remove(1)

      expect(s.$size).to.be.eq(2)
      expect(Object.values(s.entries).length).to.be.eq(0)
    })

  })


  // describe ('Calculated properties', () => {

  //   it 

  // })



  it ('Should update entries on change', () => {

    const data = new Source([{
      name: 'Alice'
    }, {
      name: 'Bob'
    }, {
      name: 'Charlie'
    }], {
      key: v => v.name
    })

    const before = []
    stream(data).entries(entry => {
      before.push(entry)
    })

    data.$set([{
      name: 'Bob'
    }])

    const after = []
    stream(data).entries(entry => {
      after.push(entry)
    })

    expect(before.length).to.be.eq(3)
    expect(after.length).to.be.eq(1)
    expect(before[1]).to.be.eq(after[0])
    // expect(before[1]).to.be.eq(after[0])
  })



  it ('Should update nested entries on change', () => {

    const data = new Source([{
      name: 'Alice',
      rates: [1,2,3]
    }, {
      name: 'Bob',
      rates: [4,5]
    }], {
      key: v => v.name
    })

    const before = []
    stream(data.$entry(0).$entry('rates'), 'data').entries(entry => {
      before.push(entry)
    })

    data.$set([{
      name: 'Alice',
      rates: [2]
    }])

    const after = []
    stream(data.$entry(0).$entry('rates'), 'data').entries(entry => {
      after.push(entry)
    })

//    debugger

    expect(before.length).to.be.eq(3)
    expect(after.length).to.be.eq(1)
    expect(before[1].$value).to.be.eq(after[0].$value)
    expect(before[1]).to.be.eq(after[0])


  })

  // it('Should get and set props', () => {

  //   const data = new Source({
  //     a: 'Alice',
  //     b: 5
  //   }, {
  //     properties: {
  //       a: {},
  //       b: {}
  //     }
  //   })

  //   expect(data.props.a).to.equal('Alice')
  //   expect(data.props.b).to.equal(5)

  //   data.props.a = 'Bob'
  //   data.props.b++

  //   expect(data.props.a).to.equal('Bob')
  //   expect(data.props.b).to.equal(6)
  //   expect(data.get('a')).to.equal('Bob')
  //   expect(data.get('b')).to.equal(6)

  // })


  describe ('Stream', () => {
/*
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
*/
    it ('Should read source property from getter', () => {

      const src = new Source({
        a: 'Alice',
        b: 'Bob'
      }, {
        properties: {
          a: {},
          b: {}
        }
      })

      const stream = src.$stream('data')

      console.log(stream)

      expect(stream.$props.a).to.be.eq('Alice')

    })


    it ('Should handle event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const timeout = s.createEffect('timeout', () => delay(20))

      s.on('test', (e) => {
        return 1
      })
      s.on('test', (e) => {
        return delay(10)
      })
      s.on('test', (e) => {
        return timeout()
      })

      s.emit('test')

      return doAsync(() => {
        expect(out).to.be.deep.equal(['test', 'timeout:start', 'timeout:done'])
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

      const v = s.emit('test')

      expect(v).to.be.equal(5)
      expect(out).to.be.deep.equal(["test", "test2", "test3", "test4"])
    })

    it ('Should watch event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      const timeout = s.createEffect('timeout', () => delay(20))

      s.watch(e => e.name == 'test' && !e.channel, (e) => {
        return 5
      })
      s.watch(e => e.name == 'test' && !e.channel, (e) => {
        return delay(10)
      })
      s.watch(e => e.name == 'test' && !e.channel, (e) => {
        return timeout()
      })

      s.emit('test')

      return doAsync(() => {
        expect(out).to.be.deep.equal(['test', 'timeout:start', 'timeout:done'])
      }, 30)
    })

    it ('Should watch and handle event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.watch(e => e.name == 'test' && !e.channel, (e) => {
        out.push('watch test')
      })
      s.watch(e => e.name == 'test' && !e.channel, (e) => {
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
        return new Event(null) // блокируем обработку события
      })
      s.on('test', () => {
        return 1
      })

      const v = s.emit('test')

      expect(out).to.be.deep.equal(['test', null])
      expect(v).to.be.undefined
    })

    it ('Should watch and replace event', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.watch(e => e.name == 'test', (e) => {
        return new Event('test2', null, {}, s, '') // подменяем событие
      })
      s.on('test', () => {
        return 1
      })
      s.on('test2', () => {
        return 2
      })

      const v = s.emit('test')
      expect(out).to.be.deep.equal(['test', 'test2'])
      expect(v).to.be.equal(2)
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
        expect(out).to.be.deep.equal(['sum', 'op', 'op', 'op'])
      })
    })

    it ('Should error during watch', () => {

      const s = new Stream()

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', () => {
        out.push('ok')
      })
      s.watch(e => e.name == 'test' && !e.channel, () => {
        throw new Error('Watch error')
      })

      s.on('test2', () => {
        out.push('ok2')
      })
      s.watch(e => e.name == 'test2' && !e.channel, () => {
        doAsync(() => {
          throw new Error('Watch error (async) 2')
        })
      })

      s.on('test3', () => {
        out.push('ok3')
      })
      s.watch(e => e.name == 'test3' && !e.channel, () => {
        return doAsync(() => {
          throw new Error('Watch error (async) 3')
        })
      })
      s.on('test3', () => {
        out.push('fail3')
      }, null, ['fail'])

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

      const out = []
      s.watch(e => true, (e) => {out.push(eventKey(e))})

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

      setTimeout(() => {
//        debugger
        s.emit('WIN', true)
      }, 200)

      const startGame = s.createAction('startGame', async () => {
          const [timeout, winCondition] = await race([waitTimeout(), checkWin()])

        if (winCondition) {
          out.push("Win")
        } else {
          out.push("Loose")
        }
      })

      return startGame().then(() => {
        expect(out).to.be.deep.eq(["startGame", "timeout:start", "WIN:start", "startGame:start", "WIN", "WIN:done", "Win", "startGame:done"])
      })
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
      }, '', obj1)
      s.subscribe('test', () => {
        out.push('obj2')
      }, '', obj2)

      s.emit('test', null, {target: obj1})

      return doAsync(() => {
        expect(out).to.be.deep.equal(['obj1'])
      }, 10)
    })

    it ('Should handle same event in different channels', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', (e) => {
        return doAsync(() => {
          return 5
        })
      }, '')

      s.on('test', (e) => {
        return doAsync(() => {
          return 6
        })
      }, 'done')

      return s.emit('test').then(() => {
        expect(out).to.be.deep.equal(['test'])
      }, 5)
    })

    it ('Should watch non default channel', () => {

      const s = new Stream()

      const out = []

      s.watch(e => true, (e) => {out.push(eventKey(e))})

      s.on('test', (e) => {
        return doAsync(() => {
          return 5
        })
      })

      s.watch(e => e.name == 'test' && e.channel == 'done', (e) => {
        return doAsync(() => {
          return 6
        })
      })

      return s.emit('test').then(() => {
        expect(out).to.be.deep.equal(['test'])
      }, 5)
    })

  })

})
