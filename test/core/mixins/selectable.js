var expect = chai.expect;

describe('Include "selectable"', function(){
	describe('Use', function() {

    it('should add and remove multiselect', function() {

      var w = $.ergo({
        etype: 'box',
        include: 'selectable',
        selection: {
          multiselect: true
        },
        items: ['Alice', 'Bob', 'Charlie', 'Dave']
      });

      w.selection.set(1);

      expect(w.selection._selected[1]).to.be.not.null;

      w.selection.unset(1);

      expect(w.selection._selected[1]).to.be.undefined;

		});

	});
});
