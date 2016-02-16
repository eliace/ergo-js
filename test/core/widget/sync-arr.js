var expect = chai.expect;

describe('Widget', function(){
	describe('Dynamic Sync Array', function() {

		it('should change dynamic items on sync', function() {

			var bindings = [];

			var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie']/*, {idKey: false}*/);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); this.opt('text', v) },
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
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Alice', 'Charlie']);

//			console.log('delete', bindings);
			expect(bindings).to.be.eql(['Charlie', ['Alice', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.sync(['Alice', 'Alice', 'Charlie']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
      expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Alice', 'Charlie']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Alice', 'Charlie']);

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
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); }
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
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); this.opt('text', v) }
				},
				dynamicSorter: sorter
			});

			box.bind(ds);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Charlie']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Bob', 'Charlie']);


//      box.items.each(function(item) { console.log('i', item._index); });

			// DELETE
			bindings = [];

			ds.sync(['Bob', 'Alice']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Bob']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Alice', 'Bob']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Alice', ['Bob', 'Alice']]); // 1 delete


//      box.items.each(function(item) { console.log('i', item._index); });



			// CREATE
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Alice']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Bob', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Alice', 'Bob', 'Dave', ['Dave', 'Bob', 'Alice']]); // 1 create + 2 updates


			// CREATE X
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Alice', 'Chuck']);

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text(), box.jquery.el.children().eq(3).text()]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Chuck', ['Dave', 'Bob', 'Alice', 'Chuck']]); // 1 create



			// UPDATE
			bindings = [];

			ds.sync(['Dave', 'Bob', 'Eve', 'Chuck']);

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text(), box.jquery.el.children().eq(3).text()]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Eve', ['Dave', 'Bob', 'Eve', 'Chuck']]);


		});




		//-------------------------------------------------------------------------
		//
		// FILTERED + SORTED
		//
		//-------------------------------------------------------------------------
		it('should change FILTERED+SORTED dynamic items on sync', function() {

			var bindings = [];

			// сортировка по возрастанию
			var sorter = function(a, b) {
				a = a[1];
				b = b[1];
				if( a < b ) return -1;
				if( a > b ) return 1;
				return 0;
			};

			// длина строки больше 3 символов
			var filter = function(v) { return v.length > 3; };


			var ds = new Ergo.core.DataSource(['Bob', 'Charlie', 'Alice', 'Dave', 'Eve']);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); this.opt('text', v) }
				},
				dynamicSorter: sorter,
				dynamicFilter: filter
			});

			box.bind(ds);


			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Charlie', 'Dave']);


			// DELETE (visible)
			bindings = [];

			ds.sync(['Bob', 'Charlie', 'Dave', 'Eve']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', ['Bob', 'Charlie', 'Dave', 'Eve']]); // 1 delete


			// CREATE (visible)
			bindings = [];

			ds.sync(['Bob', 'Frank', 'Charlie', 'Dave', 'Eve']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Charlie', 'Dave', 'Frank']);
//			expect([box.jquery.el.children().eq(0)[0]._index, box.jquery.el.children().eq(1)[0]._index, box.jquery.el.children().eq(2)[0]._index]).to.be.eql([0,1,2]);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Charlie', 'Dave', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', 'Charlie', 'Frank', ['Bob', 'Frank', 'Charlie', 'Dave', 'Eve']]);


			// UPDATE (visible)
			bindings = [];

			ds.sync(['Bob', 'Frank', 'Charlie', 'Joe', 'Eve']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Bob', 'Frank', 'Charlie', 'Joe', 'Eve']]);



			// DELETE (hidden)
			bindings = [];

			ds.sync(['Frank', 'Charlie', 'Joe', 'Eve']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Charlie', 'Frank', ['Frank', 'Charlie', 'Joe', 'Eve']]);


			// CREATE (hidden)
			bindings = [];

			ds.sync(['Frank', 'Charlie', 'Joe', 'Ann', 'Eve']);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Frank', 'Charlie', 'Joe', 'Ann', 'Eve']]);


			// UPDATE (hidden)
			bindings = [];

			ds.sync(['Frank', 'Charlie', 'Joe', 'Ann', 'Brian']);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Brian', 'Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Brian', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Brian', ['Frank', 'Charlie', 'Joe', 'Ann', 'Brian']]);




		});






		//-------------------------------------------------------------------------
		//
		// FILTERED + SORTED + valueUid
		//
		//-------------------------------------------------------------------------
		it('should change FILTERED+SORTED + UID dynamic items on sync', function() {

			var bindings = [];

			// сортировка по возрастанию
			var sorter = function(a, b) {
				a = a[1].title;
				b = b[1].title;
				if( a < b ) return -1;
				if( a > b ) return 1;
				return 0;
			};

			// длина строки больше 3 символов
			var filter = function(v) { return v.title.length > 3; };

			var identifier = function(v) { return v.id; }


			var ds = new Ergo.core.DataSource([{id: 1, title: 'Bob'}, {id: 2, title: 'Charlie'}, {id: 3, title: 'Alice'}, {id: 4, title: 'Dave'}, {id: 5, title: 'Eve'}], {valueUid: identifier});

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); }
				},
				dynamicSorter: sorter,
				dynamicFilter: filter
			});

			box.bind(ds);


			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Alice', 'Charlie', 'Dave']);


			// DELETE (visible)
			bindings = [];

			ds.sync([{id: 1, title: 'Bob'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Dave'}, {id: 5, title: 'Eve'}]);



			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value.title, box.item(1).value.title]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([[{id: 1, title: 'Bob'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Dave'}, {id: 5, title: 'Eve'}]]);




			// CREATE (visible)
			bindings = [];

			ds.sync([{id: 1, title: 'Bob'}, {id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Dave'}, {id: 5, title: 'Eve'}]);


			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Charlie', 'Dave', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{id: 6, title: 'Frank'}, [{id: 1, title: 'Bob'}, {id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Dave'}, {id: 5, title: 'Eve'}]]);




			// UPDATE (visible)
			bindings = [];

			ds.sync([{id: 1, title: 'Bob'}, {id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 5, title: 'Eve'}]);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([[{id: 1, title: 'Bob'}, {id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 5, title: 'Eve'}]]);



			// DELETE (hidden)
			bindings = [];

			ds.sync([{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 5, title: 'Eve'}]);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value.title, box.item(1).value.title]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([[{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 5, title: 'Eve'}]]);



			// CREATE (hidden)
			bindings = [];

			ds.sync([{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 5, title: 'Eve'}]);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([[{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 5, title: 'Eve'}]]);


			// UPDATE (hidden)
			bindings = [];

			ds.sync([{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 5, title: 'Brian'}]);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Brian', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{id: 5, title: 'Brian'}, [{id: 6, title: 'Frank'}, {id: 2, title: 'Charlie'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 5, title: 'Brian'}]]);



			// DELETE + CREATE (visible)
			bindings = [];

			ds.sync([{id: 6, title: 'Frank'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 8, title: 'Helen'}, {id: 5, title: 'Brian'}]);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Brian', 'Frank', 'Helen']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{id: 8, title: 'Helen'}, [{id: 6, title: 'Frank'}, {id: 4, title: 'Joe'}, {id: 7, title: 'Ann'}, {id: 8, title: 'Helen'}, {id: 5, title: 'Brian'}]]);




			// REORDER (visible)
			bindings = [];

			ds.sync([{id: 4, title: 'Joe'}, {id: 5, title: 'Brian'}, {id: 6, title: 'Frank'}, {id: 8, title: 'Helen'}, {id: 7, title: 'Ann'}]);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Brian', 'Frank', 'Helen']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{id: 6, title: 'Frank'}, {id: 5, title: 'Brian'}, [{id: 4, title: 'Joe'}, {id: 5, title: 'Brian'}, {id: 6, title: 'Frank'}, {id: 8, title: 'Helen'}, {id: 7, title: 'Ann'}]]);




			// UPDATE ALL
			bindings = [];

			ds.sync([{id: 4, title: 'Jo2'}, {id: 5, title: 'Bria2'}, {id: 6, title: 'Fran2'}, {id: 8, title: 'Hele2'}, {id: 7, title: 'An2'}]);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Bria2', 'Fran2', 'Hele2']);

			console.log(bindings);
			expect(bindings).to.be.eql([{id: 8, title: 'Hele2'}, {id: 6, title: 'Fran2'}, {id: 5, title: 'Bria2'}, [{id: 4, title: 'Jo2'}, {id: 5, title: 'Bria2'}, {id: 6, title: 'Fran2'}, {id: 8, title: 'Hele2'}, {id: 7, title: 'An2'}]]);


/*
			// DELETE + UPDATE (visible)
			bindings = [];

			ds.sync([{title: 'Frank'}, {title: 'Joe'}, {title: 'Ann'}, {title: 'Helen'}, {title: 'Brian'}]);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value.title, box.item(1).value.title, box.item(2).value.title]).to.be.eql(['Brian', 'Frank', 'Helen']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{title: 'Helen'}, [{title: 'Frank'}, {title: 'Joe'}, {title: 'Ann'}, {title: 'Helen'}, {title: 'Brian'}]]);
*/

		});






  });
});
