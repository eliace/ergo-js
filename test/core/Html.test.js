const expect = require('chai').expect
import {Html} from '../../src'
//const jsdom = require('mocha-jsdom')

describe ('Html', () => {
  it ('Should read/write class opt', () => {

    const html = new Html({
      text: 'Hello',
      foo: 'Foo',
      items: ['Alice', 'Bob'],
      $content: {}
    })

    expect(html.options.text).to.equal('Hello')
    expect(html.options.foo).to.be.undefined
    expect(html.options.items).to.deep.equal(['Alice', 'Bob'])

    html.options.text = 'Label'

    expect(html.$content.options.text).to.equal('Label')

  })

  it ('Should read/write instance opt', () => {

    const html = new Html({
      options: {
        foo: {}
      },
      foo: 'Foo'
    })

    expect(html.options.foo).to.equal('Foo')

    html.options.foo = 'Hello'

    expect(html.options.foo).to.equal('Hello')

  })

  it ('Should create component with function', () => {

    const html = new Html({
      sources: {
        data: {x: 10}
      },
      $foo: () => {
        return {
          text: 'Foo'
        }
      }
    })

    expect(html.$foo.options.text).to.equal('Foo')
    expect(html.$foo.sources.data.get('x')).to.equal(10)

  })

  it ('Should create component with promise function', (done) => {

    const html = new Html({
      $foo: () => {
        return new Promise((resolve) => {
          resolve({
            text: 'Foo'
          })
        })
      }
    })

    setTimeout(() => {
      expect(html.$foo.options.text).to.equal('Foo')
      done()
    }, 1)

  })

})
