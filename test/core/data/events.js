var expect = chai.expect;

describe('DataSource', function(){

  describe('Events', function() {

		it('should fires `changed` when set value', function() {

      var result = false;

      var ds = new Ergo.core.DataSource('Alice');

      ds.events.on('changed', function(e) {

        result = true;

        expect(e.oldValue).is.eq('Alice');
        expect(e.newValue).is.eq('Bob');
      });

      ds.set('Bob');

      expect(result).to.be.ok;
		});


    it('should fires `diff` and `dirty` events', function() {

      var result = [];

      var ds = new Ergo.core.DataSource( {a: 'Alice'} );

      ds.events.on('diff', function(e) {
        result.push('diff');

        expect(e.entry).to.be.not.null
      });

      ds.events.on('dirty', function(e) {
        result.push('dirty');

      });


      ds.set('a', 'Bob');

      expect(result).to.be.eql(['dirty', 'diff']);
		});


	})


});
