var expect = chai.expect;

describe('Include "modal"', function(){
	describe('Use', function() {

    it('should destroy on close', function() {

      var w = $.ergo({
        etype: 'panel',
        include: 'modal'
//        destroyOnClose: true
      });

      w.open()
        .then(function() {
          w.close();
        });


      expect(w._destroyed).to.be.true;

		});

	});
});
