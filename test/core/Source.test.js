const expect = require('chai').expect
import {Source} from '../../src'
//const jsdom = require('mocha-jsdom')

const Stream = Source.Stream

const delay = function (t, result=true, msg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result ? resolve(msg) : reject(msg)
    }, t)
  })
}

const doAsyncAction = function (callback, timeout) {
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

    it ('Should watch', () => {

      const s = new Stream()

      // const asyncMethod = (name) => {
      //   return delay(500, true, name)
      // }

//      s.$watch(e => true, (e) => {console.log(e)})

      s.$watch(e => e.name == 'test', (e) => {
        return 5
      })
      s.$watch(e => e.name == 'test', (e) => {
        return delay(200, true, 'promise')
      })
      s.$watch(e => e.name == 'test', (e) => {
        const effect = new Stream.Effect('DELAY', delay(500, true, 'effect'), s)
        s.$emit(effect.init, {})
        return effect
      })

      s.$emit('test', {data: 10})

/*
      const changeEvent = (id) => {
        return s.$emit('init', id)
      }
      const changeHandler = (e) => {
        console.log('init ok', e.data)
      }
      const getUser = (name) => {
        if (!name) {
          return delay(500, false, 'Unauthorized')
        }
        else {
          return delay(500, true, {uid: 101, name: 'Alice'})
        }
      }
      const authEvent = () => {
        return s.$emit('auth', {})
      }
      const authHandler = () => {
        return getUser()
      }
      const authHandlerFail = (e) => {
        if (e.data == 'Unauthorized') {
          changeEvent(15)
        }
      }

      s.$on('init', changeHandler)
      s.$on('auth', authHandler)
      s.$on('auth:fail', authHandlerFail)
      s.$watch(e => e.name == 'init', (e) => {
        if (e.data < 10) {
          return authEvent()
        }
      })

      changeEvent(5)
*/
    })

    it ('Should handle', () => {

      const s = new Stream()

//      s.$watch(e => true, (e) => {console.log(e)})

      s.$on('test', (e) => {
        return 1
      })
      s.$on('test', (e) => {
        return delay(100, true, 'promise')
      })
      s.$on('test', (e) => {
        return s.$emit('DELAY', {})
      })
      s.$on('DELAY', () => {
        return delay(200, true, 'effect')
      })

      s.$emit('test').then(out => {
        console.log(out)
      })

    })

    it ('Should handle nested', () => {

      const s = new Stream()

//      s.$watch(e => true, (e) => {console.log(e)})

      s.$on('test', (e) => {
        return s.$emit('test2', {})
      })
      s.$on('test2', (e) => {
        return s.$emit('test3', {})
      })
      s.$on('test3', (e) => {
        return s.$emit('test4', {})
      })
      s.$on('test4', (e) => {
        return 5
      })

      s.$emit('test').then(out => {
        console.log(out)
      })

    })


    it ('Should execute async operation', () => {

      const s = new Stream()

//      s.$watch(e => true, (e) => {console.log(e)})

      const sum = s.$event('sum', {method: true})
      s.$on('sum', async () => {
        const x = await s.op(1)
        const y = await s.op(2)
        const z = await s.op(3)
        return x + y + z
      })

      const op = s.$event('op', {method: true})
      s.$on('op', (v) => {
        return delay(100, true, v * 10)
      })

      sum().then((v) => console.log('sum', v))


    })

    it ('Should error during watch', () => {

      const out = []

      const s = new Stream()

      s.$on('test', () => {
        out.push('ok')
      })
      s.$watch(e => e.name == 'test', () => {
        throw new Error('Watch error')
      })

      s.$on('test2', () => {
        out.push('ok2')
      })
      s.$watch(e => e.name == 'test2', () => {
        doAsyncAction(() => {
          throw new Error('Watch error (async)')
        })
      })

      s.$on('test3', () => {
        out.push('ok3')
      })
      s.$watch(e => e.name == 'test3', () => {
        return doAsyncAction(() => {
          throw new Error('Watch error (async) 2')
        })
      })
      s.$on('test3:cancel', () => {
        out.push('cancel3')
      })


      try {
        s.$emit('test')
      }
      catch (err) {
        out.push(err.message)
      }

      s.$emit('test2')
      s.$emit('test3')


      return doAsyncAction(() => {
        expect(out).to.be.deep.equal(['Watch error', 'ok2', 'cancel3'])
      })

    })

    it ('Should process complex action', () => {

      const s = new Stream()

//      s.$watch(() => true, (e) => console.log(e))

      const out = []

      const log = s.$action('log', (msg) => {
        doAsyncAction(() => out.push(msg))
      })

      const notify = s.$action('notify', (msg) => {
        doAsyncAction(() => out.push(msg))
      })

      const op = s.$action('op', (n) => {
        return doAsyncAction(() => n.length)
      })

      const getUser = s.$action('getUser', (id) => {
        return doAsyncAction(() => {
          const users = {
            '7': {username: 'luke', name: 'Luke Skywalker'}
          }
          return users[id]
        })
      })

      const getArticles = s.$action('getArticles', () => {
        return doAsyncAction(() => {
          return 'Lorem ipsum'
        })
      })

      s.$get = () => {}

      // s.$watch('getUser', (e) => {
      //   e.data = [...e.data, token: s.$get('token')]
      // })

      const foo = s.$action('foo', async (id) => {
        try {

          let user = s.$get('user', id) // inner getter (sync)

          if (user == null) {
            user = await getUser(id) // outer getter (async)
          }

          const articles = await getArticles()

          // get (inner + outer)
          // map
          // set (inner + outer)

          // for (let i in args) {
          //   const  await op(args[i])
          // }
          // const sum = (acc, v) => acc + v
          // const total = (await Promise.all(args.map(op))).reduce(sum, 0)

//          stream(args).map(op).reduce(sum, 0)

          log(articles)

        }
        catch (err) {
          log(err.message)
          throw err
        }
      })


      foo(7)



      return doAsyncAction(() => {
        expect(out).to.be.deep.equal(['Lorem ipsum'])
      }, 100)
    })


    it ('Should game', () => {

      const s = new Stream()

      // const o = {
      //   actions: {
      //     timeout: () => 'timeout',
      //     checkWin: () => 'checkWin'
      //   },
      //   watchers: {
      //     waitTimeout: {
      //       when: e => e.name == 'timeout',
      //       check: e => delay(3000)
      //     },
      //     waitWin: {
      //       when: e => e.name == 'checkWin',
      //       check: (e, st) => st.$once('WIN', () => {})
      //     }
      //   }
      // }

      function race (...effects) {
        return Promise.race(effects)
          .then((v) => {
            return effects.map(eff => eff.isFinal)
          })
      }



      const waitTimeout = s.$action('timeout', () => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 3000)
        })
      })
      const checkWin = s.$action('checkWin', () => {
        return new Promise((resolve, reject) => {
          s.$once('WIN', resolve)
        })
      })


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

      s.$action('startGame', async () => {
          const [timeout, winCondition] = await race(waitTimeout(), checkWin())

        if (winCondition) {
          console.log("Yeee, you've just won!")
        } else {
          console.log("Oh, nooo! Time out")
        }
      })

      s.startGame()

      setTimeout(() => {
        s.$emit('WIN')
      }, 1000)


      return doAsyncAction(() => {

      })
    })



    it ('Should reduce multiple results', () => {

    })


  })

})
