var expect = chai.expect;

describe('Widget', function(){
	describe('Actions', function() {

    it('should rise default action', function() {

      var result = [];


      var w = $.ergo({
        etype: 'box',
        $defaultAct: {
          onClick: 'action'
        },
        $namedAct: {
          name: 'hello',
          onClick: 'action'
        },
        $explicitNamedAct: {
          onClick: 'action:goodbye'
        },
        items: [{
          onClick: 'action'
        }],
        onDefaultAct: function() {
          result.push('defaultAct');
        },
        // onAction: function() {
        //   result.push('action');
        // },
        onHello: function() {
          result.push('hello');
        },
        onGoodbye: function() {
          result.push('goodbye');
        },
        on0: function() {
          result.push('0');
        }
      });



      w.$defaultAct.jquery.el.click();
      w.$namedAct.jquery.el.click();
      w.$explicitNamedAct.jquery.el.click();

      w.item(0).el.click();

//      console.log( w.$defaultAct.opt('name') );

      expect(result).to.be.eql(['defaultAct', 'hello', 'goodbye', '0']);

		});

	});
});
