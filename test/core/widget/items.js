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


	})


});
