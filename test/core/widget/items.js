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




	})


});
