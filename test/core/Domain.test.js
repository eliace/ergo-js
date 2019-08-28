const expect = require('chai').expect
import {Domain} from '../../src'

describe ('Domain', () => {
  it ('Should create event', () => {

    const d = new Domain()

    d.$event('click')

    expect(d.click).not.undefined

    const out = d.$emit(d.click.on)

    expect(out).to.be.undefined

  })

  it('Should create listener', () => {

    const d = new Domain()
    let out = ''

    d.$listener('click', (e) => {
      out = e.data
    })

    d.click({data: 'Hello'})

    expect(out).to.equal('Hello')
  })

  it('Should create method', () => {

    const d = new Domain()

    d.$method('plusFive', (x) => {
      return x + 5
    })

    expect(d.plusFive(9)).to.equal(14)
  })
})
