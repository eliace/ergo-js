

Ergo.defineClass('Ergo.widgets.ModalDialog', {

	extens: 'Ergo.widgets.Panel',

	defaults: {

		include: 'modal effects',

		as: 'modal dialog',

		closeOn: 'outerClick',

		renderTo: 'body',

		effects: {
			'show': {type: 'fadeIn', delay: 400}
		},

		width: 600,

		components: {
			footer: {
				autoRender: 'non-empty',
//				layout: 'row',
//				etype: 'tool-bar',
				components: {
					buttons: {
						etype: 'buttons',
//						layout: 'bar',
						defaultItem: {
							'!onClick': 'action:dialogAction'
							// onClick: function(e) {
							// 	this.events.rise('dialogAction');
							// 	e.interrupt(); // no default buttons action
							// }
						}
//						onClick: 'action:dialogAction'
						// defaultItem: {
						// 	etype: 'button',
						// 	onClick: function() {
						// 		this.events.rise('action', {action: this.opt('name')});
						// 		// var name = this.opt('name');
						// 		// if(name)
						// 			// this.events.rise(name);
						// 	}
						// }
					}
				}
//				items: []
			}
		},

		events: {

			'click': function(e) {
				e.stop();
			},

			'dialogAction': function(e) {

	//			var event = new Ergo.core.CancelEvent();
	//			if(e.action)
				var event = this.events.fire(e.target.opt('name'), {}, e);

				if(!event.canceled)
					this.close();

				e.stop();
			}

		}

// 		onClick: function(e) {
// 			e.stop();
// 		},
//
// 		onDialogAction: function(e) {
//
// //			var event = new Ergo.core.CancelEvent();
// //			if(e.action)
// 			var event = this.events.fire(e.target.opt('name'), {}, e);
//
// 			if(!event.canceled)
// 				this.close();
//
// 			e.stop();
// 		}
	}


/*
	_construct: function(o) {
		this._super(o);

		if(o.dialogButtons) {

			for(var btn in o.dialogButtons) {
				this.footer.buttons.items.add(btn);
			}

		}

	}
*/

}, 'widgets:modal-dialog');
