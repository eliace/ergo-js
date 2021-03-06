
var expect = chai.expect;

describe('Widget', function(){
	describe('Dynamic Diff', function() {

		it('should change dynamic items on diff', function() {

			var bindings = [];

			var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie']);

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); }
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

//			console.log('delete', bindings);
			expect(bindings).to.be.eql([/*'Bob', */['Alice', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.add('Alice', 0);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

//			console.log('create', bindings);
			expect(bindings).to.be.eql(['Alice', ['Alice', 'Alice', 'Charlie']]);


			// UPDATE
			bindings = [];

			ds.set(1, 'Bob');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

//			console.log('update', bindings);
			expect(bindings).to.be.eql(['Bob', ['Alice', 'Bob', 'Charlie']]);


		});





		it('should change FILTERED dynamic items on diff', function() {

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


			// DELETE
			bindings = [];

			ds.del(3);

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);

			expect(bindings).to.be.eql([/*'Dave', */['Alice', 'Bob', 'Charlie']]);


			// CREATE
			bindings = [];

			ds.add('Frank');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Frank', ['Alice', 'Bob', 'Charlie', 'Frank']]);


			// UPDATE
			bindings = [];

			ds.set(3, 'Dave');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', ['Alice', 'Bob', 'Charlie', 'Dave']]);



			// DELETE X
			bindings = [];

			ds.del(1);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Charlie', 'Dave']]);


			// CREATE X
			bindings = [];

			ds.add('Eve', 2);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Alice', 'Charlie', 'Eve', 'Dave']]);



			// UPDATE X
			bindings = [];

			ds.set(0, 'Oz');

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Oz', 'Charlie', 'Eve', 'Dave']]);


			// UPDATE X
			bindings = [];

			ds.set(2, 'Frank');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Charlie', 'Frank', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Frank', ['Oz', 'Charlie', 'Frank', 'Dave']]);


			// UPDATE X
			bindings = [];

			ds.set(0, 'Eve');

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Charlie', 'Frank', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([['Eve', 'Charlie', 'Frank', 'Dave']]);

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
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); }
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

//			console.log(bindings);
			expect(bindings).to.be.eql([/*'Charlie', */['Bob', 'Alice']]);


			// CREATE
			bindings = [];

			ds.add('Dave', 0);

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', ['Dave', 'Bob', 'Alice']]);


			// CREATE X
			bindings = [];

//			console.log('-----------------');
			ds.add('Chuck');
//			console.log('-----------------');

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Chuck', ['Dave', 'Bob', 'Alice', 'Chuck']]);



			// UPDATE
			bindings = [];

			ds.set(2, 'Eve');

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Eve', ['Dave', 'Bob', 'Eve', 'Chuck']]);


		});



		it('should rebuild dynamic items on dirty', function() {

			var bindings = [];

			var data = [{ref: 'http://ergojs.com'}, {ref: 'http://my.org'}];

			var filter = function(v, i) {
//				console.log('filter value', v);
				return v.ref.indexOf('https://') == -1;
			}

			var box = $.ergo({
				etype: 'html:div',
				dynamic: true,
				dynamicFilter: filter,
				binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
				defaultItem: {
					etype: 'html:div',
					binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
					$content: {
						etype: 'html:a',
						dataId: 'ref',
						binding: function(v) { bindings.push(Ergo.deepCopy(v)); },
					}
				},
				events: {
					'data:dirty': function(e) {
//						console.log(e);
						this._dataDiff([], [], e.updated);
					}
				}
			});

			box.bind(data);

			// box.data.events.on('dirty', function(e) {
			// 	this._dataDiff([], [], e.updated);
			// }, box);

//			console.log('data', box.data);
//			console.log(box.items.size());


			bindings = [];

			box.data.set('0.ref', 'https://github.com');


			expect(box.items.size()).to.be.eq(1);

//			console.log('should rebuild dynamic items on dirty', bindings);
			expect(bindings).to.be.eql(['https://github.com', /*{ref: 'https://github.com'},*/ [{ref: 'https://github.com'}, {ref: 'http://my.org'}]]);

		});



	});
});
