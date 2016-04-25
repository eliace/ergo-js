
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
			expect( ds.get(['a', 'b']) ).to.deep.equal( {a: 'Alice', b: 'Bob'} );

		})

		it('should set multikey value of entry', function() {

			var ds = new Ergo.core.DataSource({	a: 'Alice',	b: 'Bob',	c: 'Charlie' });
			var ds2 = new Ergo.core.DataSource(ds, ['a', 'b']);

			ds2.set({b: 'Billy'});

			expect( ds2.get() ).to.deep.equal( {a: 'Alice', b: 'Billy'} );
			expect( ds.get() ).to.deep.equal( {a: 'Alice', b: 'Billy', c: 'Charlie'} );

		})


		it('should update multikey value on source key change', function() {

			var ds = new Ergo.core.DataSource({	a: 'Alice',	b: 'Bob',	c: 'Charlie' });
			var ds2 = new Ergo.core.DataSource(ds, ['a', 'b']);

			var messages = [];


//			var ds2 = ds.entry(['a', 'b']);  //add entry to entry cache

			ds2.entry('a').events.on('changed', function(e) {
				messages.push('a');
			});


			ds.set('a', 'Amanda');

			expect( ds.entry('a') ).to.be.eq( ds2.entry('a') );


			expect( ds2.entry('a').get() ).to.be.eq( 'Amanda' );
//			expect( ds.entry('a').get() ).to.be.eq( 'Amanda' );
			expect( messages ).to.be.deep.eq( ['a'] );

		});



		it('should binding multikey widget on value change', function() {

			var data = {	a: 'Alice',	b: 'Bob',	c: 'Charlie' };

			var messages = [];

			var box = $.ergo({
				etype: 'html:div',
				data: data,
				items: [{
					etype: 'html:div',
					dataId: 'a',
					binding: function(v) { messages.push(v); }
				}, {
					etype: 'html:div',
					dataId: 'b',
					binding: function(v) { messages.push(v); }
				}, {
					etype: 'html:div',
					dataId: ['a', 'b'],
					binding: function(v) { messages.push(v); }
				}]
			});


			messages = [];

			box.item(0).opt('value', 'Amanda');

			expect( messages ).to.be.deep.eq( ['Amanda', { a: 'Amanda', b: 'Bob' }] )

		});



		it('should binding multikey widget on value change 2', function() {

			var data = {	a: 'Alice',	b: 'Bob',	c: 'Charlie' };

			var messages = [];

			var box = $.ergo({
				etype: 'html:div',
				data: data,
				dataId: ['a', 'b'],
				binding: function(v) { messages.push(v); },
				items: [{
					etype: 'html:div',
					dataId: 'a',
					binding: function(v) { messages.push(v); }
				}, {
					etype: 'html:div',
					dataId: 'b',
					binding: function(v) { messages.push(v); }
				}]
			});

			messages = [];

			box.prop('value', {a: 'Amanda', b: 'Bill'});

			expect( messages ).to.be.deep.eq( ['Amanda', 'Bill'] )

		});



	})



});
