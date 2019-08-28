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

    expect(html.opts.text).to.equal('Hello')
    expect(html.opts.foo).to.be.undefined
    expect(html.opts.items).to.deep.equal(['Alice', 'Bob'])

    html.opts.text = 'Label'

    expect(html.$content.opts.text).to.equal('Label')

  })

  it ('Should read/write instance opt', () => {

    const html = new Html({
      options: {
        foo: {}
      },
      foo: 'Foo'
    })

    expect(html.opts.foo).to.equal('Foo')

    html.opts.foo = 'Hello'

    expect(html.opts.foo).to.equal('Hello')

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

    expect(html.$foo.opts.text).to.equal('Foo')
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
      expect(html.$foo.opts.text).to.equal('Foo')
      done()
    }, 1)

  })

})
