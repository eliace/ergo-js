const expect = require('chai').expect
import {Source} from '../../src'
//const jsdom = require('mocha-jsdom')

const Stream = Source.Stream

const delay = function (t, result, msg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result ? resolve(msg) : reject(msg)
    }, t)
  })
}

const asyncAction = function (callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback())
    }, 1)
  })
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

    it ('Should error during watch', (done) => {

      const out = []

      const s = new Stream()

      s.$on('test', () => {
        out.push('ok')
      })
      s.$watch(e => e.name == 'test', () => {
        throw new Error('Watch error')
      })

      s.$on('test2', () => {
        out.push('ok')
      })
      s.$watch(e => e.name == 'test2', () => {
        asyncAction(() => {
          throw new Error('Watch error (async)')
        })
      })

      s.$on('test3', () => {
        out.push('ok')
      })
      s.$watch(e => e.name == 'test3', () => {
        return asyncAction(() => {
          throw new Error('Watch error (async) 2')
        })
      })

      // s.$on('error', () => {
      //   throw new Error('Handle error')
      // })

      try {
        s.$emit('test')
      }
      catch (err) {
        out.push(err.message)
      }

//      try {
      Promise.all(s.$emit('test2'), s.$emit('test3'))
        .then(done)
        .catch(err => {
          out.push(err.message)
        })
        .then(() => {
          expect(out).to.be.deep.equal(['Watch error', 'ok'])          
        })



      // }
      // catch (e) {
      //   out.push(e.message)
      // }

    })

//    it ('Should error during watch ')



    it ('Should reduce multiple results', () => {

      // const watchers = []
      // const handlers = []
      // const errors = []
      // const cancels = []
      // const events = []
      // const inReducers = []
      // const outReducers = []

      // watchers.push({
      //   when: (e) => e.name == 'init',
      //   map: (e) => e.data
      // })
      // watchers.push({
      //   when: (e) => e.name == 'init',
      //   map: (e) => e.data + 2
      // })
      // handlers.push({
      //   when: (e) => e.name == 'init',
      //   map: (e) => e.data * 2
      // })
      // handlers.push({
      //   when: (e) => e.name == 'init',
      //   map: (e) => e.data + 1
      // })
      // outReducers.push({
      //   when: e => e.name == 'init',
      //   reduce: (a) => a.join('+')
      // })

//       function emit (event) {
//         let input = watchers.filter(x => x.when(event)).map(x => x.map(event)).filter(x => x !== undefined)
//         if (input.length > 0) {
// //          input = inReducers.filter(x => x.when(event)).reduce((acc, x) => x.reduce(acc), input)
//           input = input.reduce((acc, v) => v)
//           event = {...event, data: input, origin: event}
//         }
//         let output = handlers.filter(x => x.when(event)).map(x => x.map(event)).filter(x => x !== undefined)
//         if (output.length > 1) {
// //          output = outReducers.filter(x => x.when(event)).reduce((acc, x) => x.reduce(acc), output)
//           output = output.slice(1).reduce(event.out, output[0])
//         }
//         else {
//           output = output[0]
//         }
//         return output
//       }
//
//       const out = emit({name: 'init', data: 7, out: (x, y) => x})
//
//       console.log('out', out)

/*
      const sum = (a) => {
        a.reduce((acc, v) => {acc += v}, 0)
      }

      const s = new Stream()

      s.$on('arg', (x) => x) // map
      s.$on('arg', (y) => y) // map


      s.$emit(new Stream.Event('arg', {data: 5, reduce: sum})).then(v => {
        console.log(v)
      })
*/
    })


  })

})
