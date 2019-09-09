const expect = require('chai').expect
import {Domain, Html} from '../../src'

describe ('Domain', () => {

  it ('Should create event', () => {

    const d = new Domain()

    d.$event('click')

    const out = d.$emit(d.click.on)

    expect(d.click).not.undefined
    expect(out).to.be.undefined

  })

  it('Should create listener', () => {

    const d = new Domain()
    let out = ''

    d.$listen('click', null, (e) => {
      out = e.data
    })

    d.$emit('@click', {data: 'Hello'})

    expect(d.click).to.be.undefined
    expect(out).to.equal('Hello')
  })

  it('Should create method', () => {

    const d = new Domain()

    d.$method('plusFive', null, (x) => {
      return x + 5
    })

    expect(d.plusFive).not.undefined
    expect(d.plusFive(9)).to.equal(14)
  })

  describe('Watchers', () => {
    it('Should watch event by name', () => {
      const d = new Domain()
      const out = []

      d.$watch('@click', null, (e) => {
        out.push(e.data)
      })

      d.$emit('@click', {data: 'Test'})

      expect(out).to.deep.eq(['Test'])
    })
    it('Should watch event by filter', () => {
      const d = new Domain()
      const out = []

      d.$watch(e => e.x > 0, null, e => {
        out.push(e.x)
      })

      d.$emit('@click', {x: 5})

      expect(out).to.deep.eq([5])
    })
    it('Should watch event and emit effect event', () => {
      const d = new Domain()
      const out = []

      d.$watch('@click', null, 'effect')

      d.$observe(null, (e) => {
        out.push(e.name)
        out.push(e.data)
      })
      d.$emit('@click', {data: 'Hello'})

      expect(out).to.deep.eq(['@effect', 'Hello', '@click', 'Hello'])
    })
    it('Should watch event then emit and listen effect event', () => {
      const d = new Domain()
      const out = []

      d.$watch({
        when: e => e.name == '@click',
        on: e => {
          out.push('Test')
        }
      },
      null,
      'effect')

      d.$emit('@click')

      expect(out).to.deep.eq(['Test'])

    })
  })

})
