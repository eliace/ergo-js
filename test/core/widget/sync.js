var expect = chai.expect;

describe('Widget', function(){
	describe('Dynamic Sync', function() {

		it('should change dynamic items on sync', function() {

			var bindings = [];

			var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie']/*, {idKey: false}*/);

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

			ds.sync(['Alice', 'Charlie']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
      expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);

//			console.log('delete', bindings);
			expect(bindings).to.be.eql(['Charlie', ['Alice', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.sync(['Alice', 'Alice', 'Charlie']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
      expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Alice', 'Charlie']);

//			console.log('create', bindings);
			expect(bindings).to.be.eql(['Charlie', 'Alice', ['Alice', 'Alice', 'Charlie']]);


			// UPDATE
			bindings = [];

      ds.sync(['Alice', 'Bob', 'Charlie']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

//			console.log('update', bindings);
			expect(bindings).to.be.eql(['Bob', ['Alice', 'Bob', 'Charlie']]);


		});




    it('should change FILTERED dynamic items on sync', function() {

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


			// DELETE (VISIBLE)
			bindings = [];

			ds.sync(['Alice', 'Bob', 'Charlie']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);

			expect(bindings).to.be.eql([/*'Dave', */['Alice', 'Bob', 'Charlie']]);


			// CREATE (VISIBLE)
			bindings = [];

			ds.sync(['Alice', 'Bob', 'Charlie', 'Frank']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Frank', ['Alice', 'Bob', 'Charlie', 'Frank']]);


			// UPDATE (VISIBLE)
			bindings = [];

			ds.sync(['Alice', 'Bob', 'Charlie', 'Dave']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', ['Alice', 'Bob', 'Charlie', 'Dave']]);



			// DELETE (HIDDEN)
			bindings = [];

			ds.sync(['Alice', 'Charlie', 'Dave']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log('sync delete hidden', bindings);
			expect(bindings).to.be.eql(['Dave', 'Charlie', ['Alice', 'Charlie', 'Dave']]);


			// CREATE (HIDDEN)
			bindings = [];

			ds.sync(['Alice', 'Charlie', 'Eve', 'Dave']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log('sync create hidden', bindings);
			expect(bindings).to.be.eql(['Dave', ['Alice', 'Charlie', 'Eve', 'Dave']]);



			// UPDATE (HIDDEN)
			bindings = [];

			ds.sync(['Oz', 'Charlie', 'Eve', 'Dave']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Oz', 'Charlie', 'Eve', 'Dave']]);




		});





    it('should change SORTED dynamic items on sync', function() {

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


//      box.items.each(function(item) { console.log('i', item._index); });

			// DELETE
			bindings = [];

			ds.sync(['Bob', 'Alice']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Bob']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Alice', ['Bob', 'Alice']]); // 1 delete


//      box.items.each(function(item) { console.log('i', item._index); });



			// CREATE
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Alice']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Alice', 'Bob', 'Dave', ['Dave', 'Bob', 'Alice']]); // 1 create + 2 updates


			// CREATE X
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Alice', 'Chuck']);

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Chuck', ['Dave', 'Bob', 'Alice', 'Chuck']]); // 1 create



			// UPDATE
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Eve', 'Chuck']);

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Eve', ['Dave', 'Bob', 'Eve', 'Chuck']]);


		});




  });
});
