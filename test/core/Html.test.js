const expect = require('chai').expect
import {Html, Source} from '../../src'
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

  it ('Should join sources from context', () => {

    const html = new Html({
      sources: {
        alice: 'Alice',
        bob: 'Bob'
      },
      $comp1: {
        allJoined: () => {} // указываем неявно необходимость связывания
      },
      items: [{
        allJoined: () => {}
      }]
    })

    expect(html.$comp1.sources.alice.get()).to.equal('Alice')
    expect(html.$comp1.sources.bob.get()).to.equal('Bob')
    expect(html.items[0].sources.alice.get()).to.equal('Alice')
    expect(html.items[0].sources.bob.get()).to.equal('Bob')

  })

  it ('Should use options() config method', () => {

    class ClassA extends Html {
      options () {
        return {
          a: {
            init: function (v) {
              this._a = v+1
            }
          }
        }
      }
    }

    class ClassB extends ClassA {
      options () {
        return {
          b: {
            init: function (v) {
              this._b = v-1
            }
          }
        }
      }
    }

    const html = new ClassB({
      a: 10,
      b: 10
    })

    expect(html.options.a).to.be.equal(10)
    expect(html.options.b).to.be.equal(10)
    expect(html._a).to.be.equal(11)
    expect(html._b).to.be.equal(9)
  })

  it ('Should set no text if undefined or null', () => {
    const html = new Html({
      text: undefined
    })
    const html2 = new Html({
      text: null
    })
    const html3 = new Html({
      $content: {
      },
      text: undefined
    })

    expect(html.text).to.be.undefined
    expect(html2.text).to.be.null
    expect(html3.text).to.be.undefined
    expect(html3.$content.text).to.be.undefined
  })

  it ('Should update components by object value', () => {
    const html = new Html({
      $comp1: {},
      $comp2: {}
    })
    html.opt('components', {
      comp1: {text: '1'},
      comp2: {text: '2'},
      comp3: {text: '3'}
    })
    expect(html.$comp1.text).to.be.equal('1')
    expect(html.$comp2.text).to.be.equal('2')
    expect(html.$comp3).to.be.undefined

    html.opt('components', {comp1: false})
    expect(html.$comp1).to.be.undefined
  })

  it ('Should update components by source', () => {

  })

  it ('Should update components by stream', () => {
    const html = new Html({
      $comp1: {},
      $comp2: {},
      defaultComponent: {
        dataChanged: function (v) {
          this.opt('text', v)
        }
      },
    })
    const s = new Source({
      comp1: 'Alice',
      comp2: 'Bob',
      comp3: 'Charlie'
    })
    html.opt('components', s.$stream('data'))
    expect(html.$comp1.text).to.be.equal('Alice')
    expect(html.$comp2.text).to.be.equal('Bob')
    expect(html.$comp3.text).to.be.equal('Charlie')
  })

  // it ('Should allow simultaneous streams', () => {
  //   const data = new Source()
  //   const html = new Html({
  //     sources: {
  //       streamA: data,
  //       streamB: data
  //     },
  //     allJoined: function ({streamA, streamB}) {
  //
  //     }
  //   })
  // })

})
