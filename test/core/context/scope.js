var expect = chai.expect;

describe('Context', function(){
	describe('Scope', function() {

    it('should attach scope widgets', function() {

      var ctx = new Ergo.core.Context({});

			ctx._widget = Ergo.widgets.Box();

      ctx.scopes.scope('main', function($scope) {

        var w = $ergo({
          etype: 'box',
          sid: 'users',
          items: ['Alice', 'Bob', 'Charlie']
        });

      });

      var scope = ctx.join('main');

      expect( scope.widgets['users'] ).to.exist;

    });



		it('should bind scope events to widget', function() {

			var messages = [];

      var ctx = new Ergo.core.Context({});

			ctx._widget = Ergo.widgets.Box();

      ctx.scopes.scope('main', function($scope) {

        var w = $ergo({
          etype: 'box',
          sid: 'users',
					events: {
						'scope:test': function() {
							messages.push('test');
						}
					}
        });

      });

			console.log('-------------------------');
      var scope = ctx.join('main');
			console.log('-------------------------');

			scope.events.fire('test');

      expect( messages ).to.be.eql(['test']);


    });




  });
});
