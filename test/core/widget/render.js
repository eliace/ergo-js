
var expect = chai.expect;

describe('Widget', function(){
	describe('Rendering', function() {

		it('should render', function() {

      var w = $.ergo({
        etype: 'box',
        items: ['Alice', 'Bob']
      });

      w.render();

//      var item = w.item(0);

//      item = w.item(1);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(0).el[0]._index).to.be.eq(0);
      expect(w.item(1).el[0]._index).to.be.eq(1);


      var item = w.item(0);

      w.items.remove(item);

      expect(w.items.size()).to.be.eq(1);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(0).el[0]._index).to.be.eq(0);




      w.items.add(item, null);

      expect(w.items.size()).to.be.eq(2);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(1).el.text()).to.be.eq('Alice');
      expect(w.item(0).el[0]._index).to.be.eq(0);
      expect(w.item(1).el[0]._index).to.be.eq(1);

      item = w.items.add({text: 'Charlie'}, 1);
      item.render();

      expect(w.items.size()).to.be.eq(3);
      expect(w.item(0)._index).to.be.eq(0);
      expect(w.item(1)._index).to.be.eq(1);
      expect(w.item(2)._index).to.be.eq(2);
      expect(w.item(0).el.text()).to.be.eq('Bob');
      expect(w.item(1).el.text()).to.be.eq('Charlie');
      expect(w.item(2).el.text()).to.be.eq('Alice');
      expect(w.item(0).el[0]._index).to.be.eq(0);
      expect(w.item(1).el[0]._index).to.be.eq(1);
      expect(w.item(2).el[0]._index).to.be.eq(2);

    })

  })
})
