
var expect = chai.expect;

describe('Widget', function(){
	describe('Dynamic Binding', function() {

		it('should change dynamic items on diff', function() {

			var bindings = [];

			var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie']);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deep_copy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deep_copy(v)); }
				}
			});

			box.bind(ds);


			// DELETE
			bindings = [];

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

			ds.del(1);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);

			expect(bindings).to.be.eql([['Alice', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.add('Alice', 0);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Alice', 'Charlie'], 'Alice']);


			// UPDATE
			bindings = [];

			ds.set(1, 'Bob');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Bob', 'Charlie'], 'Bob']);


		});





		it('should change FILTERED dynamic items on diff', function() {

			var bindings = [];

			var filter = function(v) { return v.length > 3; };

			var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie', 'Dave']);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deep_copy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deep_copy(v)); }
				},
				dynamicFilter: filter
			});

			box.bind(ds);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);


			// DELETE
			bindings = [];

			ds.del(3);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);

			expect(bindings).to.be.eql([['Alice', 'Bob', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.add('Frank');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Frank']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Bob', 'Charlie', 'Frank'], 'Frank']);


			// UPDATE
			bindings = [];

			ds.set(3, 'Dave');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Bob', 'Charlie', 'Dave'], 'Dave']);



			// DELETE X
			bindings = [];

			ds.del(1);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Charlie', 'Dave']]);


			// CREATE X
			bindings = [];

			ds.add('Eve', 2);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Charlie', 'Eve', 'Dave']]);



			// UPDATE X
			bindings = [];

			ds.set(0, 'Oz');

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Oz', 'Charlie', 'Eve', 'Dave'], 'Oz']);

		});



		it('should change SORTED dynamic items on diff', function() {

			var bindings = [];

			var sorter = function(a, b) {
				a = a[1];
				b = b[1];
				if( a < b ) return -1;
				if( a > b ) return 1;
				return 0;
			};

			var ds = new Ergo.core.DataSource(['Bob', 'Charlie', 'Alice']);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deep_copy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deep_copy(v)); }
				},
				dynamicSorter: sorter
			});

			box.bind(ds);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Charlie']);


			// DELETE
			bindings = [];

			ds.del(1);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Bob']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Bob', 'Alice']]);


			// CREATE
			bindings = [];

			ds.add('Dave', 0);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Dave', 'Bob', 'Alice'], 'Dave']);


			// CREATE X
			bindings = [];

			ds.add('Chuck');

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Dave', 'Bob', 'Alice', 'Chuck'], 'Chuck']);



			// UPDATE
			bindings = [];

			ds.set(2, 'Eve');

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);

			console.log(bindings);
			expect(bindings).to.be.eql([['Dave', 'Bob', 'Eve', 'Chuck'], 'Eve']);


		});



	});
});
