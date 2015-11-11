
var expect = chai.expect;

describe('Events', function(){
	describe('Observer', function() {


    it('should fire handlers in correct order', function() {

      var messages = [];

      var box = $.ergo({
        etype: 'box'
      });

      box.events.on('event', function(e) {
        messages.push('handler1');
      });

      box.events.on('event', function(e) {
        messages.push('handler2');
      });

      box.events.on('event', function(e) {
        messages.push('handler3');
      })

      box.events.fire('event');

      expect( messages ).to.be.deep.eq( ['handler3', 'handler2', 'handler1'] );

    });



		it('should interrupt event flow', function() {

      var messages = [];

      var box = $.ergo({
        etype: 'box'
      });

      box.events.on('event', function(e) {
        messages.push('handler1');
      });

      box.events.on('event', function(e) {
        messages.push('handler2');
        e.interrupt();
      });

      box.events.on('event', function(e) {
        messages.push('handler3');
      })

      box.events.fire('event');

      expect( messages ).to.be.deep.eq( ['handler3', 'handler2'] );


    });



    it('should yield event flow', function() {

      var messages = [];

      var box = $.ergo({
        etype: 'box'
      });

      box.events.on('event', function(e) {
        messages.push('handler1');
      });

      box.events.on('event', function(e) {
        e.yield();
        messages.push('handler2');
      });

      box.events.on('event', function(e) {
        messages.push('handler3');
      })

      box.events.fire('event');

      expect( messages ).to.be.deep.eq( ['handler3', 'handler1', 'handler2'] );


    });



    it('should sequental yield event flow', function() {

      var messages = [];

      var box = $.ergo({
        etype: 'box'
      });

      box.events.on('event', function(e) {
        messages.push('handler1');
      });

      box.events.on('event', function(e) {
        e.yield();
        messages.push('handler2');
      });

      box.events.on('event', function(e) {
        e.yield();
        messages.push('handler3');
      })

      box.events.fire('event');

      expect( messages ).to.be.deep.eq( ['handler1', 'handler2', 'handler3'] );


    });





  });
});
