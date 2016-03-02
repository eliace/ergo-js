
var expect = chai.expect;

describe('Widget', function(){
	describe('Data', function() {



		it('should bind to nested property data', function() {

      var w = $.ergo({
        etype: 'box'
      });

			w.storage = {
				val: 4
			};

			w.data = 'storage';

      expect( w.data.get() ).to.be.eql({val: 4});

    });


		// it('should cascade binding', function() {
		//
		// 	var messages = [];
		//
		// 	var f = function(v) {
		// 		messages.push(v);
		// 	}
		//
		// 	var w = $.ergo({
		// 		etype: 'box',
		// 		binding: v,
    //     $content: {
		// 			binding: v,
    //       $list: {
		// 				binding: v
    //       }
    //     },
    //     data: []
		// 	});
		//
    //   w.data.set(['Alice', 'Bob', 'Charlie']);
		//
    //   expect( w.$content.$list.items.size() ).to.be.eq(3);
		//
		// });



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

//			console.log('messages', messages);

//      expect( messages ).to.be.eql([]);

		});




		it('should minimize refresh on cascade rebind with dataId', function() {

			var messages = [];

			var w = $.ergo({
			  etype: 'box',
			  $content: {
			    dynamic: true,
			    defaultItem: {
			      defaultItem: {
			        binding: function(v) {
								messages.push(v);
							}
			      },
			      items: [{
			        dataId:'a'
			      },{
			        dataId:'b'
			      }]
						// binding: function(v) {
						// 	messages.push(v);
						// }
			    }
			  }
			});


			var d = new Ergo.core.DataSource([]);

			d.set([{
			 a:'111',
			 b:'111'
			},{
			 a:'222',
			 b:'222'
			}]);

			w.bind(d);

			d.sync([{
			 a:'333',
			 b:'333'
			},{
			 a:'444',
			 b:'444'
			}]);

//			console.log(messages);

			expect( messages ).to.be.eql(["111", "111", "222", "222", "444", "444", "333", "333"]);


			// messages = [];
			//
      // w.bind({a: 'Alice'});
			//
			// console.log('messages', messages);
			//
			// w.data.set('a', 'Bob');
			//
			// console.log('messages', messages);

//      expect( messages ).to.be.eql([]);






		});





  });
});
