const expect = require('chai').expect
import {Html, Source, Text, Domain, defaultCompare} from '../../src'
//import Domain from '../../src/old/Domain'
//const jsdom = require('mocha-jsdom')

function logger () {
  const out = []
  return [out, (v) => out.push(v)]
}

describe ('Html', () => {
/*  
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
*/
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

    expect(html.$foo.text).to.equal('Foo')
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
      expect(html.$foo.text).to.equal('Foo')
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



  describe ('Items', () => {

    it ('Should add items from constructor options', () => {

      const html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })

      expect(html.items.length).to.be.eq(3)
      expect(html.items[0].text).to.be.eq('Alice')

    })

    it ('Should add items from array value', () => {

      const html = new Html()
      html.opt('items', [{text: 'item1'}, {text: 'item2'}])

      expect(html.items.length).to.be.eq(2)
      expect(html.items[1].text).to.be.eq('item2')
    })

    it ('Should add items from source', () => {

      const html = new Html({
        sources: {
          data: {}
        }
      })
      const src = new Source(['Alice', 'Bob', 'Charlie'])
      html.opt('items', src)

      expect(html.items.length).to.be.eq(3)
      expect(html.items[0]).to.be.an.instanceof(Text)
      expect(html.items[0].context.data).to.be.eq(html.sources.data)
      expect(html.items[1].text).to.be.eq('Bob')
    })

    it ('Should add items from stream', () => {

      const html = new Html()
      const src = new Source(['Alice', 'Bob', 'Charlie'])
      html.opt('items', src.$stream('data'))

      expect(html.items.length).to.be.eq(3)
      // FIXME в случае потока не срабатывает условие для создания Text вместо Html
//      expect(html.items[0]).to.be.an.instanceof(Text)
      expect(html.items[0].sources.data).to.be.eq(src.$entry(0))
    })

    it ('Should remove item', () => {
      const html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.removeItem(1)

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0].text).to.be.eq('Alice')
      expect(html.items[1].text).to.be.eq('Charlie')
      expect(html.items[0].index).to.be.eq(0)
      expect(html.items[1].index).to.be.eq(1)

    })

    it ('Should remove all items', () => {
      const html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.removeAllItems()

      expect(html.items.length).to.be.eq(0)
    })

    it ('Should destroy item', () => {
      const data = new Source()
      const html = new Html({
        sources: { data },
        defaultItem: {
          dataChanged: (v) => {return {text: v}}
        },
        items: ['Alice', 'Bob', 'Charlie']
      })

      expect(data.subscribers.length).to.be.eq(3)

      html.items[1].tryDestroy()

      expect(data.subscribers.length).to.be.eq(2)
      expect(html.items.length).to.be.eq(2)
    })

    it ('Should destroy all items', () => {
      const html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })

      html.destroyAllItems()

      expect(html.items.length).to.be.eq(0)
    })

    it ('Should destroy all items with joins', () => {
      const data = new Source()
      const html = new Html({
        sources: { data },
        defaultItem: {
          dataChanged: (v) => {return {text: v}}
        },
        items: ['Alice', 'Bob', 'Charlie']
      })

      expect(data.subscribers.length).to.be.eq(3)

      html.destroyAllItems()

      expect(data.subscribers.length).to.be.eq(0)
      expect(html.items.length).to.be.eq(0)
    })

    it ('Should update items from array value', () => {

      // Text
      let html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.opt('items', ['Item1', 'Item2'])

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Text)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')

      // Html
      html = new Html({
        defaultItem: {},
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.opt('items', ['Item1', 'Item2'])

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Html)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')

    })

    it ('Should update items from source', () => {

      // Text
      let html = new Html({
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.opt('items', new Source(['Item1', 'Item2']))

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Text)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')

      // Html
      html = new Html({
        defaultItem: {},
        items: ['Alice', 'Bob', 'Charlie']
      })
      html.opt('items', new Source(['Item1', 'Item2']))

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Html)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')

    })

    it ('Should update items from stream', () => {

      // Html
      const html = new Html({
        defaultItem: {
          dataChanged: function (v) {
            return {text: v}
          }
        }
      })
      html.opt('items', new Source(['Alice', 'Bob', 'Charlie']).$stream('data'))
      html.opt('items', new Source(['Item1', 'Item2']).$stream('data'))

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Html)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')

    })

    it ('Should update items from single source stream', () => {

      const v = ['Alice', 'Bob', 'Charlie']
      const data = new Source(v)

      // Html
      const html = new Html({
        sources: { data },
        defaultItem: {
          dataChanged: function (v) {
            return {text: v}
          }
        }
      })

      html.opt('items', data.$stream('data'))

      data.src = ['Item1', 'Item2']

      html.opt('items', data.$stream('data'))

      expect(html.items.length).to.be.eq(2)
      expect(html.items[0]).to.be.an.instanceof(Html)
      expect(html.items[0].text).to.be.eq('Item1')
      expect(html.items[1].text).to.be.eq('Item2')
      expect(data.subscribers.length).to.be.eq(0)
      expect(html.items[1].sources.data.subscribers.length).to.be.eq(1)

    })

    it ('Should use custom item factory', () => {

      const html = new Html({
        itemFactory: function (opts, context) {
          return new Text(opts+'Ex', context)
        },
        items: ['Alice', 'Bob', 'Charlie']
      })

      expect(html.items[0].text).to.be.eq('AliceEx')

    })

    it ('Should filter items from stream', () => {

      // Html
      const html = new Html({
        sources: {
          data: () => []
        },
        defaultItem: {
          dataChanged: function (v) {
            return {text: v}
          }
        }
      })

      

    })

  })



  describe ('Components', () => {

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

    it ('Should initialize/destroy multisource', () => {
      const [out, log] = logger()

      const html = new Html({
        sources: {
          data: new Domain()
        },
        $comp1: {
          sources: {
            __data: (o, ctx) => ctx.data
          },
          __dataJoined: () => {}
        }
      })

      const comp1 = html.$comp1

      expect(comp1._initializing).to.be.undefined

      html.opt('components', {comp1: false})

      expect(comp1._destroying).to.be.undefined
    })

  })

  describe ('Items', () => {

    it ('Should add items by stream', () => {
      const data = new Source([1,2])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
          this.opt('items', s)
        }
      })

      expect(html.items.length).to.be.eq(2)

      data.set([1,2,3,4,5])

      expect(html.items.length).to.be.eq(5)
      expect(html.items[0].index).to.be.eq(0)
      expect(html.items[1].index).to.be.eq(1)
      expect(html.items[2].index).to.be.eq(2)
      expect(html.items[3].index).to.be.eq(3)
      expect(html.items[4].index).to.be.eq(4)
    })

    it ('Should delete items by stream', () => {
      console.log('del')
      const data = new Source([1,2,3,4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })
  
      expect(html.items.length).to.be.eq(5)
  
      data.$set([1,4,5])

      expect(html.items.length).to.be.eq(3)
      expect(html.items[0].index).to.be.eq(0)
      expect(html.items[1].index).to.be.eq(1)
      expect(html.items[2].index).to.be.eq(2)
      expect(html.items[0].text).to.be.eq('1')
      expect(html.items[1].text).to.be.eq('4')
      expect(html.items[2].text).to.be.eq('5')
    })  

    it ('Should delete items by stream (tail)', () => {
      console.log('del')
      const data = new Source([1,2,3,4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })
  
      expect(html.items.length).to.be.eq(5)

      data.set([5])
  
      expect(html.items.length).to.be.eq(1)
      expect(html.items[0].index).to.be.eq(0)
      expect(html.items[0].text).to.be.eq('5')
    })  

    it ('Should update items by stream', () => {
      console.log('upd')
      const data = new Source([1,2,3,4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })
  
      expect(html.items.length).to.be.eq(5)
  
      data.$set([1,4,5,3,2])

      expect(html.items.length).to.be.eq(5)
      expect(html.items[0].index).to.be.eq(0)
      expect(html.items[1].index).to.be.eq(4)
      expect(html.items[2].index).to.be.eq(3)
      expect(html.items[3].index).to.be.eq(1)
      expect(html.items[4].index).to.be.eq(2)

      const sorted = html.items.sort(defaultCompare)
      expect(sorted[0].text).to.be.eq('1')
      expect(sorted[1].text).to.be.eq('4')
      expect(sorted[2].text).to.be.eq('5')
      expect(sorted[3].text).to.be.eq('3')
      expect(sorted[4].text).to.be.eq('2')
    })  

    it ('Should restore items by stream', () => {

      const data = new Source([4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
//          debugger
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })
  
      expect(html.items.length).to.be.eq(2)

      data.set([1,2,3,4,5])
  
      expect(html.items.length).to.be.eq(5)
      expect(html.items[0].index).to.be.eq(3)
      expect(html.items[1].index).to.be.eq(4)
      expect(html.items[2].index).to.be.eq(0)
      expect(html.items[3].index).to.be.eq(1)
      expect(html.items[4].index).to.be.eq(2)

      const sorted = html.items.sort(defaultCompare)
      expect(sorted[0].text).to.be.eq('1')
      expect(sorted[1].text).to.be.eq('2')
      expect(sorted[2].text).to.be.eq('3')
      expect(sorted[3].text).to.be.eq('4')
      expect(sorted[4].text).to.be.eq('5')

    })  

    it ('Should reorder items by stream', () => {

      const data = new Source([1,2,3,4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
//          debugger
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })
  
      expect(html.items.length).to.be.eq(5)

      console.log('-----------------------------')
  
      data.set([3,4,1,5,2])
  
      expect(html.items.length).to.be.eq(5)
      // expect(html.items[0].index).to.be.eq(3)
      // expect(html.items[1].index).to.be.eq(4)
      // expect(html.items[2].index).to.be.eq(0)
      // expect(html.items[3].index).to.be.eq(1)
      // expect(html.items[4].index).to.be.eq(2)

      const sorted = html.items.sort(defaultCompare)
      expect(sorted[0].text).to.be.eq('3')
      expect(sorted[1].text).to.be.eq('4')
      expect(sorted[2].text).to.be.eq('1')
      expect(sorted[3].text).to.be.eq('5')
      expect(sorted[4].text).to.be.eq('2')

    })

    it ('Should change all items if stream updated', () => {

      const out = []

      const data = new Domain([1,2,3,4,5])
      const html = new Html({
        sources: { data },
        dataChanged: function (v, s) {
//          debugger
          this.opt('items', s)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        }
      })

      expect(Object.values(data.entries).length).to.be.eq(5)

      for (let i in data.entries) {
        data.entries[i].watch(e => e.name == 'changed', (e) => {
          out.push(e)
        })
      }

      data.set([1,2,3,6,4,5])

      expect(out.length).to.be.eq(5)
    })


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
