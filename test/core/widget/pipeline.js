var expect = chai.expect;

describe('Widget', function(){
	describe('Pipeline', function() {

		it('should dynamic and render sorting with full update', function() {

      var data = ['Dave', 'Alice', 'Charlie', 'Bob', 'Eva'];

      var w = $.ergo({
        etype: 'box',
        defaultItem: {
          binding: 'prop:text'
        },
        dynamic: true,
        dynamicSorter: function(a, b) {
          var valueA = a[1];
          var valueB = b[1];
          if(valueA < valueB) return -1;
          if(valueA > valueB) return 1;
          return 0;
        },
        renderSorter: function(a, b) {
          var valueA = a[1].value;
          var valueB = b[1].value;
          if(valueA < valueB) return 1;
          if(valueA > valueB) return -1;
          return 0;
        }
      });

      w.render();

      w.data = data;

			var values = [];
      w.items.each(function(item) { values.push(item.value) });
			expect(values).to.be.eql(['Alice', 'Bob', 'Charlie', 'Dave', 'Eva']);

			values = [];
      w.dom.each(function(el) { values.push(el.textContent) })
			expect(values).to.be.eql(['Eva', 'Dave', 'Charlie', 'Bob', 'Alice']);


    });

  });
});
