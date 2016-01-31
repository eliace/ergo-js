
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

      w.data.set({persons: ['Alice', 'Bob', 'Charlie']});

      expect( w.$content.$content.$list.items.size() ).to.be.eq(3);


    });




		it('should minimize refresh on cascade rebind', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				onRefresh: function() { messages.push('box'); },
        $content: {
					onRefresh: function() { messages.push('content'); },
          $list: {
						onRefresh: function() { messages.push('list'); },
						defaultItem: {
							onRefresh: function() { messages.push(this.value); },
						},
            dynamic: true
          }
        },
        data: []
			});

//			expect( messages ).to.be.eql(['box','content','list']);


			messages = [];

      w.data.set(['Alice', 'Bob', 'Charlie']);

			console.log('messages', messages);

//      expect( messages ).to.be.eql([]);

		});




  });
});
