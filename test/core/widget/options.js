var expect = chai.expect;

describe('Widget', function(){
	describe('Options', function() {

    it('should set simple option', function() {

      var w = $.ergo({
        etype: 'box',
        test: 'test'
      });

      expect( w.options.test ).to.be.eq( 'test' );

    });


    it('should set property option', function() {

      Ergo.defineClass('Ergo.test.MyWidget', 'Ergo.core.Widget', {
        set test(v) {
          this._property = v;
        }
      }, 'widgets:my-widget');


      var w = $.ergo({
        etype: 'my-widget',
        test: 'test'
      });

      expect( w._property ).to.be.eq( 'test' );

    });



    it('should set state', function() {

      var w = $.ergo({
        etype: 'box',
        states: {
          'test': 'test-class'
        },
        test: true
      });

      expect( w.states.is('test') ).to.be.true;

    });



    it('should set exclusive state', function() {

      var w = $.ergo({
        etype: 'box',
        states: {
          'test1:test': 'cls1',
          'test2:test': 'cls2'
        },
        test: 'test2'
      });

      expect( w.states.is('test2') ).to.be.true;
      expect( w.el.classList.contains('cls2') ).to.be.true;

    });




  });
});
