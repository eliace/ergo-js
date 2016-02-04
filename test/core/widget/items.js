var expect = chai.expect;

describe('Widget', function(){

  describe('Items', function() {



    it('should override defaultItem', function() {

      var box = $.ergo({
        etype: 'html:div',
        defaultItem: {
          etype: 'html:div'
        },
        items: [{text: 'Alice'}, {text: 'Bob'}]
      });

      var box2 = $.ergo({
        etype: 'html:div',
        $charlie: {
          etype: 'html:div',
          text: 'Charlie'
        },
        defaultItem: {
          etype: 'html:div'
        },
        items: [{text: 'Alice'}]
      });


      var box3 = $.ergo({
        etype: 'html:div',
        defaultItem: {
          etype: 'html:div',
          a: 'Alice'
        },
        items: [{}, {a: 'Adam'}, {b: 'Bob'}]
      });

      console.log( 'options', box3 );

      expect(box3.item(0).options.a).to.be.eq('Alice');
      expect(box3.item(1).options.a).to.be.eq('Adam');
      expect(box3.item(2).options.a).to.be.eq('Alice');
      expect(box3.item(2).options.b).to.be.eq('Bob');

    })







		it('should add items', function() {

      var box = $.ergo({
        etype: 'html:div',
        defaultItem: {
          etype: 'html:div'
        }
      });

      var item0 = box.items.add({});
//      console.log('----------');
      var item1 = box.items.add({}, 0);
//      console.log('----------');

      expect(item0._index).to.be.eq(1);
      expect(item1._index).to.be.eq(0);




		});



    it('should use default opt', function() {

      var box = $.ergo({
        etype: 'html:div',
        defaultItem: {
          etype: 'html:div'
        },
        items: ['Alice', 'Bob', 'Charlie']
      });

      expect( box.items.size() ).to.be.eq(3);


      box = $.ergo({
        etype: 'html:div',
        defaultItem: {
          etype: 'html:div',
          defaultItem: {
            etype: 'html:div'
          }
        },
        items: [['Alice', 'Bob', 'Charlie']]
      });


      expect( box.items.size() ).to.be.eq(1);
      expect( box.item(0).items.size() ).to.be.eq(3);


    });




    it('should add dynamic items', function() {

      var data = ['Alice', 'Bob', 'Charlie']

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
        data: data,
        defaultItem: {
          etype: 'html:div',
          binding: 'text'
        }
      });

      box.data.add('Dave', 0);

      expect(box.data.entry(0)._val()).to.be.eq('Dave');
      expect(box.item(0).text).to.be.eq('Dave');
      expect(box.item(0).opt('text')).to.be.eq('Dave');


		});



    it('should set dynamic items', function() {

      var bindings = [];

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
        data: [],
        defaultItem: {
          etype: 'html:div',
          binding: 'text'
        },
        binding: function(v) {
          bindings.push( v );
        }
      });

      box.data.set(['Alice', 'Bob', 'Charlie']);

      expect(bindings).to.be.eql([[], ['Alice', 'Bob', 'Charlie']]);


		});


    it('should set dynamic item with component', function() {


      var data = ['Alice', 'Bob'];

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
//        data: data,
        $comp: {
          etype: 'html:div',
          binding: 'text',
          text: 'Text',
          weight: 1
        },
        defaultItem: {
          etype: 'html:div',
          binding: 'text'
        }
      });

      box.render(document.body);

      box.bind(data);

      expect( box.items.size() ).to.be.eq(2);
//      expect( box.components.size() ).to.be.eq(1);

      expect( box.items.get(0).opt('text') ).to.be.eq('Alice');
      expect( box.items.get(1).opt('text') ).to.be.eq('Bob');

      expect( $(box.el).children().eq(0).text() ).to.be.eq('Alice');
      expect( $(box.el).children().eq(1).text() ).to.be.eq('Bob');
      expect( $(box.el).children().eq(2).text() ).to.be.eq('Text');


      box.data.entry(0).set('Charlie');

      expect( box.items.get(0).opt('text') ).to.be.eq('Charlie');
      expect( box.items.get(1).opt('text') ).to.be.eq('Bob');

      expect( box.$comp._index ).to.be.undefined;
      expect( box.$comp._weight ).to.be.undefined;

      expect( box.items.get(0)._index ).to.be.eq(0);
      expect( box.items.get(1)._index ).to.be.eq(1);
      expect( box.items.get(0).vdom.el._pos ).to.be.eq(0);
      expect( box.items.get(1).vdom.el._pos ).to.be.eq(1);

      expect( $(box.el).children().eq(0).text() ).to.be.eq('Charlie');
      expect( $(box.el).children().eq(1).text() ).to.be.eq('Bob');



      box._destroy();
    });




    it('should do binding on dynamic item once', function() {

      var data = ['Alice', 'Bob', 'Charlie'];

      var messages = [];

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
        data: data,
        defaultItem: {
          etype: 'html:div',
          binding: 'text',
          rendering: function() {
            messages.push( this.value );
          }
        }
      });

      box.render();

      expect(messages).to.be.eql(['Alice', 'Bob', 'Charlie']);



      messages = [];

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
        defaultItem: {
          etype: 'html:div',
          binding: 'text',
          rendering: function() {
            messages.push( this.value );
          }
        }
      });

      box.render();

      box.data = data;

      expect(messages).to.be.eql(['Alice', 'Bob', 'Charlie']);


    });




	})


});
