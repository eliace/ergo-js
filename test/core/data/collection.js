var expect = chai.expect;

describe('DataSource', function(){

  describe('Collection', function() {

		it('should use factory on create', function() {


      Ergo.defineClass('Ergo.my.Item', 'Ergo.data.Object', {
      });

      Ergo.defineClass('Ergo.my.Collection', 'Ergo.data.Collection', {
        model: Ergo.my.Item
      });


      var ds = new Ergo.my.Collection();

      ds.set([{name: 'Alice'}, {name: 'Bob'}]);

      console.log(ds.entry(0) instanceof Ergo.my.Item);
      expect(ds.entry(0)).to.be.an.instanceof(Ergo.my.Item);

		});









	})
});
