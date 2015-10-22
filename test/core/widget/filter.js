var expect = chai.expect;

describe('Widget', function(){

  describe('Filter', function() {

		it('should be correct items on filtered binding', function() {

      var bindings = [];

      var data = ['Alice', 'Bob', 'Charlie']

      var dataFilter = function(v, i) {
        return v.length > 3;
      };

      var box = $.ergo({
        etype: 'html:div',
        dynamic: true,
        dynamicFilter: dataFilter,
        data: data,
        defaultItem: {
          etype: 'html:div',
          binding: 'text'
        },
        binding: function() {
          bindings.push( this.items.size() );
        }
      });

      box.data.add('Dave');

      expect(bindings).to.be.eql([2, 3]);
      // expect(box.item(0).opt('text')).to.be.eq('Dave');


		});



	})


});
