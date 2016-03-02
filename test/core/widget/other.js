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

			w.render(); // обязательно для IE


//			w.$defaultAct.emit('click');

			// var event = new Event("click", {bubbles : true, cancelable : true});
			// w.$defaultAct.dom.el.dispatchEvent(event);

      w.$defaultAct.el.click();
      w.$namedAct.el.click();
      w.$explicitNamedAct.el.click();

      w.item(0).el.click();

//      console.log( w.$defaultAct.opt('name') );

      expect(result).to.be.eql(['defaultAct', 'hello', 'goodbye', '0']);

		});

	});
});
