const expect = require('chai').expect
import {Domain} from '../../src'

describe ('Domain', () => {

  it ('Should create event', () => {

    const d = new Domain()

    d.createEvent('click')

    const out = d.emit(d.click.on)

    expect(d.click).not.undefined
    expect(out).to.be.undefined

  })

  it('Should create listener', () => {

    const d = new Domain()
    let out = ''

    d.on('click', (e) => {
      out = e.data
    })

    d.emit('click', 'Hello')

    expect(d.click).to.be.undefined
    expect(out).to.equal('Hello')
  })

  it('Should create method', () => {

    const d = new Domain()

    d.createAction('plusFive', (x) => {
      return x + 5
    })

    const v = d.plusFive(9)

    expect(d.plusFive).not.undefined
    expect(v).to.equal(14)
  })

  describe('Watchers', () => {

    it('Should watch event by name', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.name == 'click', (e) => {
        out.push(e.data)
      })

      d.emit('click', 'Test')

      expect(out).to.deep.eq(['Test'])
    })

    it('Should watch event by filter', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.data.x > 0, e => {
        out.push(e.data.x)
      })

      d.emit('click', {x: 5})

      expect(out).to.deep.eq([5])
    })

    it('Should watch event and emit effect event', () => {
      const d = new Domain()
      const out = []

      d.watch(e => e.name == 'click', (e) => d.emit('effect', e.data))

      d.watch(() => true, (e) => {
        out.push(e.name)
        out.push(e.data)
      })

      d.emit('click', 'Hello')

      expect(out).to.deep.eq(['effect', 'Hello', 'click', 'Hello'])

    })

    it('Should watch event then emit and listen effect event', () => {
      const d = new Domain()
      const out = []

      d.on('test', () => {
        out.push('Test')
      })

      d.watch(
        e => e.name == 'click',
        e => {
          return d.emit('test')
        }
      )

      d.emit('click')

      expect(out).to.deep.eq(['Test'])
    })
  })

})
