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



		it('should call scope event chain', function() {

			var ctx = new Ergo.core.Context({});

			var messages = [];

			ctx.scopes.scope('first', function($scope) {
				$scope.events.on('joined', function() {
					messages.push('first');
				});
			});

			ctx.scopes.scope('second', function($scope) {
				$scope.events.on('joined', function() {
					messages.push('second');
				});
			});

			ctx.scopes.scope('third', function($scope) {
				$scope.events.on('joined', function() {
					messages.push('third');
				});
			});

			ctx.join('first.second.third');

			expect(messages).to.be.eql(['first', 'second', 'third']);

		});




		it('should call scope promise chain after join all the scopes', function() {

			var ctx = new Ergo.core.Context({});

			var messages = [];

			ctx.scopes.scope('first', function($scope) {

				expect(messages).to.be.eql([]);

				return function() {
					messages.push('first');
				}
			});

			ctx.scopes.scope('second', function($scope) {
				expect(messages).to.be.eql([]);
				return function() {
					messages.push('second');
				}
			});

			ctx.scopes.scope('third', function($scope) {
				expect(messages).to.be.eql([]);
				return function() {
					messages.push('second');
				}
			});


			ctx
				.join('first.second.third')
				.promise()
				.then(function() {
					expect(messages).to.be.eql(['first', 'second', 'third']);
				});


		});



		it('should set $prejoin and $implicit', function() {

			var ctx = new Ergo.core.Context({});

			var messages = [];

			ctx.scopes.scope('first', function($scope, $params) {
				messages.push($params.$prejoin);
			});

			ctx.scopes.scope('second', function($scope, $params) {
				messages.push($params.$prejoin);
			});

			ctx.scopes.scope('third', function($scope, $params) {
				messages.push($params.$prejoin);
			});


			ctx.join('first.second.third', {});

			expect(messages).to.be.eql([true,true,undefined]);

		});




  });
});
