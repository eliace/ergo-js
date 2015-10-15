
describe('Data Binding', function(){
	describe('Static', function() {

    it('should `binding` on data set', function() {

      var result = [];

      var w = new Ergo.core.Widget({
        binding: function(v) {
          result.push(v);
        }
      });
      w.bind({a: 'Alice'});

      w.data.set({b: 'Bob'});

      expect(result).to.be.eql([{a: 'Alice'}, {b: 'Bob'}])
		});


    it('should be nested `binding` on data set', function() {

      var result = [];

      var data = {person: {name: 'Alice'}};

      var w = $.ergo({
        etype: 'html:div',
        binding: function(v) { result.push(v); },
        $content: {
          etype: 'html:div',
          dataId: 'person',
          binding: function(v) { result.push(v); },
          $content: {
            etype: 'html:div',
            dataId: 'name',
            binding: function(v) { result.push(v); }
          }
        }
      });

      // change:create -> change:create -> change:create
      w.bind(data);
      expect(result).to.be.eql([{person: {name: 'Alice'}}, {name: 'Alice'}, 'Alice']);

      // dirty -> dirty -> change:update
      result = []
      w.data.set('person.name', 'Bob');
      expect(result).to.be.eql([{name: 'Bob'}, {person: {name: 'Bob'}}, 'Bob']);

      // dirty -> dirty
      result = []
      w.data.set('person.age', 20);
      expect(result).to.be.eql([{name: 'Bob', age: 20}, {person: {name: 'Bob', age: 20}}]);

      // dirty -> dirty -> change:delete
      result = []
      w.data.unset('person.name');
      expect(result).to.be.eql([{age: 20}, {person: {age: 20}, null}]);

		});



	});
});
