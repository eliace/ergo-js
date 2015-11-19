var expect = chai.expect;

describe('DataSource', function(){
	describe('CompositeKey', function() {

    it('should get and set comopsite key', function() {

      var messages = [];

      var data = {
        name: 'Alice',
        address: {
          street: 'First',
          house: 12
        }
      };

      var ds = new ergo.core.DataSource(data);


      expect( ds.get('address.street') ).to.be.deep.eq('First');

      ds.set('address.street', 'Second')

      expect( ds.get('address.street') ).to.be.deep.eq('Second');

    });

  });
});
