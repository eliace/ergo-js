
var expect = chai.expect;

describe('DataSource', function(){
	describe('Multikey', function() {
		it('foo', function() {

			var d = new Ergo.core.DataSource({
				a: 'Alice',
				b: 'Bob',
				c: 'Charlie'
			}, 'a b');

			expect( d.get() ).to.equal( {a: 'Alice', b: 'Bob'} );


		})
	})
});