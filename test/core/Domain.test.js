const expect = require('chai').expect
import {Domain, Html} from '../../src'

describe ('Domain', () => {

  it ('Should create event', () => {

    const d = new Domain()

    d.createEvent('click')

    const out = d.emit(d.events.click.on)

    expect(d.events.click).not.undefined
    expect(out).not.undefined

  })

  it('Should create listener', () => {

    const d = new Domain()
    let out = ''

    d.on('click', (e) => {
      out = e.data
    })

    d.emit('click', 'Hello')

    expect(d.events.click).to.be.undefined
    expect(out).to.equal('Hello')
  })

  it('Should create method', () => {

    const d = new Domain()

    d.createAction('plusFive', (x) => {
      return x + 5
    })

    return d.events.plusFive(9)
      .then(v => {
        expect(d.events.plusFive).not.undefined
        expect(v).to.equal(14)
      })
  })

  describe('Watchers', () => {
    it('Should watch event by name', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.name == 'click', (e) => {
        out.push(e.data)
      })

      return d.emit('click', 'Test')
        .then(() => {
          expect(out).to.deep.eq(['Test'])
        })
    })
    it('Should watch event by filter', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.data.x > 0, e => {
        out.push(e.data.x)
      })

      return d.emit('click', {x: 5})
        .then(() => {
          expect(out).to.deep.eq([5])
        })
    })
    it('Should watch event and emit effect event', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.name == 'click', (e) => d.emit('effect', e.data))

      d.watch(() => true, (e) => {
        out.push(e.name)
        out.push(e.data)
      })

      return d.emit('click', 'Hello')
        .then(() => {
          console.log(out)
          expect(out).to.deep.eq(['effect', 'Hello', '@click', 'Hello'])
        })
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
