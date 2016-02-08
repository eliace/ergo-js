var expect = chai.expect;

describe('DataSource', function(){
  describe('DataSource', function() {



    it('should set new value', function() {

      var ds = new Ergo.core.DataSource({a: 'Alice'});
      ds.set('b', 'Bob');

      var v = ds.get();

      ds.set({c: 'Charlie'});

//      console.log('datasource', v);


      expect(v).to.be.eql({a: 'Alice', b: 'Bob'});


    });




    it('should destroy entry on `_destroy` but not value', function() {

      var ds = new Ergo.core.DataSource(['Alice', 'Bob', 'Charlie', 'Dave']);

      expect(ds.entry(0)).not.null;
      expect(ds.entry(1)).not.null;
      expect(ds.entry(2)).not.null;
      expect(ds.entry(3)).not.null;

      ds.entry(3)._destroy();

      expect(ds.entries.size()).to.be.eq(3);
      expect(ds.size()).to.be.eq(4);

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



  });
});
