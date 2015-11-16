var expect = chai.expect;

describe('Widget', function(){
	describe('Events', function() {

    it('should fire nested event', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'a:someEvent': function() {
						messages.push('event');
					}
				}
			});

			w.a = new Ergo.core.Object({
				include: 'observable'
			});

			w._bindNsEvents('a');


			w.a.events.fire('someEvent');

			expect( messages ).to.be.deep.eq( ['event'] );

    });



		it('should fire nested event when property does not exist', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'a:someEvent': function() {
						messages.push('event');
					}
				}
			});

			w.events.fire('a:someEvent');

			expect( messages ).to.be.deep.eq( ['event'] );

    });



		it('should ignore methods with same name as namespace', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'a:someEvent': function() {
						messages.push('event');
					},
					'item:someEvent': function() {
						messages.push('event2');
					}
				},

			});

			w.a = function() {};

			w._bindNsEvents('a');

			w.events.fire('a:someEvent');
			w.events.fire('item:someEvent');

			expect( messages ).to.be.deep.eq( ['event', 'event2'] );
    });




  });
});
