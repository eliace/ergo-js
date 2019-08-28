const expect = require('chai').expect
import {Source} from '../../src'
//const jsdom = require('mocha-jsdom')

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

    data.entry('filteredList').$stream().entries((entry) => {
      entriesBefore.push(entry)
    })

    data.set('query', 'c')

    const entriesAfter = []

    data.entry('filteredList').$stream().entries((entry) => {
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


})
