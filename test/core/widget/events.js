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

			w._bindEvents('a');


			w.a.events.fire('someEvent');

			expect( messages ).to.be.deep.eq( ['event'] );

    });



		it('should bind property event', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'a:someEvent': function() {
						messages.push('event');
					}
				},
				get: {
					'a': function() {
						if(!this.__a) {
							this.__a = new Ergo.core.Widget();
							this._bindEvents('a');
						}
						return this.__a;
					}
				}
			});

			// здесь __a уже должен быть проинициализирован
			w.__a.events.fire('someEvent');

			expect( messages ).to.be.deep.eq( ['event'] );

    });



		it('should rise event', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'risedEvent': function() {
						messages.push('event1');
					}
				},
				defaultItem: {
					$content: {
						events: {
							'risedEvent': function() {
								messages.push('event3');
							}
						}
					},
					events: {
						'risedEvent': function() {
							messages.push('event2');
						}
					}
				},
				onRisedEvent: function() {
					messages.push('event11');
				},
				items: [{}]
			});


			w.item(0).component('content').rise('risedEvent');

			expect(messages).to.be.eql(['event3', 'event2', 'event11', 'event1']);

		});



		it('should stop rise event', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'risedEvent': function() {
						messages.push('event1');
					}
				},
				defaultItem: {
					$content: {
						events: {
							'risedEvent': function() {
								messages.push('event3');
							}
						}
					},
					events: {
						'risedEvent': function(e) {
							messages.push('event2');
							e.stop();
						}
					}
				},
				items: [{}]
			});


			w.item(0).component('content').rise('risedEvent');

			expect(messages).to.be.eql(['event3', 'event2']);

		});



		it('should interrupt event processing when mixed handlers', function() {

			var messages = [];

			var w = $.ergo({
				etype: 'box',
				events: {
					'test': function() {
						messages.push('event1');
					}
				},
				onTest: function(e) {
					messages.push('event2');
					e.interrupt();
				}
			});


			w.fire('test');

			expect(messages).to.be.eql(['event2']);

		});




		// it('should fire nested event when property does not exist', function() {
		//
		// 	var messages = [];
		//
		// 	var w = $.ergo({
		// 		etype: 'box',
		// 		events: {
		// 			'a:someEvent': function() {
		// 				messages.push('event');
		// 			}
		// 		}
		// 	});
		//
		// 	w.events.fire('a:someEvent');
		//
		// 	expect( messages ).to.be.deep.eq( ['event'] );
		//
    // });



// 		it('should ignore methods with same name as namespace', function() {
//
// 			var messages = [];
//
// 			var w = $.ergo({
// 				etype: 'box',
// 				events: {
// 					'a:someEvent': function() {
// 						messages.push('event');
// 					},
// 					'item#someEvent': function() {
// 						messages.push('event2');
// 					}
// 				},
//
// 			});
//
// //			w.a = function() {};
//
// 			w._bindEvents('a');
//
// 			w.events.fire('a:someEvent');
// 			w.events.fire('item#someEvent');
//
// 			expect( messages ).to.be.deep.eq( ['event', 'event2'] );
//     });




  });
});