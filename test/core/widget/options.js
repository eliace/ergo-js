var expect = chai.expect;

describe('Widget', function(){
	describe('Options', function() {

    it('should set default option', function() {

      var w = $.ergo({
        etype: 'box',
        test: 'test'
      });

      expect( w.options.test ).to.be.eq( 'test' );

    });


    it('should set class property as option', function() {

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



    it('should set `states` option', function() {

			var w = $.ergo({
        etype: 'box',
        states: {
          'test': 'test-class'
        },
        test: true
      });

      expect( w.states.is('test') ).to.be.true;



      var w = $.ergo({
        etype: 'box',
        states: {
					test: {
	          'test1': 'cls1',
	          'test2': 'cls2'
					}
        },
        test: 'test2'
      });

      expect( w.states.is('test2') ).to.be.true;
      expect( w.el.hasClass('cls2') ).to.be.true;


    });



		it('should use component shortcuts', function() {

      var w = $.ergo({
        etype: 'box',
				$a: {
					text: 'Alice'
				},
				defaultItem: {
					$content: {
						foo: 'Bob'
					}
				},
				items: [{}, {$content__foo: 'Charlie'}, {$content__items: ['foo1', 'foo2', 'foo3']}]
      });

			expect(w.$a.opt('text')).to.be.eq('Alice');
			expect(w.item(0).$content.opt('foo')).to.be.eq('Bob');
			expect(w.item(1).$content.opt('foo')).to.be.eq('Charlie');
			expect(w.item(2).$content.items.size()).to.be.eq(3);



    });



		it('should use instance properties `get` and `set`', function() {

			var w = $.ergo({
        etype: 'box',
				defaultItem: {
					get: {
						'a': function() {return 'Alice'}
					}
				},
				items: [{
					get: {
						'b': function() {return 'Bob'}
					}
				}]
      });

			expect(w.item(0).prop('a')).to.be.eq('Alice');
			expect(w.item(0).prop('b')).to.be.eq('Bob');


    });



		it('should use class properties `get` and `set`', function() {

			Ergo.defineClass('Ergo.core.TestClass', null, {
				extends: 'Ergo.core.Object',
				props: {
					set: {
						a: function(v) { this._a = v; }
					},
					get: {
						a: function() { return this._a; }
					},
					'b': {
						set: function(v) {this._b = v;},
						get: function() {return this._b;}
					}
				},
				get c() {
          return this._c;
        },
				set c(v) {
          this._c = v;
        }
      });


			var w = new Ergo.core.TestClass({
				a: 'Alice',
				b: 'Bob',
				c: 'Charlie'
      });

			expect(w.prop('a')).to.be.eq('Alice');
			expect(w.prop('b')).to.be.eq('Bob');
			expect(w.prop('c')).to.be.eq('Charlie');


    });





		it('should set `include` option', function() {

			$ergo.alias('includes:test', {
				defaults: {
					a: 'Alice'
				}
			});

			$ergo.alias('includes:test2', {
				defaults: {
					b: 'Bob'
				}
			});

			$ergo.alias('includes:test3', {
				defaults: {
					c: 'Charlie'
				}
			});


      var w = $.ergo({
        etype: 'box',
				defaultItem: {
					include: 'test test2'
				},
				items: [{include: 'test3'}]
      });

			expect( w.item(0).options.include ).to.be.eql(['test test2', 'test3']);
			expect( w.item(0)._includes ).to.be.eql(['test', 'test2', 'test3']);
			expect( w.item(0).options.a ).to.be.eql('Alice');
			expect( w.item(0).options.b ).to.be.eql('Bob');


    });



		it('should set `style` option', function() {

      var w = $.ergo({
        etype: 'box',
				defaultItem: {
					style: {'color': '#aaa', 'width': '10%'}
				},
				items: [{
					style: {'color': '#bbb'}
				}]
      });

			expect( w.item(0).options.style.color ).to.be.eql('#bbb');
			expect( w.item(0).options.style.width ).to.be.eql('10%');

			expect( w.options.defaultItem.style ).to.be.eql({'color': '#aaa', 'width': '10%'});

//			console.log('options', w.options);

    });




		it('should set `stt` option', function() {

      var w = $.ergo({
        etype: 'box',
				stt: 'aaa'
      });

			expect( w.options.stt ).to.be.eql('aaa');
			expect( w.states.is('aaa') ).to.be.true;

    });



		it('should set `as` option', function() {

      var w = $.ergo({
        etype: 'box',
        as: 'cls'
      });

      expect( w.el.hasClass('cls') ).to.be.true;

    });



		it('should set `format` option', function() {

      var w = $.ergo({
        etype: 'box',
        format: function(v) {
					return v;
				},
				value: 4
      });

//			expect( typeof w.format ).to.be.eq('function');
			expect( w.value ).to.be.eq(4)


			var w = $.ergo({
        etype: 'box',
        format: '#{a}',
				value: {a: 'Alice'}
      });

			expect( w.value ).to.be.eq('Alice');

//			expect( typeof w.format ).to.be.eq('function');


    });



		it('should set `unformat` option', function() {

      var w = $.ergo({
        etype: 'box',
				value: 4,
        unformat: function(v) {
					return '!'+v;
				}
      });

//			expect( typeof w.unformat ).to.be.eq('function');
			expect( w.__val ).to.be.eq('!4');
			expect( w.value ).to.be.eq('!4')


			var w = $.ergo({
        etype: 'box',
        unformat: '#{a}',
				value: 'Alice'
      });

//			expect( typeof w.unformat ).to.be.eq('function');
			expect( w.__val ).to.be.eql({a: 'Alice'});
			expect( w.value ).to.be.eql({a: 'Alice'});


    });




		it('should set `value` option', function() {

      var w = $.ergo({
        etype: 'box',
        value: 'Alice'
      });

      expect( w.value ).to.be.eq('Alice');

    });






/*
		it('should set merge defaultItem', function() {

      var w = $.ergo({
				etype: 'box',
				defaultItem: {
					a: 'Alice'
				},
				items: [{}, {b: 'Bob'}, {a: 'Adam'}]
      });

			console.log( w.item(0).options );

    });
*/

  });
});
