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

  });
});
