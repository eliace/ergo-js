var expect = chai.expect;

describe('Widget', function(){
	describe('States', function() {

		it('should use exclusive states', function() {

      var w = $ergo({
        etype: 'box',
        states: {
          color: {
            'blue': 'blue',
            'green': 'green',
            'red': 'red'
          }
        }
      });

      w.states.set('blue');

      expect( w.states.is('blue') ).to.be.true;

      w.states.set('green');

      expect( w.states.is('green') ).to.be.true;
      expect( w.states.is('blue') ).to.be.false;


    });



		it('should use exclusive states with dot notation', function() {

			var messages = [];

      var w = $ergo({
        etype: 'box',
				onStateChanged: function(e) {
					messages.push(e.state);
				}
      });

      w.states.set('color.blue');

			expect( messages ).to.be.eql(['color', 'blue']);
			expect( w.states.is('color') ).to.be.true;
			expect( w.states.is('blue') ).to.be.true;


			messages = [];

			w.states.set('color.green');

			expect( messages ).to.be.eql(['blue', 'green']);
			expect( w.states.is('color') ).to.be.true;
			expect( w.states.is('blue') ).to.be.false;
			expect( w.states.is('green') ).to.be.true;

    });




  });
});
