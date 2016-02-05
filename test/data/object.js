var expect = chai.expect;

describe('Data', function(){
  describe('Object', function() {


    it('should cascade binding', function() {

      var ds = new Ergo.data.Object();
      ds.set('Alice');

    	var messages = [];

			var f = function(v) {
				messages.push(v);
			}

			var w = $.ergo({
				etype: 'box',
				binding: f,
        $content: {
					binding: f,
          $list: {
						binding: f
          }
        },
        data: ds
			});

      expect( messages ).to.be.eql(['Alice', 'Alice', 'Alice']);

    });


  });
});
