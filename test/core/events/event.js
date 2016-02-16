
var expect = chai.expect;

describe('Events', function(){
	describe('Observer', function() {


		it('should create and emit class and instance events', function() {

			var messages = [];

			$ergo.defineClass('Ergo.test.MyClass', {

				mixins: ['observable'],

				defaults: {
					events: {
						'testEvent': function() { messages.push('classEvent');	}
					}
				}

			});

			var obj = new Ergo.test.MyClass({
				events: {
					'testEvent': function() { messages.push('instanceEvent');	}
				}
			});

			obj._bindEvents();

			obj.emit('testEvent');

			expect(messages).to.be.eql(['instanceEvent', 'classEvent']);

		});




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




		it('should use action events', function() {

      var messages = [];


			$ergo.alias('actions:myAction', function(name, value, params) {
				messages.push([name, value.$data]);
			});


      $ergo.defineClass('Ergo.test.EventActionClass', {

        mixins: ['observable', 'statable'],

        defaults: {
          events: {
            // метод
            'a': 'x',
            // свойство
            'b': 'prop:y',
            // событие
            'c': 'event:e',
            // состояние
            'd': 'state:w',
            // чистая функция
            'e': function(e) {
              messages.push(['e', e.$data]);
            },
						'f': 'myAction:v'
          },

					states: {
						'w': function(on) {
							messages.push(['w', on]);
						}
					},

          // events: {
          //   'z': function(e) {
          //     messages.push(['z', e.$data]);
          //   }
          // },

					set: {
            'y': function(v) {
              messages.push(['y', v]);
            }
          }

        },

        x: function(name, value) {
          messages.push(['x', value.$data]);
        }

      });

      var obj = new Ergo.test.EventActionClass();

      obj._bindEvents();
      obj._bindStates();

			console.log(obj.events);

      obj.emit('a', true);
      obj.emit('b', true);
      obj.emit('c', true);
      obj.emit('d', true);
			obj.emit('e', true);
			obj.emit('f', true);

			console.log( messages );


      expect(messages).to.be.eql([['x', true], ['y', true], ['e', true], ['w', true], ['e', true], ['v', true]]);


    });








  });
});
