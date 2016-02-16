var expect = chai.expect;

describe('Widget', function(){
	describe('Dynamic Sync Object', function() {

		it('should change dynamic items on sync', function() {

			var bindings = [];

			var ds = new Ergo.core.DataSource({a: 'Alice', b: 'Bob', c: 'Charlie'});

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

			ds.sync({a:'Alice', c:'Charlie'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Alice', 'Charlie']);

//			console.log('delete', bindings);
			expect(bindings).to.be.eql([{a:'Alice', c:'Charlie'}]);


			// CREATE
			bindings = [];

			ds.sync({a:'Alice', b:'Alice', c:'Charlie'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
      expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Alice', 'Charlie']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Alice', 'Charlie']);

//			console.log('create', bindings);
			expect(bindings).to.be.eql(['Alice', {a:'Alice', b:'Alice', c:'Charlie'}]);


			// UPDATE
			bindings = [];

      ds.sync({a:'Alice', b:'Bob', c:'Charlie'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);

//			console.log('update', bindings);
			expect(bindings).to.be.eql(['Bob', {a:'Alice', b:'Bob', c:'Charlie'}]);


		});




    it('should change FILTERED dynamic items on sync', function() {

			var bindings = [];

			var filter = function(v) { return v.length > 3; };

			var ds = new Ergo.core.DataSource({a:'Alice', b:'Bob', c:'Charlie', d:'Dave'});

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
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);


			// DELETE (VISIBLE)
			bindings = [];

			ds.sync({a:'Alice', b:'Bob', c:'Charlie'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Charlie']);

			expect(bindings).to.be.eql([/*'Dave', */{a:'Alice', b:'Bob', c:'Charlie'}]);


			// CREATE (VISIBLE)
			bindings = [];

			ds.sync({a:'Alice', b:'Bob', c:'Charlie', d:'Frank'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Frank', {a:'Alice', b:'Bob', c:'Charlie', d:'Frank'}]);


			// UPDATE (VISIBLE)
			bindings = [];

			ds.sync({a:'Alice', b:'Bob', c:'Charlie', d:'Dave'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', {a:'Alice', b:'Bob', c:'Charlie', d:'Dave'}]);



			// DELETE (HIDDEN)
			bindings = [];

			ds.sync({a:'Alice', c:'Charlie', d:'Dave'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log('sync delete hidden', bindings);
			expect(bindings).to.be.eql([{a:'Alice', c:'Charlie', d:'Dave'}]);


			// CREATE (HIDDEN)
			bindings = [];

			ds.sync({a:'Alice', c:'Charlie', e:'Eve', d:'Dave'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);

//			console.log('sync create hidden', bindings);
			expect(bindings).to.be.eql([{a:'Alice', c:'Charlie', e:'Eve', d:'Dave'}]);



			// UPDATE (HIDDEN)
			bindings = [];

			ds.sync({a:'Oz', c:'Charlie', e:'Eve', d:'Dave'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{a:'Oz', c:'Charlie', e:'Eve', d:'Dave'}]);


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

			var ds = new Ergo.core.DataSource({b:'Bob', c:'Charlie', a:'Alice'});

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

			ds.sync({b:'Bob', a:'Alice'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Alice', 'Bob']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Alice', 'Bob']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{b:'Bob', a:'Alice'}]); // 1 delete


//      box.items.each(function(item) { console.log('i', item._index); });



			// CREATE
			bindings = [];

			ds.sync({d:'Dave', b:'Bob', a:'Alice'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Bob', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Bob', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Dave', {d:'Dave', b:'Bob', a:'Alice'}]); // 1 create + 2 updates


			// CREATE X
			bindings = [];

			ds.sync({d:'Dave', b:'Bob', a:'Alice', c:'Chuck'});

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text(), box.jquery.el.children().eq(3).text()]).to.be.eql(['Alice', 'Bob', 'Chuck', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Chuck', {d:'Dave', b:'Bob', a:'Alice', c:'Chuck'}]); // 1 create



			// UPDATE
			bindings = [];

			ds.sync({d:'Dave', b:'Bob', a:'Eve', c:'Chuck'});

			expect(box.items.size()).to.be.eq(4);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value, box.item(2).value, box.item(3).value]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text(), box.jquery.el.children().eq(3).text()]).to.be.eql(['Bob', 'Chuck', 'Dave', 'Eve']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Eve', {d:'Dave', b:'Bob', a:'Eve', c:'Chuck'}]);


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


			var ds = new Ergo.core.DataSource({b:'Bob', c:'Charlie', a:'Alice', d:'Dave', e:'Eve'});

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
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Alice', 'Charlie', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Alice', 'Charlie', 'Dave']);


			// DELETE (visible)
			bindings = [];

			ds.sync({b:'Bob', c:'Charlie', d:'Dave', e:'Eve'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(2);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Dave']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Dave']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{b:'Bob', c:'Charlie', d:'Dave', e:'Eve'}]); // 1 delete


			// CREATE (visible)
			bindings = [];

			ds.sync({b:'Bob', f:'Frank', c:'Charlie', d:'Dave', e:'Eve'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Charlie', 'Dave', 'Frank']);
//			expect([box.jquery.el.children().eq(0)[0]._index, box.jquery.el.children().eq(1)[0]._index, box.jquery.el.children().eq(2)[0]._index]).to.be.eql([0,1,2]);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Charlie', 'Dave', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Frank', {b:'Bob', f:'Frank', c:'Charlie', d:'Dave', e:'Eve'}]);


			// UPDATE (visible)
			bindings = [];

			ds.sync({b:'Bob', f:'Frank', c:'Charlie', d:'Joe', e:'Eve'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{b:'Bob', f:'Frank', c:'Charlie', d:'Joe', e:'Eve'}]);



			// DELETE (hidden)
			bindings = [];

			ds.sync({f:'Frank', c:'Charlie', d:'Joe', e:'Eve'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(3);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{f:'Frank', c:'Charlie', d:'Joe', e:'Eve'}]);


			// CREATE (hidden)
			bindings = [];

			ds.sync({f:'Frank', c:'Charlie', d:'Joe', a:'Ann', e:'Eve'});

			expect(box.items.size()).to.be.eq(2);
			expect(ds.entries.size()).to.be.eq(4);
			expect([box.item(0).value, box.item(1).value]).to.be.eql(['Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text()]).to.be.eql(['Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql([{f:'Frank', c:'Charlie', d:'Joe', a:'Ann', e:'Eve'}]);


			// UPDATE (hidden)
			bindings = [];

			ds.sync({f:'Frank', c:'Charlie', d:'Joe', a:'Ann', e:'Brian'});

			expect(box.items.size()).to.be.eq(3);
			expect(ds.entries.size()).to.be.eq(5);
			expect([box.item(0).value, box.item(1).value, box.item(2).value]).to.be.eql(['Brian', 'Charlie', 'Frank']);
			expect([box.jquery.el.children().eq(0).text(), box.jquery.el.children().eq(1).text(), box.jquery.el.children().eq(2).text()]).to.be.eql(['Brian', 'Charlie', 'Frank']);

//			console.log(bindings);
			expect(bindings).to.be.eql(['Brian', {f:'Frank', c:'Charlie', d:'Joe', a:'Ann', e:'Brian'}]);




		});






  });
});
