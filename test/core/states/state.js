
var expect = chai.expect;

describe('States', function(){
	describe('State', function() {


		it('should use default state', function() {

      $ergo.defineClass('Ergo.test.DefaultStateClass', {

        mixins: ['statable'],

        _construct: function(o) {
          Ergo.test.DefaultStateClass.superclass._initialize.call(this, o);

        }

      });

    });



		it('should use exclusive states', function() {

			var StatableClass = Ergo.core.Object.extend({
        mixins: ['observable', 'statable']
			});

      var obj = new StatableClass({
        states: {
          color: {
            'blue': 'blue',
            'green': 'green',
            'red': 'red'
          }
        }
      });

			obj._bindEvents();
      obj._bindStates();


      obj.set('blue');

			expect( obj.is('blue') ).to.be.true;
			expect( obj.states.state('blue').group ).to.be.eq('color');

      obj.set('green');

      expect( obj.is('green') ).to.be.true;
			expect( obj.is('blue') ).to.be.false;
			expect( obj.is('color') ).to.be.false;


    });




		it('should use exclusive states with dot notation', function() {

			var messages = [];

			var StatableClass = Ergo.core.Object.extend({
        mixins: ['observable', 'statable']
			});


			var obj = new StatableClass({
				onStateChanged: function(e) {
					messages.push(e.state);
				}
      });

			obj._bindEvents();
      obj._bindStates();

      obj.set('color.blue');

			expect( messages ).to.be.eql(['color', 'blue']);
			expect( obj.is('color') ).to.be.true;
			expect( obj.is('blue') ).to.be.true;


			messages = [];

			obj.set('color.green');

			expect( messages ).to.be.eql(['blue', 'green']);
			expect( obj.is('color') ).to.be.true;
			expect( obj.is('blue') ).to.be.false;
			expect( obj.is('green') ).to.be.true;

    });




		it('should use exclusive states with dot notation and empty parent ', function() {

			var messages = [];

			var StatableClass = Ergo.core.Object.extend({
        mixins: ['observable', 'statable']
			});


			var obj = new StatableClass({
				states: {
					'all': 'all',
					'active': 'active',
					'inactive': 'inactive'
				}
      });

			obj._bindEvents();
      obj._bindStates();

			obj.set('.all');

			expect( obj.is('') ).to.be.true;
			expect( obj.is('all') ).to.be.true;

//			console.log(obj.states);

			obj.set('.active');

			expect( obj.is('') ).to.be.true;
			expect( obj.is('all') ).to.be.false;
			expect( obj.is('active') ).to.be.true;

			obj.set('.all');

			expect( obj.is('') ).to.be.true;
			expect( obj.is('all') ).to.be.true;
			expect( obj.is('active') ).to.be.false;

    });







		it('should switch exclusive states on different groups', function() {

			var messages = [];

			var Action = function(name, value) {
				messages.push(name);
			}

			var StatableClass = Ergo.core.Object.extend({
        mixins: ['observable', 'statable'],
				defaults: {
					states: {
						'a': Action,
						'b': Action,
						g: {
							'c': Action,
							'd': Action
						}
					}
				}
			});


			var obj = new StatableClass();
			obj._bindEvents();
      obj._bindStates();


      obj.set('root.a');

			expect( obj.is('root') ).to.be.true;
			expect( obj.is('a') ).to.be.true;
			expect( obj.is('b') ).to.be.false;

			obj.set('root.b');

			expect( obj.is('root') ).to.be.true;
			expect( obj.is('a') ).to.be.false;
			expect( obj.is('b') ).to.be.true;

			obj.set('root.c');

			expect( obj.is('root') ).to.be.true;
			expect( obj.is('b') ).to.be.true;
			expect( obj.is('c') ).to.be.true;


    });






    it('should use action states', function() {

      var messages = [];


			$ergo.alias('actions:myAction', function(name, value, params) {
				messages.push([name, value]);
			});


      $ergo.defineClass('Ergo.test.StateActionClass', {

        mixins: ['observable', 'statable'],

        defaults: {
          states: {
            // метод
            'a': 'x',
            // свойство
            'b': 'prop:y',
            // событие
            'c': 'event:z',
            // состояние
            'd': 'state:w',
            // чистая функция
            'e': function(on) {
              messages.push(['e', on]);
            },
						'f': 'myAction:v'
          },

          events: {
            'z': function(e) {
              messages.push(['z', e.$data]);
            }
          },

					set: {
            'y': function(v) {
              messages.push(['y', v]);
            }
          }

        },

        x: function(name, value) {
          messages.push(['x', value]);
        },


        _missedState: function(name, on) {
          messages.push([name, on]);
        }

      });

      var obj = new Ergo.test.StateActionClass();

      obj._bindEvents();
      obj._bindStates();

      obj.set('a');
      obj.set('b');
      obj.set('c');
      obj.set('d');
			obj.set('e');
			obj.set('f');

//			console.log( messages );


      expect(messages).to.be.eql([['x', true], ['y', true], ['z', true], ['w', true], ['e', true], ['v', true]]);


    });




  });
});
