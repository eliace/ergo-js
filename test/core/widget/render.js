
var expect = chai.expect;

describe('Widget', function(){
	describe('Rendering', function() {

		it('should render items', function() {

      var w = $.ergo({
        etype: 'box',
        items: ['Alice', 'Bob']
      });

      w.render();

//      var item = w.item(0);

//      item = w.item(1);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(0).dom.el._pos).to.be.eq(0);
      expect(w.item(1).dom.el._pos).to.be.eq(1);


      var item = w.item(0);


			item.unrender();
      w.items.remove(item)

      expect(w.items.size()).to.be.eq(1);
			expect(w.el.children().length).to.be.eq(1);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(0).dom.el._pos).to.be.eq(0);



      w.items.add(item, null);
			item.render(); // рендерим в конец равновесных элементов

      expect(w.items.size()).to.be.eq(2);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(1).el.text()).to.be.eq('Alice');
      expect(w.item(0).dom.el._pos).to.be.eq(0);
      expect(w.item(1).dom.el._pos).to.be.eq(1);

      item = w.items.add({text: 'Charlie'}, 1);

			w.render();

			expect(w.items.size()).to.be.eq(3);
			expect(w.el.children().length).to.be.eq(3);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(2)._index).to.be.eq(2);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(1).el.text()).to.be.eq('Charlie');
      expect(w.item(2).el.text()).to.be.eq('Alice');
      expect(w.item(0).dom.el._pos).to.be.eq(0);
      expect(w.item(1).dom.el._pos).to.be.eq(1);
      expect(w.item(2).dom.el._pos).to.be.eq(2);

    });



		it('should render components', function() {

      var w = $.ergo({
        etype: 'box',
				components: {
					a: 'Alice',
					b: 'Bob'
				}
      });

      w.render();

			expect(w.component('a').dom.el._pos).to.be.eq(0);
			expect(w.component('b').dom.el._pos).to.be.eq(1);
			expect(w.component('a').dom.el._weight).to.be.eq(0);
			expect(w.component('b').dom.el._weight).to.be.eq(0);


			var comp = w.component('a');

			comp.unrender();
      w.components.remove(comp);

      expect(w.component('b').el.text()).to.be.eq('Bob');
      expect(w.component('b').dom.el._pos).to.be.eq(0);

			w.components.set('a', comp);
			comp.render();

			expect(w.component('a').el.text()).to.be.eq('Alice');
			expect(w.component('b').el.text()).to.be.eq('Bob');
      expect(w.component('a').dom.el._pos).to.be.eq(1);
			expect(w.component('b').dom.el._pos).to.be.eq(0);

			comp = w.components.set('c', {text: 'Charlie', weight: -1});
      comp.render();

			expect(w.el.children().eq(0).text()).to.be.eq('Charlie');
			expect(w.el.children().eq(1).text()).to.be.eq('Bob');
			expect(w.el.children().eq(2).text()).to.be.eq('Alice');
			expect(w.component('a').el.text()).to.be.eq('Alice');
			expect(w.component('b').el.text()).to.be.eq('Bob');
			expect(w.component('c').el.text()).to.be.eq('Charlie');
      expect(w.component('a').dom.el._pos).to.be.eq(1);
			expect(w.component('b').dom.el._pos).to.be.eq(0);
			expect(w.component('c').dom.el._pos).to.be.eq(0);
			expect(w.component('c').dom.el._weight).to.be.eq(-1);



		});





		it('should render items and components', function() {

      var w = $.ergo({
        etype: 'box',
				components: {
					a: {
						text: 'Alice',
						weight: -10
					},
					b: {
						text: 'Bob',
						weight: 10
					}
				},
				items: ['Charlie']
      });

      w.render();

			expect( w.el.children().length ).to.be.eql(3);
			expect( w.el.children().eq(0)[0]._weight ).to.be.eql(-10);
			expect( w.el.children().eq(1)[0]._weight ).to.be.eql(0);
			expect( w.el.children().eq(2)[0]._weight ).to.be.eql(10);
			expect( w.el.children().eq(0).text() ).to.be.eql('Alice');
			expect( w.el.children().eq(1).text() ).to.be.eql('Charlie');
			expect( w.el.children().eq(2).text() ).to.be.eql('Bob');

		});







		it('should unrender', function() {

      var w = $.ergo({
        etype: 'box',
        items: ['Alice', 'Bob', 'Charlie']
      });

      w.render();


			w.item(1).unrender();

			expect(w.el.children().length).to.be.eq(2);
			expect(w.el.children().eq(0).text()).to.be.eq('Alice');
			expect(w.el.children().eq(1).text()).to.be.eq('Charlie');

		});


		it('should not render non-empty', function() {

			var w = $.ergo({
        etype: 'box',
				$content: {
					autoRender: 'non-empty'
				}
      });

			w.render();

			expect(w.$content).not.null;
			expect(w.el.children().length).to.be.eq(0);

		});



		it('should not render non-render and auto-render items', function() {

			var w = $.ergo({
        etype: 'box',
				items: ['Alice', {text: 'Bob', autoRender: false}, 'Charlie']
      });

			w.render();

			expect(w.el.children().length).to.be.eq(2);

		});




		it('should render filtered', function() {

			var filter = function(item) {
				return item.opt('text').length > 3;
			};

			var w = $.ergo({
        etype: 'box',
				items: ['Alice', 'Bob', 'Charlie', 'Dave', 'Eva'],
				renderFilter: filter
      });

			w.render();

			expect( w.el.children().length ).to.be.eq(3);


		});




		it('should render inherited items', function() {

			var w = $.ergo({
        etype: 'box',
				defaultItem: {
					layout: 'inherited'
				},
				items: [['Alice', 'Bob'], ['Charlie', 'Dave'], ['Eva', 'Frank']]
      });

			w.render();

			expect(w.el.children().eq(0).text()).to.be.eq('Alice');
			expect(w.el.children().eq(1).text()).to.be.eq('Bob');
			expect(w.el.children().eq(2).text()).to.be.eq('Charlie');
			expect(w.el.children().eq(3).text()).to.be.eq('Dave');
			expect(w.el.children().eq(4).text()).to.be.eq('Eva');
			expect(w.el.children().eq(5).text()).to.be.eq('Frank');


		});



		it('should render inherited items and components', function() {

			var w = $.ergo({
        etype: 'box',
				defaultItem: {
					layout: 'inherited',
					$header: {
						etype: 'text',
						weight: -1
					}
				},
				items: [{
					$header__text: 'Header1',
					items: ['Alice', 'Bob']
				}, {
					$header__text: 'Header2',
					items: ['Charlie', 'Dave']
				} , {
					$header__text: 'Header3',
					items: ['Eva', 'Frank']
				}]
      });

			w.render();

			expect(w.el.children().eq(0).text()).to.be.eq('Header1');
			expect(w.el.children().eq(1).text()).to.be.eq('Alice');
			expect(w.el.children().eq(2).text()).to.be.eq('Bob');
			expect(w.el.children().eq(3).text()).to.be.eq('Header2');
			expect(w.el.children().eq(4).text()).to.be.eq('Charlie');
			expect(w.el.children().eq(5).text()).to.be.eq('Dave');
			expect(w.el.children().eq(6).text()).to.be.eq('Header3');
			expect(w.el.children().eq(7).text()).to.be.eq('Eva');
			expect(w.el.children().eq(8).text()).to.be.eq('Frank');


		});




		// it('should render on `autoRender`=true', function() {
		//
    //   var w = $.ergo({
    //     etype: 'box'
    //   });
		//
		// 	w.render();
		//
    //   var item = w.items.add({autoRender: true});
		//
		// 	expect(w.el.children().length).to.be.eq(1);
		//
		//
		// });


  })
})
