var expect = chai.expect;

describe('Include "provider-methods"', function(){
	describe('Use', function() {
		it('should call provider methods', function() {

      var result = [];

      var ordersProvider = {
        done: function(ds, data, q) {
          result.push('done');
        },
        cancel: function(ds, data, q) {
          result.push('cancel');
        }
      }

      Ergo.defineClass('Ergo.test.Order', 'Ergo.data.Object', {
        defaults: {
          include: 'provider-methods'
        },
        write: function(v) {
          this.set( v );
        },

      });

      var order = new Ergo.test.Order({provider:ordersProvider})

      order.$done()
				.then(function() { result.push('after-done') });
      order.$cancel()
			.then(function() { result.push('after-cancel') });

      expect(result).to.eql(['done', 'after-done', 'cancel', 'after-cancel']);

		});
	});
});
