var expect = chai.expect;

describe('Context', function(){
	describe('Context', function() {

    it('should find widgets', function() {

      var ctx = new Ergo.core.Context({});

      ctx.scopes.scope('main', function($scope) {

        var w = $ergo({
          etype: 'box',
          sid: 'users',
          items: ['Alice', 'Bob', 'Charlie']
        });

      });

      var scope = ctx.join('main');

      expect( ctx.widget('main@users') ).to.exist;

    });





  });
});
