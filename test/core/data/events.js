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

      var messages = [];

      var ds = new Ergo.core.DataSource( {a: 'Alice'}, {
        events: {
          'diff': function(e) {
            messages.push('diff');

            expect(e.entry).to.be.not.null
          },
          'dirty': function(e) {
            messages.push('dirty');
          }
        }
      } );

      // ds.on('diff', function(e) {
      //   messages.push('diff');
      //
      //   expect(e.entry).to.be.not.null
      // });
      //
      // ds.on('dirty', function(e) {
      //   messages.push('dirty');
      // });


      ds.set('a', 'Bob');

      expect(messages).to.be.eql(['diff', 'dirty']);



      messages = [];

      ds.add({c: 'Charlie'});

      expect(messages).to.be.eql(['diff', 'dirty']);


      messages = [];

      ds.entry(0).del();

      expect(messages).to.be.eql(['diff', 'dirty']);


		});


	})


});
