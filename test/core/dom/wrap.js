
var expect = chai.expect;

describe('Layout', function(){

	describe('Wrap', function() {

		it('should use widget wrapper', function() {

      var w = $ergo({
        etype: 'box',
        $content: {
          tag: 'span',
          wrapper: {
            as: 'wrap'
          }
        }
      });

      w.render();

      expect( w.$content.dom.el.parentElement.className ).to.be.eq('wrap');
//      console.log( w.$content.dom.el.parentElement.className );


    });

  });
});
