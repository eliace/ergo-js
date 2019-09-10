const expect = require('chai').expect
import {Source} from '../../src'
//const jsdom = require('mocha-jsdom')

const Stream = Source.Stream

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

    it ('Should emit', () => {

      const delay = function (t, result, msg) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            result ? resolve(msg) : reject(msg)
          }, t)
        })
      }

      const s = new Stream()

      const asyncMethod = (name) => {
        return delay(500, true, name)
      }

      s.$watch(e => true, (e) => {console.log(e)})

      s.$watch(e => e.name == 'test', (e) => {
        return 5
      })
      s.$watch(e => e.name == 'test', (e) => {
        return delay(200, true, 'promise')
      })
      s.$watch(e => e.name == 'test', (e) => {
        return new Stream.Effect('DELAY', delay(500, true, 'effect'), s)
      })




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

    })

    it ('Should reduce multiple results', () => {

      const sum = (a) => {
        a.reduce((acc, v) => {acc += v}, 0)
      }

      const s = new Stream()

      s.$on('arg', (x) => x) // map
      s.$on('arg', (y) => y) // map


      s.$emit(new Stream.Event('arg', {data: 5, reduce: sum})).then(v => {
        console.log(v)
      })

    })


  })

})
