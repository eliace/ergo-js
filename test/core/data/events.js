var expect = chai.expect;

describe('DataSource events', function(){

  describe('entry:changed', function() {

		it('should fires entry:changed event', function(done) {

      var ds = new Ergo.core.DataSource({a: 'Alice'});

      ds.events.on('entry:changed', function(e) {
        expect(e.entry).not.to.be.null;
        done();
      });

      ds.set('a', 'Bob');

		});


    it('should rises entry:changed event', function(done) {

      var ds = new Ergo.core.DataSource( {person: {a: 'Alice'}} );

      ds.events.on('entry:changed', function(e) {
        expect(e.entry).not.to.be.null;
        done();
      });

      ds.set('person.a', 'Bob');

		});


	})


});
