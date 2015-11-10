var expect = chai.expect;

describe('Widget', function(){

  describe('Items', function() {

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
          text: 'Text'
        },
        defaultItem: {
          etype: 'html:div',
          binding: 'text'
        }
      });

      box.render('body');

      box.bind(data);

      expect( box.items.size() ).to.be.eq(2);
//      expect( box.components.size() ).to.be.eq(1);

      expect( box.items.get(0).opt('text') ).to.be.eq('Alice');
      expect( box.items.get(1).opt('text') ).to.be.eq('Bob');

      expect( box.el.children().eq(0).text() ).to.be.eq('Alice');
      expect( box.el.children().eq(1).text() ).to.be.eq('Bob');


      console.log('-----------------------');
      box.data.entry(0).set('Charlie');
      console.log('-----------------------');

      expect( box.items.get(0).opt('text') ).to.be.eq('Charlie');
      expect( box.items.get(1).opt('text') ).to.be.eq('Bob');

      expect( box.$comp._index ).to.be.undefined;
      expect( box.$comp._weight ).to.be.undefined;

      expect( box.items.get(0)._index ).to.be.eq(0);
      expect( box.items.get(1)._index ).to.be.eq(1);
      expect( box.items.get(0).el[0]._index ).to.be.eq(0);
      expect( box.items.get(1).el[0]._index ).to.be.eq(1);

      expect( box.el.children().eq(0).text() ).to.be.eq('Charlie');
      expect( box.el.children().eq(1).text() ).to.be.eq('Bob');



      box._destroy();
    });



	})


});
