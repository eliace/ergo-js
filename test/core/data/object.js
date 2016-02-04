var expect = chai.expect;

describe('DataSource', function(){

  describe('Object', function() {

		it('should set value and return entry', function() {

      var data = new Ergo.data.Object();

      expect( data.set('a', 'Alice') ).to.exist;



    });

  });
});
