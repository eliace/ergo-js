var expect = chai.expect;

describe('Widget', function(){

  describe('Components', function() {



    it('should override defaultComponent', function() {

      var box = $.ergo({
        etype: 'html:div',
        defaultComponent: {
          etype: 'html:div'
        },
        components: {
          a: {text: 'Alice'},
          b: {text: 'Bob'}
        }
      });

      var box3 = $.ergo({
        etype: 'html:div',
        defaultComponent: {
          etype: 'html:div',
          x: 'Alice'
        },
        components: {
          a: {},
          b: {x: 'Adam'},
          c: {y: 'Bob'}
        }
      });

      expect(box3.comp('a').options.x).to.be.eq('Alice');
      expect(box3.comp('b').options.x).to.be.eq('Adam');
      expect(box3.comp('c').options.x).to.be.eq('Alice');
      expect(box3.comp('c').options.y).to.be.eq('Bob');

    });


    it('should set component', function() {

      var box = $.ergo({
        etype: 'html:div',
        defaultComponent: {
          etype: 'html:div'
        }
      });

      var c0 = box.components.set('a', {});

      expect(c0).to.exist;
      expect(box.components.get('a')).to.exist;

      console.log('components', box.components.get('a'));

      expect(box.components.size()).to.be.eq(1);




		});




  })


});
