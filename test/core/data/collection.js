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


    it('should remove entry on del', function() {

      var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie', 'Dave']);

      expect(ds.entry(0)).not.null;
      expect(ds.entry(1)).not.null;
      expect(ds.entry(2)).not.null;
      expect(ds.entry(3)).not.null;

      ds.entry(3)._destroy();

      expect(ds.size()).to.be.eq(3);

      expect(ds.entry(0)).not.null;
      expect(ds.entry(1)).not.null;
      expect(ds.entry(2)).not.null;

    });


    it('should create entry on add', function() {

      var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie', 'Dave']);

      var e = ds.add('Eve', 1);

      expect(e).not.null;

      expect(ds.size()).to.be.eq(5);

      expect(ds.entry(0)).not.null;
      expect(ds.entry(1)).not.null;
      expect(ds.entry(2)).not.null;
      expect(ds.entry(3)).not.null;
      expect(ds.entry(4)).not.null;

    });



	})





});
