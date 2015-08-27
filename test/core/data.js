
var expect = chai.expect;

describe('DataSource', function(){
	describe('Multikey', function() {
		it('should get multikey value', function() {

			var v = {	a: 'Alice',	b: 'Bob',	c: 'Charlie' }

			var ds = new Ergo.core.DataSource(v, ['a', 'b']);

			expect( ds.get() ).to.deep.equal( {a: 'Alice', b: 'Bob'} );

		});

		it('should set multikey value', function() {

			var v = {	a: 'Alice',	b: 'Bob',	c: 'Charlie' }

			var ds = new Ergo.core.DataSource(v, ['a', 'b']);

			ds.set({b: 'Billy'});

			expect( ds.get() ).to.deep.equal( {a: 'Alice', b: 'Billy'} );
			expect( v ).to.deep.equal( {a: 'Alice', b: 'Billy', c: 'Charlie'} );


			ds.set({a: 'Ann', b: 'Brian', c: 'Carl'});

			expect( ds.get() ).to.deep.equal( {a: 'Ann', b: 'Brian'} );
			expect( v ).to.deep.equal( {a: 'Ann', b: 'Brian', c: 'Charlie'} );

		});

		it('should ignore extra keys', function() {

			var v = {	a: 'Alice',	b: 'Bob',	c: 'Charlie' }

			var ds = new Ergo.core.DataSource(v, ['a', 'b']);

			ds.set({a: 'Ann', b: 'Brian', c: 'Carl'});

			expect( ds.get() ).to.deep.equal( {a: 'Ann', b: 'Brian'} );
			expect( v ).to.deep.equal( {a: 'Ann', b: 'Brian', c: 'Charlie'} );

		});


		it('should get multikey value of entry', function() {

			var ds = new Ergo.core.DataSource({	a: 'Alice',	b: 'Bob',	c: 'Charlie' });
			var ds2 = new Ergo.core.DataSource(ds, ['a', 'b']);

			expect( ds2.get() ).to.deep.equal( {a: 'Alice', b: 'Bob'} );

		})

		it('should set multikey value of entry', function() {

			var ds = new Ergo.core.DataSource({	a: 'Alice',	b: 'Bob',	c: 'Charlie' });
			var ds2 = new Ergo.core.DataSource(ds, ['a', 'b']);

			ds2.set({b: 'Billy'});

			expect( ds2.get() ).to.deep.equal( {a: 'Alice', b: 'Billy'} );
			expect( ds.get() ).to.deep.equal( {a: 'Alice', b: 'Billy', c: 'Charlie'} );

		})

	})
});