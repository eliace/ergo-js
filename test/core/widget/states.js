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


  });
});
