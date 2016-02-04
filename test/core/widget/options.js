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

			expect(w.$a.text).to.be.eq('Alice');
			expect(w.item(0).$content.opt('foo')).to.be.eq('Bob');
			expect(w.item(1).$content.opt('foo')).to.be.eq('Charlie');
			expect(w.item(2).$content.items.size()).to.be.eq(3);



    });



		it('should override setters/getters', function() {

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

			expect(w.item(0).a).to.be.eq('Alice');
			expect(w.item(0).b).to.be.eq('Bob');

    });




		it('should override includes', function() {

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



		it('should set override style', function() {

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
				}
      });

			expect( typeof w.options.format ).to.be.eq('function');


			var w = $.ergo({
        etype: 'box',
        format: '#{a}'
      });

			expect( typeof w.options.format ).to.be.eq('function');


    });






		it('should bind property data', function() {

      var w = $.ergo({
        etype: 'box'
      });

			w.storage = {
				val: 4
			};

			w.data = 'storage';

      expect( w.data.get() ).to.be.eql({val: 4});

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
