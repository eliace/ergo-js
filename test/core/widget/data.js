
var expect = chai.expect;

describe('Widget', function(){
	describe('Data', function() {

    it('should cascade rebind widgets without binding', function() {

			var w = $.ergo({
				etype: 'box',
        $content: {
          $list: {
            dynamic: true
          }
        },
        data: []
			});

      w.data.set(['Alice', 'Bob', 'Charlie']);

      expect( w.$content.$list.items.size() ).to.be.eq(3);



      w = $.ergo({
				etype: 'box',
        $content: {
					dataId: 'persons',
          $content: {
            $list: {
              dynamic: true
            }
          }
        },
        data: {}
			});

      w.data.set({persons: ['Alice', 'Bob', 'Charlie']});

      expect( w.$content.$content.$list.items.size() ).to.be.eq(3);



			w = $.ergo({
				etype: 'box',
        $content: {
					$content: {
						dataId: 'persons',
            $list: {
              dynamic: true
            }
					}
        },
        data: {}
			});

			console.log('--------------------------------------');
      w.data.set({persons: ['Alice', 'Bob', 'Charlie']});
			console.log('--------------------------------------');

      expect( w.$content.$content.$list.items.size() ).to.be.eq(3);




    });

  });
});
